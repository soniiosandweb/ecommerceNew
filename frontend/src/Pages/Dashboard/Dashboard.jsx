import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap"
import DashboardSidebar from "./DashboardSidebar"
import SEO from "../../Layout/SEO";

const Dashboard = () => {
    return(
        <>

            <SEO title={"Dashboard- Ecomart"} />

            <div className="dashboard_section padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <div className="dashboard_flex">
                                <div className="dashboard_left_col">
                                    <DashboardSidebar />
                                </div>

                                <div className="dashboard_right_col">
                                    <div className="dashboard_sidebar_cols">

                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Dashboard