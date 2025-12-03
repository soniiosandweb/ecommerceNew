const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    // product: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Product",
    //     required: true
    // },
    productItem: {
        product: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        cuttedPrice: {
            type: Number
        },
        image: {
            type: String,
            required: true
        },
        discount: {
            type: String,
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);