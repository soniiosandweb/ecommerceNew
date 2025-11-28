import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './Reducers.js/userReducers';
import { cartReducer } from './Reducers.js/cartReducer';

const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
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