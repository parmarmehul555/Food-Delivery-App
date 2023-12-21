const express = require('express');
const Food = require('../modals/Food');
const Seller = require('../modals/Seller');
const router = express.Router();
const sellerLogedIn = require('../middleware/sellerLogedIn');
const upload = require('../middleware/multer');
const uploadCloudinary = require('../middleware/cloudinary');
const path = require('path');
const userLogedIn = require('../middleware/userLogedIn');

//Get All User's Food
router.get('/foods', userLogedIn, async (req, res) => {
    const data = await Food.find();
    res.send(data);
})

//Get ALL Seller's Food
router.get('/seller/food', sellerLogedIn, async (req, res) => {
    const data = await Food.find({ sellerId: req.seller.id });
    res.status(200).send(data);
})

//GET food by id
router.get('/:foodId', sellerLogedIn, async (req, res) => {
    const data = await Food.findOne({ _id: req.params.foodId });
    res.status(200).send(data);
})

//Add details of food 
router.post('/fooddetails',
    sellerLogedIn,
    upload.single('img'),
    async (req, res) => {
        console.log("requested file is ", req.file);
        const localFilePath = `${req.file.destination}/${req.file.filename}`;
        console.log("Local file path ", localFilePath);
        const result = await uploadCloudinary(localFilePath);
        const { name, price, description, img, type } = req.body;
        console.log("req.seller.id", req.seller.id);

        const food = new Food();
        const seller = await Seller.findOne({ _id: req.seller.id });
        console.log("req.body.price ", name);
        console.log("req.body.price ", price);
        console.log("req.body.price ", description);
        console.log("req.body.price ", img);
        console.log("req.body.price ", type);

        food.sellerId = seller._id;
        food.sellerName = seller.sellerName;
        food.foodName = name;
        food.foodPrice = price;
        food.foodDescription = description;
        food.foodImg = result;
        food.foodType = type;
        await food.save();
        console.log("food is ", food);
        res.status(200).send(food);
    });

//Edit details of food    
router.put('/updatefood/:foodId', upload.single('img'), sellerLogedIn, async (req, res) => {
    try {

        const isSeller = await Seller.findOne({ _id: req.seller.id });
        if (!isSeller) return res.status(401).json({ "ERROR": "Seller not exists!" });

        const isFood = await Food.findOne({ _id: req.params.foodId });
        if (!isFood) return res.status(401).json({ "ERROR": "Please add food first!" });

        if (req.file) {
            const { foodName, foodPrice, foodDescription, foodType } = await req.body;
            isFood.SellerId = isSeller._id;
            isFood.sellerName = isSeller.sellerName;
            isFood.foodName = foodName;
            isFood.foodPrice = foodPrice;
            isFood.foodDescription = foodDescription;

            const localFilePath = `${req.file.destination}/${req.file.filename}`;
            const result = await uploadCloudinary(localFilePath);
            isFood.foodImg = result;

            isFood.foodType = foodType;
            await isFood.save();
        } else {
            const { foodName, foodPrice, foodDescription, foodType } = await req.body;

            isFood.SellerId = isSeller._id;
            isFood.sellerName = isSeller.sellerName;
            isFood.foodName = foodName;
            isFood.foodPrice = foodPrice;
            isFood.foodDescription = foodDescription;
            isFood.foodType = foodType;
            await isFood.save();
        }
        res.status(200).send(isFood);
    } catch (err) {
        return res.status(401).json({ "ERROR ": err });
    }
});

//Delete unwanted food
router.delete('/deletefood', sellerLogedIn, async (req, res) => {
    try {
        const isSeller = await Food.findOne({ sellerId: req.seller.id });
        if (!isSeller) {
            return res.status(401).json({ "ERROR ": "seller not exists!!" });
        }
        await Food.deleteOne({ sellerId: req.seller.id });
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        return res.status(401).json({ "ERROR ": "seller not exists!!" });
    }
});

router.get('/food/:sellerName', userLogedIn, async (req, res) => {
    const data = await Food.find({ sellerName: req.params.sellerName });
    res.status(200).send(data);
})

module.exports = router;