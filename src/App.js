import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import Navbar from './components/Navbar';
import About from './screens/About'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Navbar />
            </header>
            <main>
              <Route exact strict path="/contactus" component={About} />
              <Route exact strict path="/admin" component={AdminScreen} />
              <Route exact strict path="/" component={HomeScreen} />
            </main>
            <footer>Chez Corporation. All right is reserved.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
