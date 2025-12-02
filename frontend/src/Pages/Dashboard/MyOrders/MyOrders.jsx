import "./MyOrders.css"
import { Col, Container, Row } from "react-bootstrap"
import SEO from "../../../Layout/SEO"
import DashboardSidebar from "../DashboardSidebar"
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { clearOrderErrors, myOrders } from "../../../Store/Actions/orderActions";
import { useEffect } from "react";
import { formatDate } from "../../../utils/functions";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const MyOrders = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearOrderErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    return(
        <>
            <SEO title={"My Orders - Ecomart"} />

            <div className="my_orders_page padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <div className="dashboard_flex">
                                <div className="dashboard_left_col">
                                    <DashboardSidebar activeTab={"orders"} />
                                </div>

                                <div className="dashboard_right_col">
                                    <div className="dashboard_sidebar_cols">
                                        <h2 className="dashboard_heading">My Orders</h2>
                                        {loading ?
                                            <Loader />
                                        :
                                            orders && orders.length >= 1 ?
                                                orders.map((order, index) => (
                                                    <Link to={`/order-details/${order._id}`} className="orders_item_block" key={index}>
                                                        <div className="orders_details_left">
                                                            {order.orderItems && order.orderItems.map((item,i) => (
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
                                                        <div className="orders_details_right">
                                                            <p className="paragraph bold">Ordered On: {formatDate(order.createdAt)}</p>
                                                            <p className="paragraph"><b>Total:</b> ₹{order.totalPrice.toLocaleString()}</p>
                                                            <p className="paragraph"><b>Payment Method:</b> {order.paymentInfo.paymentMethod}</p>
                                                        </div>
                                                    </Link>
                                                ))
                                            :
                                            <p className="paragraph">No Orders Found!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default MyOrders