import { Button, Col, Container, Form, Row } from "react-bootstrap"
import SEO from "../../../Layout/SEO"
import DashboardSidebar from "../DashboardSidebar"
import { useState } from "react";
import { clearErrors, loadUser, updatePassword } from "../../../Store/Actions/userActions";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UPDATE_PASSWORD_RESET } from "../../../Store/Types/userTypes";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Handle Update Password
    const updatePasswordHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
        
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return(
        <>
            <SEO title={"Change Password - Ecomart"} />

            <div className="dashboard_section padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <div className="dashboard_flex">
                                <div className="dashboard_left_col">
                                    <DashboardSidebar activeTab={"password"} />
                                </div>
            
                                <div className="dashboard_right_col">
                                    <div className="dashboard_sidebar_cols">
                                        <h2 className="dashboard_heading">Update Password</h2>
                                        <Form onSubmit={updatePasswordHandler} className="dashboard_profile_form">

                                            <Row className="form-row">
                                                <Form.Group controlId="current_password">
                                                    <Form.Label>Current Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="Current Password"
                                                        value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="new_password">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="New Password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="confirm_password">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Button type="submit" disabled={loading} className="btn_primary update_profile_btn">{loading ? "Processing..." : "Update"}</Button>

                                        </Form>
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

export default UpdatePassword