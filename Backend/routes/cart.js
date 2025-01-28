const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth");

//add book to cart
router.put("/add-book-to-cart" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id); 

        //to check if book already added
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart){
            return res.json({status: "Success", message: "Book already added in cart."});
        }

        await User.findByIdAndUpdate(id , {$push: { cart: bookid } });

        return res.json({status:"Success" ,message: "Book added to cart."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});
    }
});

//remove book from cart
router.put("/remove-book-from-cart" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.headers; //can use param instead of header also
        const userData = await User.findById(id); 

        //to check if book already added
        const isBookInCart = userData.favourites.includes(bookid);
        if(isBookInCart){
            await User.findByIdAndUpdate(id , {$pull: { favourites: bookid } });
        }
        return res.status(200).json({message: "Book removed from cart."});
    } catch (error) {
        res.status(500).json({ message : "Internal server error"});
    }
});

//get books in cart of a user
router.get("/cart-books" , authenticateToken , async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart"); //populate for showing all details of that book not only id
        const cart = userData.cart.reverse();//reverse for recent at top
        return res.json({
            status: "Success",
            data: cart,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});
    }
});

module.exports = router;