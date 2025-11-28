import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../Types/userTypes";
import { EMPTY_CART } from "../Types/cartTypes";

// Register User
export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/register',
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/login',
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/me');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/logout');
        dispatch({ type: LOGOUT_USER_SUCCESS });

        dispatch({ type: EMPTY_CART });
        
        window.sessionStorage.clear();

    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error?.response?.data?.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};