import "./Dashboard.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import DashboardSidebar from "./DashboardSidebar"
import SEO from "../../Layout/SEO";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { clearErrors, loadUser, updateProfile } from "../../Store/Actions/userActions";
import { useEffect } from "react";
import { UPDATE_PROFILE_RESET } from "../../Store/Types/userTypes";
import Loader from "../../Components/Loader/Loader";
import profilePlaceholder from "../../assests/images/profile-placeholder.png";

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const { error, isUpdated, loading : submitLoading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [editProfile, setEditProfile] = useState(true);

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    }

    const handleUpdateDataChange = (e) => {
        let file = e.target.files[0];

        if(file){

            if (file.size > 1e6) {
                enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
                return;
            }
            
            const reader = new FileReader();
            setAvatar("");
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);  
        }
        
    }


    useEffect(() => {

        if (isAuthenticated === false) {
            navigate("/login")
        }

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setAvatarPreview(user.avatar && user.avatar.url);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            //navigate('/account');
            setEditProfile(false);

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [isAuthenticated, dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return(
        <>

            <SEO title={"Dashboard- Ecomart"} />

            <div className="dashboard_section padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <div className="dashboard_flex">
                                <div className="dashboard_left_col">
                                    <DashboardSidebar activeTab={"dashboard"} />
                                </div>

                                <div className="dashboard_right_col">
                                    <div className="dashboard_sidebar_cols">
                                        <h2 className="dashboard_heading">Personal Information <Button className="edit_profile_btn" onClick={() => setEditProfile(!editProfile)}>Edit</Button></h2>
                                        {loading ?
                                            <Loader />
                                        :
                                            <Form onSubmit={updateProfileHandler} encType="multipart/form-data" className="dashboard_profile_form">
                                                <Row className="form-row">
                                                    <Form.Group controlId="user_name">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            readOnly={editProfile}
                                                        />
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
                                                            readOnly={editProfile}
                                                        />
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
                                                                disabled={editProfile}
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
                                                                disabled={editProfile}
                                                            />
                                                        </div>
                                                    </Form.Group>                           
                                                </Row>

                                                <Row className="form-row">
                                                    <Form.Group className="profile_image_block">
                                                        <div className="avatar_preview">
                                                            <img src={avatarPreview ? avatarPreview : profilePlaceholder} alt="Profile" />
                                                        </div>
                                                        <label htmlFor="avatar" className={`image_upload ${editProfile ? "disabled" : "upload"}`}>
                                                            <input
                                                                type="file"
                                                                name="avatar"
                                                                id="avatar"
                                                                accept="image/*"
                                                                onChange={handleUpdateDataChange}
                                                                className="hidden"
                                                                disabled={editProfile}
                                                            />
                                                            Choose File
                                                        </label>
                                                    </Form.Group>                           
                                                </Row>   

                                                <Button type="submit" disabled={editProfile ? editProfile : submitLoading ? submitLoading : false} className="btn_primary update_profile_btn">{submitLoading ? "Processing..." : "Update Profile"}</Button>
                                            </Form>
                                        }
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