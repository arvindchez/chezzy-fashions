import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import persistReducer from "../reducers/index";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
export default { store, persistor };
