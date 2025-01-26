//Admin api: add, update and delete

const router = require("express").Router();
const User = require("../models/user");
const Book=require("../models/book")
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
            language:req.body.language,
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
        const {bookid}= req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });

        return res.status(200).json({message:"Book updated successfully"})

    }catch(error){
        return res.status(500).json({message:"An error occurred"})
    }
})

//delete
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}= req.headers;
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({message:"Book deleted successfully"})

    }catch(error){
        return res.status(500).json({message:"An error occurred"})
    }
})

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
        const books= await Book.find().sort({createdAt :-1}).limit(4);
        return res.json({
            status:"Success",
            data:books,
        })
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
module.exports= router;