import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { thunk } from 'redux-thunk';
import { profileReducer, userReducer } from './Reducers.js/userReducers';
import { cartReducer } from './Reducers.js/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './Reducers.js/orderReducer';

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
});

let initialState = {
    cart: {
        cartItems: window.sessionStorage.getItem('cartItems')
            ? JSON.parse(window.sessionStorage.getItem('cartItems'))
            : [],
        totalAmount: window.sessionStorage.getItem("totalAmount")
            ? JSON.parse(window.sessionStorage.getItem('totalAmount'))
            : null,
    },
}

const middleware = [thunk];

const Store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware)
));

export default Store;