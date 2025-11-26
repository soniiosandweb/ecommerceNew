import { useSnackbar } from 'notistack';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Store/Actions/userActions';
import { useNavigate } from 'react-router-dom';

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
                                <>
                                    <Nav.Link><b>Welcome {user.name}</b></Nav.Link>
                                    <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;