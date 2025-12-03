const express = require("express");
const { googlePayProcess } = require("../controllers/googlePayController");
const { razorPayProcess, razorPayCreateOrder } = require("../controllers/razorPayController");
const { initiatePayment, checkPaymentStatus } = require("../controllers/phonePayController");
const { registerUser, loginUser, getUserDetails, logoutUser, updateProfile, updatePassword } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { newOrder, myOrders, getSingleOrderDetails } = require("../controllers/orderController");
const { getAddressDetails, createShippingAddress, updateShipping } = require("../controllers/shippingController");
const { getWishlists, createWishlist, deleteWishlist } = require("../controllers/wishlistController");
const router = express.Router();


// -------- User Routes ----------- //

router.post('/process-payment', googlePayProcess); // Process Google Pay Payment

router.post('/razor-create-order', razorPayCreateOrder); // Razor Pay create order

router.post('/razorpay-process', razorPayProcess); // Process Razor Pay Payment

router.post('/phonepay-initiate', initiatePayment); // Initiate Phone Pay Paymeny

router.get('/phonepay-status/:merchantTransactionId', checkPaymentStatus); // Check Phone Pay Payment Status

router.post('/order/new', isAuthenticatedUser, newOrder); // New Order

router.get('/orders/me', isAuthenticatedUser, myOrders); // User Orders

router.get('/order/:id', isAuthenticatedUser, getSingleOrderDetails); // Single Order Detailss


// -------- User Routes ----------- //
router.post('/register', registerUser); // Register

router.post('/login', loginUser); // Login

router.get('/me', isAuthenticatedUser, getUserDetails); //Get User Details

router.put('/me/update', isAuthenticatedUser, updateProfile); // Update User Profile

router.put('/password/update', isAuthenticatedUser, updatePassword); // Update User Password

router.get('/logout', logoutUser); //Logout User


// -------- Shipping Address ----------- //
router.get('/shipping/:id', getAddressDetails); // Get Shipping Address

router.post('/address/add', isAuthenticatedUser, createShippingAddress); // Add Shipping Address

router.put('/address/:id', isAuthenticatedUser, updateShipping); // Update Shipping Address

// -------- Wishlist ----------- //
router.get('/wishlist/:id', isAuthenticatedUser, getWishlists); // Get Wishlist of User

router.post('/wishlist/new', isAuthenticatedUser, createWishlist); // Add New Item to Wishlist

router.delete('/wishlist/delete/:id', isAuthenticatedUser, deleteWishlist); // Delete Wishlist

module.exports = router;