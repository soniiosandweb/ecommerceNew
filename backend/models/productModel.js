const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    url: {
        type: String,
        required: [true, "Please enter product url"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product selling price"]
    },
    cuttedPrice: {
        type: Number,
        required: [false, "Please enter product price"]
    },
    images: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        required: false,
        default: false
    },
    discount: {
        type: String,
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

module.exports = mongoose.model('Product', productSchema);