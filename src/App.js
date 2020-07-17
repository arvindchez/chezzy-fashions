import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import Navbar from './components/Navbar';
import About from './screens/About'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <Navbar />
          </header>
          <Switch>
            <Route exact strict path="/contactus" component={About} />
            <Route exact strict path="/admin" component={AdminScreen} />
            <Route exact strict path="/" component={HomeScreen} />
          </Switch>
          <footer>Chez Corporation. All right is reserved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
