import React from "react";
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
import Fade from "react-reveal/Fade";
import OrderDetails from "./screens/OrderDetails";

class App extends React.Component {
  state = {
    navbarOpen: false
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    return (
      <>
        <header>
          <Brand />
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
        </header>
        <main>
          <Router history={history}>
            <Fade right cascade>
              {this.props.alert.message &&
                <div className={`alert ${this.props.alert.type}`}>{this.props.alert.message}</div>
              }
            </Fade>
            <Switch>
              <PrivateRoute exact path="/myorders" component={OrderDetails} />
              <PrivateRoute exact path="/processing" component={Processing} />
              <Route exact path="/contactus" component={ContactUs} />
              <Route exact path="/cart" component={BigCart} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/" component={Home} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </main>
      </>
    );
  }
}


export default connect(
  (state) => ({
    alert: state.alert
  })
)(App);