const express = require("express");
const { googlePayProcess } = require("../controllers/googlePayController");
const { razorPayProcess, razorPayCreateOrder } = require("../controllers/razorPayController");
const { initiatePayment, checkPaymentStatus } = require("../controllers/phonePayController");
const { registerUser, loginUser, getUserDetails, logoutUser } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { newOrder, myOrders } = require("../controllers/orderController");
const router = express.Router();

// Process Google Pay Payment
router.post('/process-payment', googlePayProcess);

// Razor Pay create order
router.post('/razor-create-order', razorPayCreateOrder);

// Process Razor Pay Payment
router.post('/razorpay-process', razorPayProcess);

// Initiate Phone Pay Paymeny
router.post('/phonepay-initiate', initiatePayment);

// Check Phone Pay Payment Status
router.get('/phonepay-status/:merchantTransactionId', checkPaymentStatus);

// New Order
router.post('/order/new', isAuthenticatedUser, newOrder);

// User Orders
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// -------- User Routes ----------- //
router.post('/register', registerUser); // Register

router.post('/login', loginUser); // Login

router.get('/me', isAuthenticatedUser, getUserDetails); //Get User Details

router.get('/logout', logoutUser); //Logout User

module.exports = router;