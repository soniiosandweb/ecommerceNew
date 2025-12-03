import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { thunk } from 'redux-thunk';
import { profileReducer, userReducer } from './Reducers/userReducers';
import { cartReducer } from './Reducers/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './Reducers/orderReducer';
import { addressReducer, addShippingReducer, shippingReducer } from './Reducers/shippingReducer';
import { addWishlistsReducer, removeWishlistReducer, wishlistsReducer } from './Reducers/wishlistReducer';

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    shipping: shippingReducer,
    newShipping: addShippingReducer,
    address: addressReducer,
    newWishlist: addWishlistsReducer,
    wishlists: wishlistsReducer,
    wishlistItem: removeWishlistReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        totalAmount: localStorage.getItem("totalAmount")
            ? JSON.parse(localStorage.getItem('totalAmount'))
            : null,
    },
}

const middleware = [thunk];

const Store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware)
));

export default Store;