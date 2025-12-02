import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Home.css";
import { Link } from "react-router-dom";
import SEO from '../../Layout/SEO';
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../Store/Actions/cartActions';
import { useSnackbar } from 'notistack';

const productsLists = [
    {
        product: 1,
        url: "glass-and-steel-dining-table",
        name: "Glass And Steel Dining Table",
        image: "https://m.media-amazon.com/images/I/61t7aIC5JrL._AC_UF894,1000_QL80_.jpg",
        price: 18000,
        cuttedPrice: 23000,
        bestseller: true,
        discount: "23% off",
    },
    {
        product: 2,
        url: "mars-king-hydraulic-storage-bed",
        name: "Mars King Hydraulic Storage Bed",
        image: "https://m.media-amazon.com/images/I/61C-yGOB7eL._AC_UF894,1000_QL80_.jpg",
        price: 28000,
        cuttedPrice: 46000,
        bestseller: true,
        discount: "38% off",
    },
    {
        product: 3,
        url: "elevate-pocket-spring-mattress",
        name: "Elevate Pocket Spring Mattress",
        image: "https://m.media-amazon.com/images/I/41tugWxtMKL._SY300_SX300_QL70_FMwebp_.jpg",
        price: 7549,
        cuttedPrice: 1298,
        bestseller: true,
        discount: "35% off",
    },
    {
        product: 4,
        url: "arvia-dining-chair-with-arm",
        name: "Arvia Dining Chair with Arm",
        image: "https://m.media-amazon.com/images/I/71+DAzMnv0L._AC_UF350,350_QL50_.jpg",
        price: 5999,
        cuttedPrice: 11499,
        bestseller: false,
        discount: "44% off",
    }
]

const Home = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleAddToCart = (item) => {
        dispatch(addItemsToCart(item));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    return(

        <>
            <SEO
                name={"Home - Eco Mart"}
            />

            <div className="home_page padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <h2 className='main_heading'>Top Selling Products</h2>
                            <div className="products_grid_block less-padding-top">
                                {productsLists.map((item, i) => (
                                    <div className="products_grid_item" key={i}>
                                        <div className="product_image_block">
                                            <Link to={item.url}>
                                                <img src={item.image} alt={item.name} className="product_image" />
                                                {item.bestseller && <span className="best_seller">Best Seller</span>}
                                                <span className="wishlist_items"><FaRegHeart /></span>
                                            </Link>
                                        </div>
                                        <div className="product_contents">
                                            <Link to={item.url} className="product_title">{item.name}</Link>
                                            <div className="product_price_flex">
                                                <p className="item_price_div">
                                                    <span className="item_price">₹{item.price.toLocaleString('en-US')}</span>
                                                    <span className="item_price_actual">₹{item.cuttedPrice.toLocaleString('en-US')}</span>
                                                </p>
                                                <p className="discount_price">{item.discount}</p>
                                            </div>
                                            <Button className="add_to_cart_btn" onClick={() => handleAddToCart(item)}>Add To Cart</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        </>    
    )
}

export default Home