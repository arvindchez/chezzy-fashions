import React, { Component } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Cart from "../components/Cart";
import { FaFilter } from 'react-icons/fa';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };

    this.hideComponent = this.hideComponent.bind(this);

  }

  hideComponent() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  render() {
    const { showFilter } = this.state;

    return (
      <div>
        <div className="content">
          <div className="main">
            <div className="filter-container" onClick={this.hideComponent}>
              <FaFilter />
            </div>
            {showFilter && <Filter />}
            <Products></Products>
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen