import "./Header.css";
import { useSnackbar } from 'notistack';
import {Container, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Store/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import logo from "../../assests/images/logo-white.png";
import homeIcon from "../../assests/images/home-icon.png";
import aboutIcon from "../../assests/images/user-groups.png";
import blogIcon from "../../assests/images/article.png";
import contactIcon from "../../assests/images/contact-us.png";
import cartIcon from "../../assests/images/shopping-cart.png";
import wishlistIcon from "../../assests/images/e-commerce.png";
import shopIcon from "../../assests/images/shopping-bag.png";
import accountIcon from "../../assests/images/account.png";
import menuIcon from "../../assests/images/menu-button.png";

const menuItems = [
    {
        title: "Home",
        icon: homeIcon,
        link: "/",
    },
    {
        title: "About Us",
        icon: aboutIcon,
        link: "/",
    },
    {
        title: "Blog",
        icon: blogIcon,
        link: "/",
    },
    {
        title: "Contact Us",
        icon: contactIcon,
        link: "/",
    }
];

const shopMenu = [
    {
        title: "Cart",
        icon: cartIcon,
        link: "/cart",
    },
    {
        title: "Wishlist",
        icon: wishlistIcon,
        link: "/",
    },
    {
        title: "Shop",
        icon: shopIcon,
        link: "/",
    }
]

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        if(user.role === "admin"){
            navigate("/admin");
        } else {
            navigate("/login");
        }
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    }

    return (
        <Navbar collapseOnSelect expand="md" className="header_main">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt='Ecomart Logo' className='logo_header' />
                </Navbar.Brand>
                
                <Navbar.Offcanvas
                    id={`responsive-navbar-nav`}
                    aria-labelledby={`responsive-navbar-navLabel`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton></Offcanvas.Header>

                    <Offcanvas.Body className="justify-content-end">
                        <Nav className="header_navbar">
                            {menuItems.map((item,i) => (
                                <Nav.Link href={item.link} key={i}>
                                    <img src={item.icon} alt={item.title} className="menu_icon" />
                                    {item.title}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <div className="right_header">
                    <Nav className="header_navbar">
                        {shopMenu.map((item,i) => (
                            <Nav.Link href={item.link} key={i}>
                                <img src={item.icon} alt={item.title} className="menu_icon" />
                            </Nav.Link>
                        ))}

                        <NavDropdown title={<img src={accountIcon} alt="account" className="account_icon" />} id="basic-nav-dropdown">

                            {isAuthenticated === false ?
                                <>
                                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                </>
                            :
                                <>
                                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                </>
                            }
                        </NavDropdown>
                    </Nav>
                </div>

                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <img src={menuIcon} alt="Menu Icon" className="menu_icon_header" />
                </Navbar.Toggle>

            </Container>
        </Navbar>
    );
}

export default Header;