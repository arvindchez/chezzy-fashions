import React, { Component } from "react";
import Filter from "../components/filter/Filter";
import Products from "../components/Products";
import { FaFilter } from 'react-icons/fa';
import Fade from "react-reveal/Fade";

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
            <Fade top cascade>
              <div className="filter-container" onClick={this.hideComponent}>
                <FaFilter />
              </div>
            </Fade>
            {showFilter && <Filter />}
            <Products></Products>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen

