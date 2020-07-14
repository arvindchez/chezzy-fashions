// Feature 1
import React from 'react';
import data from './data.json';
import { Component } from 'react';
import Products from './components/Products';

class App extends Component {
  constructor() {
    super();

    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  render() {
    return (
      <div className="grid-container" >
        <header>
          <a href="/">Chezzy Eshop</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>Chez Corporation. All rights reserved</footer>
      </div>
    );
  }
}

export default App;
