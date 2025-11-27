import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Home.css";
import { useNavigate } from "react-router-dom";
import SEO from '../../Layout/SEO';

const Home = () => {

    const navigate = useNavigate();

    return(

        <>
            <SEO
                title={"Home - Eco Mart"}
            />

            <div className="home_page">
                <Container>
                    <Row>
                        <Col>
                            <div className='d-flex gap-2 py-5'>
                                <Button onClick={() => navigate("/register")}>Register</Button>
                                <Button onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/payment")}>Payment</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        </>    
    )
}

export default Home