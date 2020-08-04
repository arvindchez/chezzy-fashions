import React, { useState, useEffect } from "react";
import Brand from "./components/navbar/Brand";
import Navbar from "./components/navbar/Navbar";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Products from "./screens/Products";
import Home from "./screens/Home";
import ContactUs from './components/contactus/ContactUs'
import BigCart from "./components/bigcart/BigCart";
import { RegisterPage } from "./screens/RegisterPage";
import { LoginPage } from "./screens/LoginPage";
import { history } from './helper/history';
import { Router, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/privateroute/PrivateRoute';
import Processing from "./screens/Processing"
import OrderDetails from "./screens/OrderDetails";
import Footer from "./components/footer/Footer";
import ProductDetails from "./components/products/ProductDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from './actions/alert';
import { alertConstants } from './constants/alert';

const App = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbar = () => {
    setNavbarOpen({ navbarOpen: !this.state.navbarOpen });
  }

  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);
  useEffect(() => {
    if (alert.message) {
      switch (alert.type) {
        case alertConstants.SUCCESS:
          toast.success(alert.message)
          break;
        case alertConstants.ERROR:
          toast.error(alert.message)
          break;
        case alertConstants.WARNING:
          toast.warn(alert.message)
          break;
        case alertConstants.INFO:
          toast.info(alert.message)
          break;
        default:
          toast(alert.message)
      }

      dispatch(alertActions.clear());
    }
  }, [alert])

  return (
    <>
      <header>
        <Brand />
        <Navbar
          navbarState={navbarOpen}
          handleNavbar={handleNavbar}
        />
      </header>
      <main>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/myorders" component={OrderDetails} />
            <PrivateRoute exact path="/processing" component={Processing} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/details/:id" component={ProductDetails} />
            <Route exact path="/cart" component={BigCart} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/product" component={Products} />
            <Route exact path="/" component={Home} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  );
}

export default connect(
  (state) => ({
    alert: state.alert
  })
)(App);