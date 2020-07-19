import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import Products from "./screens/Products";
import AdminScreen from "./screens/AdminScreen";
import ContactUs from './components/contactus/ContactUs'
import Navbar from "./components/navbar/Navbar";
import store from "./store";
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
            <main>
              <Route exact path="/contactus" component={ContactUs} />
              <Route exact path="/cart" component={BigCart} />
              <Route exact path="/admin" component={AdminScreen} />
              <Route exact path="/" component={Products} />
            </main>
            <footer>Chez Corporation. All right is reserved.</footer>
          </div>
        </Provider>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
