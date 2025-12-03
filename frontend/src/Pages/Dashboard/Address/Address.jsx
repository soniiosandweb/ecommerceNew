import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SEO from "../../../Layout/SEO";
import DashboardSidebar from "../DashboardSidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { clearShippingErrors, createShipping, getAddressDetails, updateShipping } from "../../../Store/Actions/shippingActions";
import { useEffect } from "react";
import { NEW_SHIPPING_RESET, UPDATE_SHIPPING_RESET } from "../../../Store/Types/shippingTypes";
import states from "../../../utils/states";

const Address = () => {

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { addressInfo, loading } = useSelector((state) => state.address);
    const { success, error } = useSelector((state) => state.newShipping);
    const { isUpdated, error: updateError } = useSelector((state) => state.shipping);

    const [editAddress, setEditAddress] = useState(true);
    
    const [addressId, setAddressId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    // handle Address Submit
    const handleAddressSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }

        if(addressId){
            dispatch(updateShipping(addressId, { address, city, country, state, pincode, phoneNo }));
        } else {
            dispatch(createShipping({ address, city, country, state, pincode, phoneNo }));
        }

    }

    useEffect(() => {
        if(error){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearShippingErrors());
        }
        if (success) {
            dispatch({ type: NEW_SHIPPING_RESET });
            enqueueSnackbar("Address Updated Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
            setEditAddress(true);
        }

        if(updateError){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearShippingErrors());
        }
        if (isUpdated) {
            dispatch({ type: UPDATE_SHIPPING_RESET });
            enqueueSnackbar("Address Updated Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
            setEditAddress(true);
        }

        if(loading === undefined){
            dispatch(getAddressDetails(user._id));
        } 
        if(addressInfo && addressInfo.length > 0 ){
            setAddressId(addressInfo[0]._id);
            setAddress(addressInfo[0].address);
            setCity(addressInfo[0].city);
            setCountry(addressInfo[0].country);
            setState(addressInfo[0].state);
            setPincode(addressInfo[0].pincode);
            setPhoneNo(addressInfo[0].phoneNo);
        }
       
    }, [dispatch, user, enqueueSnackbar, error, success, addressInfo, loading, updateError, isUpdated]);

    return(
        <>
            <SEO title={"Manage Address - Ecomart"} />

            <div className="dashboard_section padding-top padding-bottom">
                <Container>
                    <Row>
                        <Col>
                            <div className="dashboard_flex">
                                <div className="dashboard_left_col">
                                    <DashboardSidebar activeTab={"address"} />
                                </div>

                                <div className="dashboard_right_col">
                                    <div className="dashboard_sidebar_cols">
                                        <h2 className="dashboard_heading">Manage Address <Button className="edit_profile_btn" onClick={() => setEditAddress(!editAddress)}>Edit</Button></h2>

                                        <Form onSubmit={handleAddressSubmit} className="dashboard_profile_form">

                                            <Row className="form-row">
                                                <Form.Group controlId="user_address">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        disabled={editAddress}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="user_city">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="City"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        disabled={editAddress}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="user_state">
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Select name="user_state" value={state} onChange={(e) => setState(e.target.value)} required disabled={editAddress}>
                                                        <option value="">Select State</option>
                                                        {states.map((item) => (
                                                            <option key={item.code} value={item.name}>{item.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="user_pincode">
                                                    <Form.Label>Pincode</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Pincode"
                                                        value={pincode}
                                                        onChange={(e) => setPincode(e.target.value)}
                                                        disabled={editAddress}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="user_country">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Select name="user_country" value={country} onChange={(e) => setCountry(e.target.value)} required disabled={editAddress}>
                                                        <option value="">Select Country</option>
                                                        <option value={"IN"}>India</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>

                                            <Row className="form-row">
                                                <Form.Group controlId="user_phone">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Phone Number"
                                                        value={phoneNo}
                                                        onChange={(e) => setPhoneNo(e.target.value)}
                                                        disabled={editAddress}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Button type="submit" disabled={editAddress} className="btn_primary update_profile_btn">Submit</Button>
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

export default Address