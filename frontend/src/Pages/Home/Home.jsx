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
        id: 1,
        slug: "glass-and-steel-dining-table",
        title: "Glass And Steel Dining Table",
        image: "https://m.media-amazon.com/images/I/61t7aIC5JrL._AC_UF894,1000_QL80_.jpg",
        price: 18000,
        actualPrice: 23000,
        bestseller: true,
        discount: "23% off",
    },
    {
        id: 2,
        slug: "engineered-wood-bed-hydraulic-storage-mars",
        title: "Mars King Hydraulic Storage Bed Omega Pearl",
        image: "https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/UP_Beds/WEWB7872HYSUPOPLMARS/1.jpg",
        price: 30104,
        actualPrice: 48399,
        bestseller: true,
        discount: "38% off",
    },
    {
        id: 3,
        slug: "ortho-spring-mattress-elevate",
        title: "Elevate Pocket Spring Mattress",
        image: "https://ik.imagekit.io/2xkwa8s1i/img/pocket-spring-mattress/new/1.jpg",
        price: 8898,
        actualPrice: 13699,
        bestseller: true,
        discount: "35% off",
    },
    {
        id: 4,
        slug: "arvia-dining-chair-with-arm",
        title: "Arvia Dining Chair with Arm- Robin Tan",
        image: "https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/Chairs/WDINEARVWAC1RTBK/WDINEARVWAC1RTBK_LS_1.jpg",
        price: 6999,
        actualPrice: 12499,
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
                title={"Home - Eco Mart"}
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
                                            <Link to={item.slug} target="_blank">
                                                <img src={item.image} alt={item.title} className="product_image" />
                                                {item.bestseller && <span className="best_seller">Best Seller</span>}
                                                <span className="wishlist_items"><FaRegHeart /></span>
                                            </Link>
                                        </div>
                                        <div className="product_contents">
                                            <Link to={item.slug} target="_blank" className="product_title">{item.title}</Link>
                                            <div className="product_price_flex">
                                                <p className="item_price_div">
                                                    <span className="item_price">₹{item.price.toLocaleString('en-US')}</span>
                                                    <span className="item_price_actual">₹{item.actualPrice.toLocaleString('en-US')}</span>
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