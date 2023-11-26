const express = require('express');
const router = express.Router();
const userLogedIn = require('../middleware/userLogedIn');
const DeliveredOrder = require('../modals/DeliveredOrder');
const User = require('../modals/User');

//GET deliverd food details from server : 
router.get('/user/orders', userLogedIn, async (req, res) => {
    console.log("req.user-----------", req.user);
    const data = await DeliveredOrder.find({ customerId: req.user.id });
    const count = await DeliveredOrder.countDocuments({ customerId: req.user.id });
    console.log("count is ", count);
    res.status(200).send(data);
})

// TAKE deliverd food details from user:
router.post('/user/deliverdfood', userLogedIn, async (req, res) => {
    const { restorentName, foodName, foodPrice, foodImg } = req.body;
    const isUser = await User.findOne({ _id: req.user.id });

    const order = new DeliveredOrder();
    order.customerId = req.user.id;
    order.customerDetails = isUser.username;
    order.restorentName = restorentName;
    order.foodName = foodName;
    order.foodPrice = foodPrice;
    order.foodImg = foodImg;
    const count = await DeliveredOrder.countDocuments({ customerId: req.user.id });
    order.count = count + 1;
    await order.save();
    res.status(200).send(order);
})

module.exports = router;