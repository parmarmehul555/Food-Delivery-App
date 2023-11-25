const express = require('express');
const userLogedIn = require('../middleware/userLogedIn');
const Order = require('../modals/Order');
const User = require('../modals/User');
const orderRouter = express.Router();

//GET ordered food
orderRouter.get('/orders', userLogedIn, async (req, res) => {
    console.log("user : ", req.user);
    const data = await Order.find({ customerId: req.user.id });
    const count = await Order.countDocuments({ customerId: req.user.id })
    console.log("count is ", count);
    res.status(200).send({ data,count } );
})


//ORDER YOUR FOOD
orderRouter.post('/orderfood', userLogedIn, async (req, res) => {
    const { foodName, foodPrice, restorentName } = req.body;

    const isUser = await User.findById(req.user.id);

    const myOrder = new Order();

    myOrder.customerId = req.user.id;
    myOrder.foodName = foodName;
    myOrder.foodPrice = foodPrice;
    myOrder.restorentName = restorentName;
    // myOrder.customerAddress = address;
    myOrder.customerDetails = isUser.username;

    await myOrder.save();

    res.status(200).send([myOrder]);
});

//UPDATE YOUR ORDER
orderRouter.post('/orderfood/updatefood', userLogedIn, async (req, res) => {
    const { name, price, address } = req.body;
    console.log(name);

    const foodData = await Order.findOne({ customerDetails: req.user.id });

    foodData.foodName = name;
    foodData.foodPrice = price;
    foodData.customerAddress = address;
    foodData.customerDetails = req.user.id;
    await foodData.save();
    res.status(200).send({ foodData });
});

orderRouter.delete('/deleteorder/:id', userLogedIn, async (req, res) => {
    const data = await Order.deleteOne({ _id: req.params.id });
    const count = await Order.countDocuments({ customerId: req.user.id })
    res.status(200).send([data,count]);
})

module.exports = orderRouter;