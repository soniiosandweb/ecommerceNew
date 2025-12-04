import "./Wishlists.css";
import { Col, Container, Row } from "react-bootstrap"
import SEO from "../../../Layout/SEO"
import DashboardSidebar from "../DashboardSidebar"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearWishlistErrors, deleteWishlist, getWIshlistItems } from "../../../Store/Actions/wishlistActions";
import { GET_WISHLIST_RESET, REMOVE_WISHLIST_RESET } from "../../../Store/Types/wishlistTypes";
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { PiEmpty } from "react-icons/pi";

const Wishlists = () => {

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    
    const { user } = useSelector((state) => state.user);
    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);
    const { isDeleted, error: deleteError } = useSelector((state) => state.wishlistItem);
    
    const deleteWishlistHandler = (id) => {
        dispatch(deleteWishlist(id));
        enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    }

    useEffect(() => {
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearWishlistErrors());
        }
        if (isDeleted) {
            dispatch({ type: REMOVE_WISHLIST_RESET });
            dispatch(getWIshlistItems(user._id));
        }
    }, [dispatch, isDeleted, deleteError, enqueueSnackbar, user])

    useEffect(() => {
        if(user && user._id && wishlistLoading === undefined){
            dispatch(getWIshlistItems(user._id));
        }
        
        if(wishlistError){
            dispatch({ type: GET_WISHLIST_RESET });
        }
    }, [dispatch, user, wishlistLoading, wishlistError])

    return(
        <>
            <SEO title={"My Wishlists - Ecomart"} />

            <div className="dashboard_section padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <div className="dashboard_flex">
                                <div className="dashboard_left_col">
                                    <DashboardSidebar activeTab={"wishlist"} />
                                </div>
            
                                <div className="dashboard_right_col">
                                    <div className="dashboard_sidebar_cols">
                                        <h2 className="dashboard_heading">My Wishlist ({wishlists && wishlists.length})</h2>

                                        {wishlistLoading ?
                                            <Loader />
                                        :
                                            wishlists && wishlists.length >= 1 ?
                                                wishlists.map((item, index) => (
                                                    <div className="wishlist_item_block" key={index}>
                                                        <div className="wishlist_details_products">
                                                            <Link to={`/${item.product.url}`}> 
                                                                <img src={item.product.images} alt={item.product.name} className="product_details_image" />
                                                            </Link>
                                                            <div className="wishlist_details_content">
                                                                <Link to={`/${item.product.url}`}> 
                                                                    <p className="paragraph bold">
                                                                        {item.product.name}
                                                                    </p>
                                                                </Link>
                                                                <div className="product_price_flex">
                                                                    <p className="item_price_div">
                                                                        <span className="item_price">₹{item.product.price.toLocaleString()}</span>
                                                                        <span className="item_price_actual">₹{item.product.cuttedPrice.toLocaleString()}</span>
                                                                    </p>
                                                                    <p className="discount_price">{item.product.discount}</p>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                        <span className="wishlist_remove_block" onClick={() => deleteWishlistHandler(item._id)}><FaTrash /></span>  
                                                    </div>
                                                ))
                                            :
                                            <div className="empty_cart_block no_border">
                                                <PiEmpty className="cart_empty_icon" />
                                                <p className="paragraph">You have no items in your wishlist. Start adding!</p>
                                            </div>
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

export default Wishlists