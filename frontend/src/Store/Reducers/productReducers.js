import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_PRODUCTS_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, REMOVE_PRODUCT_DETAILS } from "../Types/productTypes";

export const productsReducer = (state = { products: [] }, { type, payload }) => {

    switch (type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: payload,
            };
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_PRODUCTS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} }, { type, payload }) => {

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case REMOVE_PRODUCT_DETAILS:
            return {
                ...state,
                product: {},
            };
        case CLEAR_PRODUCTS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}