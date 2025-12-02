import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import SEO from "../../../Layout/SEO";
import { clearOrderErrors, getOrderDetails } from "../../../Store/Actions/orderActions";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Stepper from "react-stepper-js";
import "react-stepper-js/dist/index.css";
import { formatDate } from "../../../utils/functions";
import Loader from "../../../Components/Loader/Loader";

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearOrderErrors());
        }
       
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);
    
    return(
        <>
            <SEO title={"Order Details - Ecomart"} />

            <div className="order_details_page padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            {loading ?
                                <Loader />
                            :
                                <div className="order_details_section">
                                    <h2 className="main_heading text-center">Order Status</h2>
                                    <div className="order_status_steps">
                                        <Stepper
                                            color="#ff6a00"
                                            fontSize="16px"
                                            fontColor="#000"
                                            steps={[
                                                { label: <div className="steps_label">Ordered <span>{formatDate(order?.createdAt)}</span></div> },
                                                { label: <div className="steps_label">Shipped <span>{order.shippedAt && order.shippedAt !== undefined ? formatDate(order.shippedAt) : ""}</span></div> },
                                                { label: <div className="steps_label">Delivered <span>{order.deliveredAt && order.deliveredAt !== undefined ? formatDate(order.deliveredAt) : ""}</span></div> }
                                            ]}
                                            currentStep={order.orderStatus === "Delivered" ? 3 : order.orderStatus === "Shipped" ? 2 : 1}
                                        />
                                    </div>

                                    <div className="orders_details_flex">
                                        <div className="orders_details_cols">
                                            <p className="paragraph"><b>Total:</b> ₹{order?.totalPrice?.toLocaleString()}</p>
                                            <p className="paragraph"><b>Payment Method:</b> {order?.paymentInfo?.paymentMethod}</p>
                                            <p className="paragraph"><b>Order Items:</b></p>
                                            <div className="order_details_items">
                                                {order?.orderItems && order.orderItems.map((item,i) => (
                                                    <div className="orders_details_products" key={i}>
                                                        <img src={item.image} alt={item.name} className="product_details_image" />
                                                        <div className="product_details_content">
                                                            <p className="paragraph bold">{item.name}</p>
                                                            <p className="paragraph"><b>Quantity:</b> {item.quantity}</p>
                                                            <p className="paragraph"><b>Price:</b> ₹{item.price.toLocaleString()}</p>
                                                        </div>
                                                    </div>    
                                                ))}
                                            </div>
                                        </div>

                                        <div className="orders_details_cols">
                                            <p className="paragraph"><b>Delivery Address:</b></p>
                                            <p className="paragraph bold">{order?.user?.name}</p>
                                            <p className="paragraph">{`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.country} - ${order?.shippingInfo?.pincode}`}</p>
                                            <p className="paragraph"><b>Email:</b> {order?.user?.email}</p>
                                            <p className="paragraph"><b>Phone Number:</b> {order?.shippingInfo?.phoneNo}</p>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <Link to={"/dashboard/orders"} className="view_all_orders_link">~ View All Orders ~</Link>
                                    </div>

                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default OrderDetails