import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, TOTAL_AMOUNT } from "../Types/cartTypes";

// add to cart
export const addItemsToCart = (productData, quantity = 1) => async (dispatch, getState) => {

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: productData.product,
            url: productData.url,
            name: productData.name,
            price: productData.price,
            cuttedPrice: productData.cuttedPrice,
            image: productData.image,
            discount: productData.discount,
            quantity,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// remove cart item
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// empty cart
export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

// Set Total Amount
export const setTotalAmount = (amount) => async (dispatch, getState) => {

    dispatch({ 
        type: TOTAL_AMOUNT,
        payload: amount,
     });

     localStorage.setItem('totalAmount', JSON.stringify(getState().cart.totalAmount))
}