import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        <div className="login_form py-5">
            <Container>
                <Row>
                    <Col>
                        <Form noValidate validated={validated} onSubmit={handleLogin}>
                            <Row className="mb-3">
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

                            <Row className="mb-3">
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

                            <Button type="submit" disabled={loading}>
                                {loading ? "Loading" : "Login"}
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login