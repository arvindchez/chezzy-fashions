// Feature 1
import React from 'react';
import { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container" >
          <header>
            <a href="/">Chezzy Eshop</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products></Products>
              </div>
              <div className="sidebar">
                <Cart />
              </div>
            </div>
          </main>
          <footer>Chez Corporation. All rights reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
