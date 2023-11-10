const express = require('express');
const userLogedIn = require('../middleware/userLogedIn');
const Order = require('../modals/Order');
const orderRouter = express.Router();

//ORDER YOUR FOOD
orderRouter.post('/orderfood',userLogedIn,async (req,res)=>{
    const {name,price,address} = req.body;

    const myOrder = new Order();

    myOrder.foodName = name;
    myOrder.foodPrice = price;
    myOrder.customerAddress = address;
    myOrder.customerDetails = req.user.id;

    await myOrder.save();
    
    res.status(200).send(myOrder);
});

//UPDATE YOUR ORDER
orderRouter.post('/orderfood/updatefood',userLogedIn,async (req,res)=>{
    const {name,price,address} = req.body;
    console.log(name);

    const foodData = await Order.findOne({customerDetails : req.user.id});

    foodData.foodName = name;
    foodData.foodPrice = price;
    foodData.customerAddress = address;
    foodData.customerDetails = req.user.id; 
    await foodData.save();
    res.status(200).send(foodData); 
})

module.exports = orderRouter;