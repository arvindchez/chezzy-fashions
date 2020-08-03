import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/carousel.css";
import "./styles/product.css";
import "./styles/filter.css";
import "./styles/controls.css";
import "./styles/cart.css";
import "./styles/product-details.css";
import App from "./App";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading/Loading";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={<Loading />} persistor={persistor}></PersistGate>
      <App />
    </Router></Provider>,
  document.getElementById("root")
);