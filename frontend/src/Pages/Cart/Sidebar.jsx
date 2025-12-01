import { Button } from "react-bootstrap";
import CartSidebar from "../../Components/CartSidebar/CartSidebar";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    return(
        <div className="sidebar_cart">
            <CartSidebar />

            <Button className="btn_primary" onClick={() => navigate("/checkout")}>Proceed To Checkout</Button>
        </div>
    )
}

export default Sidebar