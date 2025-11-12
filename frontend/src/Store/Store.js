import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './Reducers.js/userReducers';

const reducer = combineReducers({
    user: userReducer,
});

let initialState = {
}

const middleware = [thunk];

const Store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware)
));

export default Store;