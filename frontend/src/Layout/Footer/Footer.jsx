import {Col, Container, Nav, NavLink, Row} from "react-bootstrap"
import "./Footer.css";
import logo from "../../assests/images/logo-white.png";
import { Link } from "react-router-dom";
import instagram from "../../assests/images/instagram.png";
import facebook from "../../assests/images/facebook.png";
import twitter from "../../assests/images/twitter.png";
import linkedin from "../../assests/images/linkedin.png";
import pinterest from "../../assests/images/pinterest.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const socialIcons = [
    {
        title: "Instagram",
        link: "/",
        icon: instagram,
    },
    {
        title: "Facebook",
        link: "/",
        icon: facebook,
    },
    {
        title: "Twitter",
        link: "/",
        icon: twitter,
    },
    {
        title: "Linkedin",
        link: "/",
        icon: linkedin,
    },
    {
        title: "Pinterest",
        link: "/",
        icon: pinterest,
    }
]

const categoriesLinks = [
    {
        title: "Home & Living",
        link: "/",
    },
    {
        title: "Health & Fitness",
        link: "/",
    },
    {
        title: "Fashion & Apparel",
        link: "/",
    },
    {
        title: "Wellness & Sleep",
        link: "/",
    },
    {
        title: "Beauty & Personal Care",
        link: "/",
    },
    {
        title: "Automotive & Tools",
        link: "/",
    },
    {
        title: "Electronics & Gadgets",
        link: "/",
    },
    {
        title: "Grocery & Essential",
        link: "/",
    },
    {
        title: "All Products",
        link: "/",
    }
]

const policiesLinks = [
    {
        title: "Privacy Policy",
        link: "/",
    },
    {
        title: "FAQs",
        link: "/",
    },
    {
        title: "Payments, Returns & Refunds Warranty",
        link: "/",
    },
    {
        title: "Terms Of Service",
        link: "/",
    }
]

const Footer = () => {
    return (
        <div className="footer_main">
            <Container>
                <Row>
                    <Col>
                        <div className="footer_flex_block">
                            <div className="footer_cols col1">
                                <Link to={"/"}>
                                    <img src={logo} alt="Ecomart Logo" className="footer_logo" />
                                </Link>
                                <p className="footer_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                <ul className="social_icons_footer">
                                    {socialIcons.map((item, i) => (
                                        <li className="social_icons_item" key={i}>
                                            <Link to={item.link} target="_blank">
                                                <img src={item.icon} alt={item.title} className="social_icon" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="footer_cols col2">
                                <p className="footer_heading">Categories</p>
                                <Nav className="footer_navs grid">
                                    {categoriesLinks.map((link, i) => (
                                        <NavLink href={link.link} key={i}>
                                            <MdKeyboardDoubleArrowRight />
                                            {link.title}
                                        </NavLink>
                                    ))}
                                </Nav>
                            </div>

                            <div className="footer_cols col3">
                                <p className="footer_heading">Policies</p>
                                <Nav className="footer_navs">
                                    {policiesLinks.map((link, i) => (
                                        <NavLink href={link.link} key={i}>
                                            <MdKeyboardDoubleArrowRight />
                                            {link.title}
                                        </NavLink>
                                    ))}
                                </Nav>
                            </div>

                            <div className="footer_cols col4">
                                <p className="footer_heading">Help & Support</p>
                                <p className="footer_text bold">Contact Us: <a href="tel:+919883333123">+91 9883333123</a></p>
                                <p className="footer_text">We're here to assist you every day from 9:30 AM to 7:30 PM</p>

                                <p className="footer_text bold mt-4">Registered Office, Manufacturer & Packer</p>
                                <p className="footer_text bold"><b>Ecomart Innovations Limited</b> (Formerly known as Ecomart Innovations Pvt. Ltd.)</p>
                                <p className="footer_text bold mt-2">Address:</p>
                                <p className="footer_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer