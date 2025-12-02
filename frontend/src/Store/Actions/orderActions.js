import axios from "axios";
import { CLEAR_ORDER_ERRORS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../Types/orderTypes";

// New Order
export const newOrderData = (order) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post('/api/order/new', order, config);

        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/orders/me');

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders,
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/order/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearOrderErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ORDER_ERRORS });
}