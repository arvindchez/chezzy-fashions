import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "../reducers/product";
import { cartReducer } from "../reducers/cart";
import { orderReducer } from "../reducers/order";
import { registration } from "../reducers/registration";
import { alert } from "../reducers/alert";
import { authentication } from "../reducers/authentication";
import { users } from "../reducers/users";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducer,
        order: orderReducer,
        registration: registration,
        alert: alert,
        authentication: authentication,
        users: users,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
