//Admin api: add, update and delete
const router = require("express").Router();
const User = require("../models/user");
const Book=require("../models/book");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const jwt_secret=process.env.JWT_SECRET
const {authenticateToken}=require("./userAuth")

//add book->admin
router.post("/add-book",authenticateToken,async(req,res)=>{
    try{
        const {id}= req.headers;//to diff between user and admin
        const user=await User.findById(id);
        if(user.role !== "admin"){
            return  res.status(400).json({message:"You are not having access to perform admin work"})
        }
        const book= new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            stock:req.body.stock,
            category:req.body.category,
            language:req.body.language,
            ratings:[],
            reviews:[],
        });
        await book.save()
        res.status(200).json({message:"Book added successfully"})
    }catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
})

//update book
router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}= req.headers;
        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required in headers" });
        }
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return  res.status(400).json({message:"You are not having access to perform admin work"})
        }
        const updatedBook=await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            stock:req.body.stock,
            category:req.body.category,
            desc:req.body.desc,
            language:req.body.language,
            ratings: req.body.ratings || [],  
            reviews: req.body.reviews || [],
        });



        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            message:"Book updated successfully",
            data:updatedBook,
})

    }catch(error){
        return res.status(500).json({message:"An error occurred"})
    }
})

//delete
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}= req.headers;
        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required in headers" });
        }
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return  res.status(400).json({message:"You are not having access to perform admin work"})
        }
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({message:"Book deleted successfully"})

    }catch(error){
        return res.status(500).json({message:"An error occurred"})
    }
})

// Admin: Delete Rating for a Book
router.delete("/delete-rating", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Ensure the user is an admin
        const admin = await User.findById(req.user.id);
        if (admin.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        const book = await Book.findById(bookid);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Remove the rating by the specified user
        book.ratings = book.ratings.filter(r => r.id.toString() !== id.toString());

        await book.save();
        return res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Admin: View All Ratings and Reviews of a Book
router.get("/view-ratings-reviews", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        // Ensure the user is an admin
        const admin = await User.findById(req.user.id);
        if (admin.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        const book = await Book.findById(bookid)
            .populate("reviews.id", "name email")
            .populate("ratings.id", "name email");

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            status: "Success",
            data: { ratings: book.ratings, reviews: book.reviews },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// User Rating for a Book
router.post("/add-rating", authenticateToken, async (req, res) => {
  try {
    const { rating, bookid } = req.body;
    if (!bookid || rating == null)
      return res.status(400).json({ message: "Book ID and rating required" });

    const book = await Book.findById(bookid);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Find existing rating by this user in book.ratings array
    const existingRating = book.ratings.find(
      (r) => r.id?.toString() === req.user.id
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      book.ratings.push({ id: req.user.id, rating });
    }
    await book.save();
    // Update delivered orders' item with rating
    const orders = await Order.find({ user: req.user.id, status: "Delivered" });
    for (const order of orders) {
      let changed = false;
      for (const item of order.items) {
        if (item.book.toString() === bookid) {
          item.rated = true;
          item.rating = rating;
          changed = true;
        }
      }
      if (changed) await order.save();
    }

    res.status(200).json({ message: "Rating added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// User Review for a Book
router.post("/add-review", authenticateToken, async (req, res) => {
  try {
    const { review, bookid } = req.body;
    if (!bookid || !review) {
      return res.status(400).json({ message: "Book ID and review required" });
    }

    const book = await Book.findById(bookid);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Check for existing review
    const existingReview = book.reviews.find(
      (r) => r.id?.toString() === req.user.id
    );

    if (existingReview) {
      existingReview.review = review;
    } else {
      book.reviews.push({ id: req.user.id, review });
    }
    await book.save();

    // Update order items if delivered
    const orders = await Order.find({ user: req.user.id, status: "Delivered" });

    for (const order of orders) {
      let changed = false;
      for (const item of order.items) {
        if (item.book.toString() === bookid) {
          item.reviewed = true;
          item.review = review;
          changed = true;
        }
      }
      if (changed) {
        await order.save();
      }
    }

    res.status(200).json({ message: "Review added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

//get all books
router.get("/get-all-books",async(req,res)=>{
    try{
        //sorting on the basis of recently added
        const books= await Book.find().sort({createdAt :-1})
        return res.json({
            status:"Success",
            data:books,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occurred"})

    }
})

//get recently added books
router.get("/get-recent-books",async(req,res)=>{
    try{
        //sorting on the basis of recently added
        const books = await Book.find({}, "url title price ratings author desc language createdAt updatedAt").sort({ createdAt: -1 }).limit(4);

        return res.json({
            status:"Success",
            data:books,
        })
        console.log(data.data);
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occurred"})

    }
})

//get book by id=> for just seeing the details of a particular book
router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
        //url k parameters me se id utha lenge
        const {id} = req.params;
        const book=await Book.findById(id);
        return res.json({
            status:"Success",
            data:book,
        })
    }catch(error){
        return res.status(500).json({message:"An error occurred"})

    }
})

// Search books by title (case-insensitive search)
router.get("/search-books", async (req, res) => {
    try {
        // Extract the search query from query parameters
        const { title } = req.query;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Perform case-insensitive search using a regular expression
        const books = await Book.find({
            //regex:matches exact characters
            title: { $regex: title, $options: "i" }, // 'i' makes the search case-insensitive
        });

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found matching the query" });
        }

        return res.status(200).json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Sort books by author, price, or language
router.get("/sort-books", async (req, res) => {
    try {
        // Extract the sorting criteria and order from query parameters
        const { sortBy, order = "asc" } = req.query;

        // Validate the `sortBy` field
        const validFields = ["author", "price", "language"];
        if (!validFields.includes(sortBy)) {
            return res.status(400).json({ message: "Invalid sort field" });
        }

        // Define the sorting order: 1 for ascending, -1 for descending
        const sortOrder = order === "desc" ? -1 : 1;

        // Sort the books based on the criteria
        const books = await Book.find().sort({ [sortBy]: sortOrder });

        // Return the sorted books
        return res.status(200).json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get all books by a specific author
router.get("/books-by-author", async (req, res) => {
    try {
        const { author } = req.query; // Extract the author's name from query parameters
        if (!author) {
            return res.status(400).json({ message: "Author name is required" });
        }

        // Find books with the matching author name (case-insensitive)
        const books = await Book.find({ author: { $regex: new RegExp(author, "i") } });

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found for the given author" });
        }

        return res.status(200).json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get all books in a particular language
router.get("/filter-books-by-price", async (req, res) => {
    try {
        // Extract min and max price from query parameters
        const { minPrice, maxPrice } = req.query;

        // Validate minPrice and maxPrice
        if (!minPrice || !maxPrice) {
            return res.status(400).json({ message: "Both minPrice and maxPrice are required" });
        }

        // Find books within the specified price range
        const books = await Book.find({
            price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
        });

        // Check if any books are found
        if (books.length === 0) {
            return res.status(404).json({ message: "No books found in this price range" });
        }

        // Return the filtered books
        return res.status(200).json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

module.exports= router;