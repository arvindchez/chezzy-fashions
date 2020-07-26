import React from "react";
import { Route } from "react-router-dom";
import Products from "./screens/Products";
import ContactUs from './components/contactus/ContactUs'
import Navbar from "./components/navbar/Navbar";
import BigCart from "./components/bigcart/BigCart";
import { RegisterPage } from "./screens/RegisterPage";
import { LoginPage } from "./screens/LoginPage";
import { history } from './helper/history';
import { connect } from "react-redux";
import { Router, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/privateroute/PrivateRoute';
import { clearAlert } from "./actions/alert";
import Processing from "./screens/Processing"
import Fade from "react-reveal/Fade";
import OrderDetails from "./screens/OrderDetails";
import Profile from "./screens/Profile";

class App extends React.Component {
  state = {
    navbarOpen: false
  }

  componentDidMount() {
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlert();
    });
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    return (
      <>
        <div className="grid-container">
          <header>
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
                <PrivateRoute exact path="/me" component={Profile} />
                <Route exact path="/contactus" component={ContactUs} />
                <Route exact path="/cart" component={BigCart} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/" component={Products} />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </main>
          <footer>Chez Corporation. All right is reserved.</footer>
        </div>
      </>
    );
  }
}


export default connect(
  (state) => ({
    alert: state.alert
  }),
  { clearAlert }
)(App);

