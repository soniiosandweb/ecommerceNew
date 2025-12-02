import { CLEAR_ORDER_ERRORS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../Types/orderTypes";

export const newOrderReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_ORDER_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                order: payload,
            };
        case NEW_ORDER_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ORDER_ERRORS:
            return {
                ...state,
                error: null,
                success: null,
                order: null,
            };
        default:
            return state;
    }
};

export const myOrdersReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
            };
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: payload,
            };
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ORDER_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { order: {} }, { type, payload }) => {
    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ORDER_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};