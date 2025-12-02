import { useEffect, useState } from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../Store/Actions/userActions';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [terms, setTerms] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        event.preventDefault();

        if (form.checkValidity() === true) {
            const formdata = new FormData();
            formdata.set("name", name);
            formdata.set("email", email);
            formdata.set("password", password);
            formdata.set("gender", gender);

            dispatch(registerUser(formdata));
        }
    };

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
        <div className="register_form padding-top padding-bottom">
            <Container>
                <Row>
                    <Col>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className="login_register_form">
                            <h2 className="main_heading">Register</h2>
                            <Row className="form-row">
                                <Form.Group controlId="user_name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

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

                            <Row className="form-row">
                                <Form.Group controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <div key={`inline-radio`}>
                                        <Form.Check
                                            inline
                                            label="Male"
                                            name="gender"
                                            type="radio"
                                            id={`inline-radio-1`}
                                            required
                                            value={"male"}
                                            checked={gender === "male"}
                                            onChange={() => setGender("male")}
                                        />
                                        <Form.Check
                                            inline
                                            label="Female"
                                            name="gender"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            required
                                            value={"female"}
                                            checked={gender === "female"}
                                            onChange={() => setGender("female")}
                                        />
                                    </div>
                                </Form.Group>
                                
                            </Row>
                            
                            <Form.Group className="form-row">
                                <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                    checked={terms}
                                    onChange={() => setTerms(!terms)}
                                />
                            </Form.Group>
                            <Button type="submit" disabled={loading} className="btn_primary">
                                {loading ? "Loading" : "Register"}
                            </Button>

                            <p className="login_register_links">Existing User? <Link to={"/login"}>Log in</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register