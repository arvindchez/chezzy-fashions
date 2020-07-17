import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import About from './screens/About'
import Navbar from "./components/navbar/Navbar";

import GlobalStyle from './styles/Global';

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
            <Switch>
              <Route exact strict path="/contactus" component={About} />
              <Route exact strict path="/admin" component={AdminScreen} />
              <Route exact strict path="/" component={HomeScreen} />
            </Switch>
            <footer>Chez Corporation. All right is reserved.</footer>
          </div>
        </Provider>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
