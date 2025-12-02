import "./Login.css";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { clearErrors, loginUser } from "../../Store/Actions/userActions";
import { useEffect, useState } from "react";

const Login = () => {

    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // handle Login
    const handleLogin = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        event.preventDefault();

        if (form.checkValidity() === true) {
            dispatch(loginUser(email, password));
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return(
        <div className="login_form padding-top padding-bottom">
            <Container>
                <Row>
                    <Col>
                        <Form noValidate validated={validated} onSubmit={handleLogin} className="login_register_form">
                            <h2 className="main_heading">Login</h2>
                            <Row className="form-row">
                                <Form.Group controlId="email_address">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a email address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="form-row">
                                <Form.Group controlId="user_password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Button type="submit" disabled={loading} className="btn_primary">
                                {loading ? "Loading" : "Login"}
                            </Button>

                            <p className="login_register_links">New to Ecomart? <Link to={"/register"}>Create an account</Link></p>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login