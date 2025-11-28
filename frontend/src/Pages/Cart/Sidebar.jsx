import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotalAmount } from "../../Store/Actions/cartActions";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, totalAmount } = useSelector((state) => state.cart);

    useEffect(() => {
        if(cartItems){

            let newPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            dispatch(setTotalAmount(newPrice));
            
        }
    }, [dispatch, cartItems])

    return(
        <div className="sidebar_cart">
            <div className="cartprice_details_block">
                <p className="paragraph bold">
                    <span>Price Summary ({cartItems.length} {cartItems && cartItems.length <= 1 ? "item" : "items"})</span>
                </p>
                <p className="paragraph">
                    <span>Cart Total</span>
                    <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
                </p>
                <p className="paragraph bold">
                    <span>Total Amount <br /> (inclusive of all taxes)</span>
                    <span>₹{totalAmount?.toLocaleString()}</span>
                </p>
            </div>

            <Button className="btn_primary" onClick={() => navigate("/payment")}>Proceed To Checkout</Button>
        </div>
    )
}

export default Sidebar