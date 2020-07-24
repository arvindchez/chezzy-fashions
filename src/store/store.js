import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { product } from "../reducers/product";
import { cart } from "../reducers/cart";
import { order } from "../reducers/order";
import { registration } from "../reducers/registration";
import { alert } from "../reducers/alert";
import { authentication } from "../reducers/authentication";
import { users } from "../reducers/users";
import { carousel } from "../reducers/carousel";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: product,
        cart: cart,
        orders: order,
        registration: registration,
        alert: alert,
        authentication: authentication,
        users: users,
        carousel: carousel
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
