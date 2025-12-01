const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');

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

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    // var message = `<p>Hi ${req.user.name},</p>
    //         <p>Just to let you know — we've received your order ${order._id}, and it is now being processed</p>
    //         <table style="border-collapse: collapse;" border="1">
    //             <tr>
    //                 <th>Product</th>
    //                 <th>Quantity</th>
    //                 <th>Price</th>
    //             </tr>`;
                

    // orderItems.forEach((order) => {
    //     message += `<tr><td>${order.name}</td><td>${order.quantity}</td><td>${order.price}</td></tr>`;
    // });

    // message += `<tr >
    //                 <td colspan=2>Total Prices:</td>
    //                 <td>${totalPrice}</td>
    //             </tr>
    //         </table>`;

    // await sendEmail({
    //     email: req.user.email,
    //     message: message,
    //     subject: "Your order has been received!",
    // });

    res.status(201).json({
        success: true,
        order,
    });
});


// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id }).populate('paymentInfo').exec();

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});