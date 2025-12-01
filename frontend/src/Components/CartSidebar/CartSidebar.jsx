import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalAmount } from "../../Store/Actions/cartActions";

const CartSidebar = () => {

    const dispatch = useDispatch();
    const { cartItems, totalAmount } = useSelector((state) => state.cart);

    useEffect(() => {
        if(cartItems){

            let newPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            dispatch(setTotalAmount(newPrice));
            
        }
    }, [dispatch, cartItems])

    return(
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
    )
}

export default CartSidebar