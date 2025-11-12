const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    const { name, email, gender, password, avatar } = req.body;

    if(!name || !email || !password) {
        return next(new ErrorHandler("Please Enter All Required Fields", 400));
    }

    const newUserData = {
        name: name,
        email: email,
        gender: gender,
        password: password,
    }

    if(avatar && avatar !== "") {

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    const user = await User.create(newUserData);

    var message = `<p>Hi ${name},</p>
            <p>We're excited to welcome you to Ecommerce!</p>
            <p>As a new member, you’re now part of a community that enjoys exclusive perks, the latest product launches, and unbeatable deals.</p>
            <p></p>
            <p>If you have any questions or need help, our customer support team is always here for you. Contact us at <a href="mailto:info@ecommerce.com">info@ecommerce.com</a> or <a href="tel:+91 0000000000">+91 00000000000</a>.</p>
            <p>Thank you for joining us. We can’t wait to see you explore and find your favorites!</p>
            <p>Warm regards,</p>
            <p>Team Ecommerce</p>`;

    await sendEmail({
        email: email,
        message: message,
        subject: "Welcome to Ecommerce Family!",
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({ email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    if(user.role === 'admin') {
        return next(new ErrorHandler("Invalid User Role", 401));
    }

    sendToken(user, 201, res);
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    console.log(req.user.id)

    res.status(200).json({
        success: true,
        user,
    });
});