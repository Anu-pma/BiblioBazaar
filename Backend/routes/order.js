const router = require("express").Router();
const {authenticateToken}=require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const moment = require('moment');

// routes/payment.js or similar
const express = require('express');
// const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-razorpay-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ order });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
});

//verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order,
      total,
      shippingDetails,
      userId,
    } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ status: 'Failure', message: 'Invalid payment signature' });
    }

    // ✅ Create and save order
    const newOrder = new Order({
      user: userId,
      items: order.map(orderData => ({
        book: orderData._id,
        quantity: orderData.quantity,
        price: orderData.price,
      })),
      total,
      shippingDetails,
      status: "Order Placed",
    });

    const savedOrder = await newOrder.save();

    // Push order to user's history
    await User.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id },
    });

    // Remove books from cart
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: { $in: order.map(item => item._id) } },
    });

    // Save order in DB (pseudo code)
    // await Order.create({ items: order, total, shippingDetails, paymentId: razorpay_payment_id });

    res.status(200).json({ status: 'Success', message: 'Payment verified and order placed' });
  } catch (err) {
    console.error('Payment verification failed:', err);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const { order, total } = req.body; // order is an array of books

      console.log("Received order:", order);
      console.log("Received total:", total);
      console.log("Received user id:", id);

  
      if (!order || !total) {
        return res.status(400).json({ message: "Missing order data or total." });
      }
  
      let overallTotal = total;
  
      // Create a new order with items as an array
      const newOrder = new Order({
        user: id,
        items: order.map(orderData => ({
          book: orderData._id,
          quantity: orderData.quantity,
          price: orderData.price
        })),
        total: overallTotal,
        status: "Order Placed"
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      // Save order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id }
      });
  
      // Clear the user's cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: { $in: order.map(item => item._id) } }
      });
  
      return res.json({
        status: "Success",
        message: "Order Placed Successfully"
      });
    } catch (error) {
      console.error('Error placing order:', error);
      return res.status(500).json({ message: "An error occurred" });
    }
});
  
//orders of a user
router.post("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "items.book" },
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const ordersData = userData.orders
      .map(order => {
        const itemsWithFlags = order.items.map(item => ({
          book: item.book,
          quantity: item.quantity,
          reviewed: item.reviewed === true, // ensure boolean
          rated: item.rated === true,
          review: item.review,   
          rating: item.rating,  
        }));

        return {
          ...order.toObject(),
          items: itemsWithFlags,
        };
      })
      .reverse();

    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get all orders for admin
router.get("/get-all-orders",authenticateToken, async (req,res) =>{
    try {
        const userData = await Order.find()
        //populate for knowing which user has ordered what
        .populate({
            path: "items.book",
            select: "title",
        })
        .populate({
            path: "user",
            select: "username",
        })
        .sort({ createdAt: -1});//sort on the basis of orders not timestamp so

        console.log("Populated Orders:", userData); 
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

router.get('/orders/recent', async (req, res) => {
    try {
      const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'username')
        .populate('items.book', 'title price'); // include price if not already populated
  
      const formatted = recentOrders.map(order => {
        // Manually calculate total if not present
        const totalAmount = order.items?.reduce((acc, item) => {
          const price = item.book?.price || 0;
          const qty = item.quantity || 1;
          return acc + price * qty;
        }, 0);
  
        return {
          _id: order._id,
          user: order.user?.username || 'Unknown',
          total: `$${totalAmount.toFixed(2)}`,
          status: order.status || 'Unknown',
          date: moment(order.createdAt).format('YYYY-MM-DD HH:mm'),
        };
      });
  
      res.json(formatted);
    } catch (err) {
      console.error('Error in /orders/recent:', err.message);
      res.status(500).json({ error: 'Failed to fetch recent orders' });
    }
});

//updating orders by admin
router.put("/update-status", authenticateToken, async (req, res) => {
    try {
      const orderId = req.headers.id;
      const userId = req.user.id; // assuming you set req.user in authenticateToken
  
      // Check if the user is admin first
      const user = await User.findById(userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
      }
  
      // Proceed with order update
      await Order.findByIdAndUpdate(orderId, { status: req.body.status });
  
      return res.json({
        status: "Success",
        message: "Status updated successfully"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
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
        .populate('user', 'username');
  
      console.log('Populated Orders:', recentOrders); // See what comes in
  
      const formatted = recentOrders.map(order => ({
        _id: order._id,
        user: order.user?.username || 'Unknown',
        total: order.total ? `$${order.total.toFixed(2)}` : '$0.00',
        status: order.status || 'Unknown',
        date: moment(order.createdAt).format('YYYY-MM-DD HH:mm'),
      }));
  
      res.json(formatted);
    } catch (err) {
      console.error('Error in /orders/recent:', err.message);
      res.status(500).json({ error: 'Failed to fetch recent orders' });
    }
});

module.exports = router;