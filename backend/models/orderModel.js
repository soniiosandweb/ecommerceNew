const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: String,
        },
        phoneNo: {
            type: Number,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "payments",
        required: true
    },
    paidAt: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    shippedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Order", orderSchema);