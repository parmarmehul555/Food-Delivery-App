const express = require('express');
const userLogedIn = require('../middleware/userLogedIn');
const Order = require('../modals/Order');
const User = require('../modals/User');
const orderRouter = express.Router();
const sellerLogedIn = require('../middleware/sellerLogedIn');
const Seller = require('../modals/Seller');
const DiliveredOrder = require('../modals/DeliveredOrder');


//GET ordered food
orderRouter.get('/orders', userLogedIn, async (req, res) => {
    console.log("user : ", req.user);
    const data = await Order.find({ customerId: req.user.id });
    const count = await Order.countDocuments({ customerId: req.user.id })
    console.log("count is ", count);
    res.status(200).send({ data, count });
})


//ORDER YOUR FOOD
orderRouter.post('/orderfood', userLogedIn, async (req, res) => {
    const { foodName, foodPrice, restorentName, foodImg } = req.body;

    const isUser = await User.findById(req.user.id);

    const myOrder = new Order();

    myOrder.customerId = req.user.id;
    myOrder.foodName = foodName;
    myOrder.foodPrice = foodPrice;
    myOrder.restorentName = restorentName;
    myOrder.foodImg = foodImg;
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
    res.status(200).send([data, count]);
})

//GET seller's customer details 
orderRouter.get('/yourcustomers', sellerLogedIn, async (req, res) => {
    try {
        const isSeller = await Seller.findById({ _id: req.seller.id });

        if (!isSeller) return res.status(401).json({ "ERROR ": "log in first!!" });

        const order = await Order.find({ restorentName: isSeller.sellerName });
        let data = [];
        let index = 0;

        const temp = await DiliveredOrder.distinct('customerId');
        console.log("============",temp);
        
        for (let id of temp) {
            console.log(id);
            const value = await User.findOne({ _id: id });
            data.push(value);
        }
        console.log("+++++++++++++=",data);
        res.status(200).send(data);
    } catch (error) {
        return res.status(500).json({ "ERROR ": "Internal server error: ", error });
    }
})

module.exports = orderRouter;