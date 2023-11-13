const express = require('express');
const Food = require('../modals/Food');
const router = express.Router();
const sellerLogedIn = require('../middleware/sellerLogedIn');
const upload = require('../middleware/multer');
const uploadCloudinary = require('../middleware/cloudinary');
const path = require('path');

//GET food details
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

module.exports = router;