const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'de0punalk',
    api_key: '832251157443793',
    api_secret: 'Gm8NN181rgEqpGrQA2ZCg9MyctA'
});

const uploadCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;
    try {
        const result = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log(result);
        return result.secure_url;
    } catch (err) {
        console.log("ERROR ", err);
    }
}

module.exports = uploadCloudinary;