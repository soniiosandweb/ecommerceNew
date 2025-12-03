import "./Checkout.css"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import SEO from "../../Layout/SEO"
import CartSidebar from "../../Components/CartSidebar/CartSidebar"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import googlePayIcon from "../../assests/images/google-pay-logo.webp";
import razorPayIcon from "../../assests/images/razorpay.png";
import { useSnackbar } from "notistack"
import { clearOrderErrors, newOrderData } from "../../Store/Actions/orderActions"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../Store/Actions/cartActions"
import GooglePayButton from "@google-pay/button-react"
import states from "../../utils/states"
import { getAddressDetails } from "../../Store/Actions/shippingActions"

const Checkout = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const { success, error } = useSelector((state) => state.newOrder);
    const { addressInfo, loading } = useSelector((state) => state.address);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    // Handle Checkout Submit
    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        if(paymentMethod === "") {
            enqueueSnackbar("Please select payment method!", { variant: "error" });
            return;
        }

        const shippingInfo = {
            "address" : address,
            "city": city,
            "state": state,
            "country": country,
            "pincode": pincode,
            "phoneNo": phoneNumber,
        };

        const order = {
            shippingInfo,
            orderItems: cartItems,
            totalPrice: totalAmount,
        }

        if(paymentMethod === "razor_pay") {
            
            try {
                const { data } = await axios.post(
                    `/api/razor-create-order`,
                    { amount: totalAmount }
                );

                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                    amount: data.order.amount,
                    currency: "INR",
                    name: "Ecomart",
                    description: "Product Transaction",
                    order_id: data.order.id,
                    handler: async function (response) {

                        const paymentId = response.razorpay_payment_id;

                        try {
                            const response = await fetch(`/api/razorpay-process`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    paymentId,
                                    amount: totalAmount,
                                }),
                            });

                            const result = await response.json();

                            order.paymentInfo = result.payment._id;

                            dispatch(newOrderData(order));

                        } catch (error) {
                            console.error("Error processing payment:", error);
                            enqueueSnackbar("Error processing payment:", error, { variant: "error" });
                        }

                    },
                    prefill: { email: email, contact: phoneNumber },
                    theme: { color: "#310891" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

            } catch (err) {
                enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
            }

        } else {
            enqueueSnackbar("No payment method available!", { variant: "error" });
        }

    }

    const handlePaymentData = async (paymentData) => {
        try {

            const shippingInfo = {
                "address" : address,
                "city": city,
                "state": state,
                "country": country,
                "pincode": pincode,
                "phoneNo": phoneNumber,
            };

            const order = {
                shippingInfo,
                orderItems: cartItems,
                totalPrice: totalAmount,
            }
        
            const token = paymentData.paymentMethodData.tokenizationData.token;

            // Send to backend for processing
            const response = await fetch(`/api/process-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    amount: totalAmount,
                }),
            });

            const result = await response.json();

            order.paymentInfo = result.payment._id;

            dispatch(newOrderData(order));

        } catch (error) {
            console.error("Error processing payment:", error);
            enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
        }
    };

    useEffect(() => {

        if (error) {
            dispatch(clearOrderErrors());
            enqueueSnackbar(error, { variant: "error" });
        }

        if(success){
            dispatch(emptyCart());
            dispatch(clearOrderErrors());
            navigate("/dashboard/orders");
        }

        if(user) {
            setName(user.name);
            setEmail(user.email);
        }

        if(loading === undefined){
            dispatch(getAddressDetails(user._id));
        }

        if(addressInfo && addressInfo.length > 0 ){
            setAddress(addressInfo[0].address);
            setCity(addressInfo[0].city);
            setCountry(addressInfo[0].country);
            setState(addressInfo[0].state);
            setPincode(addressInfo[0].pincode);
            setPhoneNumber(addressInfo[0].phoneNo);
        }

    }, [dispatch, user, error, success, enqueueSnackbar, navigate, addressInfo, loading])

    return(
        <>
            <SEO title={"Checkout - Ecomart"} />

            <div className="cart_page padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <Form className="cart_page_flex checkout_form" onSubmit={(e) => handleCheckoutSubmit(e)}>
                                <div className="cart_left_col">

                                    <div className="cartprice_details_block">
                                        <div className="form-row">
                                            <Form.Group controlId="user_name" className="form-col">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="user_name" defaultValue={name} readOnly required />
                                            </Form.Group>

                                            <Form.Group controlId="user_email" className="form-col">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name="user_email" defaultValue={email} readOnly required />
                                            </Form.Group>
                                        </div>

                                        <div className="form-row">
                                            <Form.Group controlId="user_address" className="form-col">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" name="user_address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                            </Form.Group>

                                            <Form.Group controlId="user_city" className="form-col">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control type="text" name="user_city" value={city} onChange={(e) => setCity(e.target.value)} required />
                                            </Form.Group>
                                        </div>

                                        <div className="form-row">
                                            <Form.Group controlId="user_state" className="form-col">
                                                <Form.Label>State</Form.Label>
                                                <Form.Select name="user_state" value={state} onChange={(e) => setState(e.target.value)} required>
                                                    <option value="">Select State</option>
                                                    {states.map((item) => (
                                                        <option key={item.code} value={item.name}>{item.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId="user_pincode" className="form-col">
                                                <Form.Label>Pincode</Form.Label>
                                                <Form.Control type="text" name="user_pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                                            </Form.Group>
                                        </div>

                                        <div className="form-row">
                                            <Form.Group controlId="user_country" className="form-col">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select name="user_country" value={country} onChange={(e) => setCountry(e.target.value)} required>
                                                    <option value="">Select Country</option>
                                                    <option value={"IN"}>India</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId="user_phone" className="form-col">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="text" name="user_phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                            </Form.Group>
                                        </div>

                                        
                                    </div>
                                </div>
                            
                                <div className="cart_right_col">
                                    <div className="sidebar_cart">
                                        <CartSidebar />

                                        <div className="cartprice_details_block checkout_payments">
                                            <Form.Check type={"radio"} id="radio_google_pay">
                                                <Form.Check.Input type={"radio"}  value={"google_pay"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                                <Form.Check.Label>Google Pay <img src={googlePayIcon} alt="Google Pay" className="payment_icon" /></Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check type={"radio"} id="radio_razor_pay">
                                                <Form.Check.Input type={"radio"}  value={"razor_pay"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                                <Form.Check.Label>Razor Pay <img src={razorPayIcon} alt="Razor Pay" className="payment_icon" /></Form.Check.Label>
                                            </Form.Check>
                                        </div>

                                        {paymentMethod === "google_pay" ?

                                            <GooglePayButton
                                                environment="TEST"
                                                buttonColor="black"
                                                buttonType="buy"
                                                paymentRequest={{
                                                    apiVersion: 2,
                                                    apiVersionMinor: 0,
                                                    allowedPaymentMethods: [
                                                        {
                                                            type: "CARD",
                                                            parameters: {
                                                                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                                                allowedCardNetworks: ["MASTERCARD", "VISA"],
                                                            },
                                                            tokenizationSpecification: {
                                                                type: "PAYMENT_GATEWAY",
                                                                parameters: {
                                                                    gateway: "stripe",
                                                                    "stripe:version": "2020-08-27",
                                                                    "stripe:publishableKey": "pk_test_51PNSx7A2nuiqtZl37LIvC5AJQsJzg84hvRtbXSwIUk9u7KF827dUDUx3htyk2h0HKCmxYkpQQFx6gryUpEHJxetx00icrat2gT",
                                                                },
                                                            },
                                                        },
                                                    ],
                                                    merchantInfo: {
                                                        merchantName: "Ecomart",
                                                    },
                                                    transactionInfo: {
                                                        totalPriceStatus: "FINAL",
                                                        totalPriceLabel: "Total",
                                                        totalPrice: totalAmount && totalAmount.toString(),
                                                        currencyCode: "INR",
                                                        countryCode: "IN",
                                                    },
                                                }}
                                                onLoadPaymentData={handlePaymentData}
                                            />
                                        :
                                            <Button type="submit" className="btn_primary">Place Order</Button>
                                        }
                                        
                                    </div>
                                </div>
                            </Form>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Checkout