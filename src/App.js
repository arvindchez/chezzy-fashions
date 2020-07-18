import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import ContactUs from './components/contactus/ContactUs'
import Navbar from "./components/navbar/Navbar";

import GlobalStyle from './styles/Global';
import BigCart from "./components/bigcart/BigCart";

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
        <Provider store={store}>
          <div className="grid-container">
            <header>
              <Navbar
                navbarState={this.state.navbarOpen}
                handleNavbar={this.handleNavbar}
              />
            </header>
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/cart" component={BigCart} />
            <Route exact path="/admin" component={AdminScreen} />
            <Route exact path="/" component={HomeScreen} />
            <footer>Chez Corporation. All right is reserved.</footer>
          </div>
        </Provider>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
