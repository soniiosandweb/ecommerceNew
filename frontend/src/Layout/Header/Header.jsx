import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';

const Header = () => {

    const { isAuthenticated } = useSelector((state) => state.user);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Offcanvas
                    id={`responsive-navbar-nav`}
                    aria-labelledby={`responsive-navbar-navLabel`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`responsive-navbar-navLabel`}>Ecommerce</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <Nav.Link href="/login">Login</Nav.Link>
                            :
                                <Nav.Link href="">Logout</Nav.Link>
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;