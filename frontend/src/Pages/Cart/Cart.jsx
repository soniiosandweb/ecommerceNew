import "./Cart.css";
import { Button, Col, Container, Row } from "react-bootstrap"
import SEO from "../../Layout/SEO"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { BsCartX } from "react-icons/bs";

const Cart = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    return(
        <>
            <SEO title={"Cart - Ecomart"} />

            <div className="cart_page padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            {/* Empty cart */}
                            {cartItems && cartItems.length === 0 ? (

                                <div className="empty_cart_block">
                                    <BsCartX className="cart_empty_icon" />
                                    <p className="paragraph">Your cart is empty, please add items to the cart.</p>

                                    <Button className="btn_primary" onClick={() => navigate("/")}>Continue Shopping</Button>
                                </div>

                            ) : (

                                <div className="cart_page_flex">
                                    <div className="cart_left_col">
                                    
                                        <div className="cart_lists_table">
                                            {cartItems && cartItems.map((item,i) => (
                                                <div className="cart_lists_block" key={i}>
                                                    
                                                    <Link to={item.url}>
                                                        <img src={item.image} alt={item.name} className="product_cart_image" />
                                                    </Link>
                                                    <div className="product_cart_title_block">
                                                        <div className="product_cart_left_content">
                                                            <Link to={item.url} className="paragraph product_title">{item.name}</Link>
                                                            <div className="product_price_flex">
                                                                <p className="item_price_div">
                                                                    <span className="item_price">₹{item.price.toLocaleString('en-US')}</span>
                                                                    <span className="item_price_actual">₹{item.cuttedPrice.toLocaleString('en-US')}</span>
                                                                </p>
                                                                <p className="discount_price">{item.discount}</p>
                                                            </div>
                                                        </div>
                                                        <div className="product_cart_right_content">
                                                            <Button className="remove_item_cart">
                                                                <FaRegTrashAlt />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    
                                    </div>

                                    <div className="cart_right_col">
                                        <Sidebar />
                                    </div>

                                </div>
                            )}

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Cart