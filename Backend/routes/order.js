const router = require("express").Router();
const {authenticateToken}=require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order",authenticateToken, async (req,res) =>{
    try {
        const {id} = req.headers;
        const {order} = req.body; //user, book,status from models of order
        //looping for placing order
        for(const orderData of order){
            const newOrder = new Order({user : id,book: orderData._id });
            const orderDataFromDb = await newOrder.save();//save order in db

            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDataFromDb._id}
            });
            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull: {cart: orderData._id}
            });
        }
        return res.json({
            status: "Success",
            message: "Order Placed Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});  
    }
});

//orders of a user
router.post("/get-order-history",authenticateToken, async (req,res) =>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book"}
        }); 

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});  
    }
});


//get all orders for admin
router.post("/get-all-orders",authenticateToken, async (req,res) =>{
    try {
        const userData = await Order.find()
        //populate for knowing which user has ordered what
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({ createdAt: -1});//sort on the basis of orders not timestamp so

        return res.json({
            status: "Success",
            data: userData,
        }); 
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});  
    }
});

//updating orders by admin
router.post("/update-status",authenticateToken, async (req,res) =>{
    try {
        const {id} = req.headers;//this id is of order not user
        await Order.findByIdAndUpdate(id,{ status: req.body.status});
        if(user.role !== "admin"){
            return  res.status(400).json({message:"You are not having access to perform admin work"})
        }
        return res.json({
            status: "Success",
            message: "Status updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "An error occured"});  
    }
});

//get order count for a particular user
router.get("/order-count", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "User ID missing in headers" });
        }

        const count = await Order.countDocuments({ user: id });
        return res.json({ count });
    } catch (error) {
        console.error("Error fetching order count:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
    try {
      const [totalBooks, totalOrders, totalUsers, orders] = await Promise.all([
        Book.countDocuments(),
        Order.countDocuments(),
        User.countDocuments(),
        Order.find({})
      ]);
  
      const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  
      res.json({
        totalBooks,
        totalOrders,
        totalUsers,
        revenue: parseFloat(revenue.toFixed(2)),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  });
  
  // GET /api/admin/orders/recent
  router.get('/orders/recent', async (req, res) => {
    try {
      const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name');
  
      const formatted = recentOrders.map(order => ({
        _id: order._id,
        user: order.user?.name || 'Unknown',
        total: order.total,
        status: order.status,
        date: order.createdAt,
      }));
  
      res.json(formatted);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch recent orders' });
    }
  });

module.exports = router;