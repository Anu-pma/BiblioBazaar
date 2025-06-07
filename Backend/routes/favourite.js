const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth")

//add book to favourite
router.put("/add-book-to-favourite" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.body;

        console.log("Received bookid:", bookid);
        console.log("Received user id:", id);

        if (!bookid || !id) {
      return res.status(400).json({ message: "Missing bookid or user id in headers" });
    }
        const userData = await User.findById(id); 

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        //to check if book already added
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message: "Book already in favourites."});
        }

        await User.findByIdAndUpdate(id , {$push: { favourites: bookid } });
        return res.status(200).json({message: "Book added to favourites."});
    } catch (error) {
        res.status(500).json({ message : "Internal server error"});
    }
});

//remove book from favourite
router.put("/remove-book-from-favourite" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.body;
        const userData = await User.findById(id); 

        //to check if book already added
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id , {$pull: { favourites: bookid } });
        }
        return res.status(200).json({message: "Book removed from favourites."});
    } catch (error) {
        res.status(500).json({ message : "Internal server error"});
    }
});

//get favourite books of a user
router.get("/favourite-books" , authenticateToken , async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites"); //populate for showing all details of that book not only id
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});
    }
});
module.exports = router;