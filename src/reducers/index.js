import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { product } from "../reducers/product";
import { cart } from "../reducers/cart";
import { order } from "../reducers/order";
import { registration } from "../reducers/registration";
import { alert } from "../reducers/alert";
import { authentication } from "../reducers/authentication";
import { users } from "../reducers/users";
import { carousel } from "../reducers/carousel";
import { category } from "../reducers/category";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: [
        'products',
        'cart',
        'orders',
        'registration',
        'alert',
        'authentication',
        'users',
        'carousel',
        'catergories'
    ]
}

const rootReducer = combineReducers({
    products: product,
    cart: cart,
    orders: order,
    registration: registration,
    alert: alert,
    authentication: authentication,
    users: users,
    carousel: carousel,
    catergories: category
});

export default persistReducer(persistConfig, rootReducer);