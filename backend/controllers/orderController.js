const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Shipping = require('../models/shippingModel');

// Create New Order
exports.newOrder = asyncErrorHandler(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
    } = req.body;

    if(paymentInfo.method !== "cash"){
        const orderExist = await Order.findOne({ paymentInfo });

        if (orderExist) {
            return next(new ErrorHandler("Order Already Placed", 400));
        }
    }

    let shipping = await Shipping.findOne({user: req.user._id});

    if (shipping) {

        shipping = await Shipping.findByIdAndUpdate(shipping._id, shippingInfo, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

    } else {
        shipping = await Shipping.create(shippingInfo);
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id }).populate('paymentInfo').sort({'createdAt': -1});

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get Single Order Details
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email").populate('paymentInfo').exec();

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});