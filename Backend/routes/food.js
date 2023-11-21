const express = require('express');
const Food = require('../modals/Food');
const router = express.Router();
const sellerLogedIn = require('../middleware/sellerLogedIn');
const upload = require('../middleware/multer');
const uploadCloudinary = require('../middleware/cloudinary');
const path = require('path');
const userLogedIn = require('../middleware/userLogedIn');

//Get All Food
router.get('/foods', userLogedIn, async (req, res) => {
    const data = await Food.find();
    res.send(data);
})

//Add details of food 
router.post('/fooddetails',
    sellerLogedIn,
    upload.single('img'),
    async (req, res) => {
        const localFilePath = req.file.path;
        const result = await uploadCloudinary(localFilePath);
        const { name, price, description, img, type } = req.body;

        const food = new Food();

        food.sellerName = req.seller.id;
        food.foodName = name;
        food.foodPrice = price;
        food.foodDescription = description;
        food.foodImg = result;
        food.foodType = type;

        await food.save();
        res.status(200).send(food);
    });

//Edit details of food    
router.post('/updatefood', sellerLogedIn, async (req, res) => {
    try {
        const { name, price, description, type } = req.body;
        const isSeller = await Food.findOne({ sellerName: req.seller.id });
        if (!isSeller) {
            return res.status(401).json({ "ERROR ": "seller not exists!!" });
        }
        isSeller.foodName = name;
        isSeller.foodPrice = price;
        isSeller.foodDescription = description;
        isSeller.foodType = type;
        await isSeller.save();
        res.status(200).send(isSeller);
    } catch (err) {
        return res.status(401).json({ "ERROR ": err });
    }
});

//Delete unwanted food
router.delete('/deletefood', sellerLogedIn, async (req, res) => {
    try {
        const isSeller = await Food.findOne({ sellerName: req.seller.id });
        if (!isSeller) {
            return res.status(401).json({ "ERROR ": "seller not exists!!" });
        }
        await Food.deleteOne({ sellerName: req.seller.id });
        res.status(200).send("Deleted successfully!");
    } catch (error) {
        return res.status(401).json({ "ERROR ": "seller not exists!!" });
    }
})

module.exports = router;