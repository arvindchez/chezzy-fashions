import React, { Component } from "react";
import Filter from "../components/filter/Filter";
import Products from "../components/Products";
import { FaFilter } from 'react-icons/fa';
import Fade from "react-reveal/Fade";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      scrolled: false
    };

    this.hideComponent = this.hideComponent.bind(this);

  }

  hideComponent() {
    if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
      this.setState({ showFilter: false });
    } else {
      this.setState({ showFilter: !this.state.showFilter });
    }
  }



  render() {
    const { showFilter } = this.state;

    return (
      <div>
        <div className="content">
          <div className="main">
            {showFilter && <Filter />}
            <Fade top cascade>
              <div id="scrollFilter" className="filter-container" onClick={() => {
                this.hideComponent()
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

              }}>
                <FaFilter onClick={() => {
                  this.hideComponent()
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }} />
              </div>
            </Fade>
            <Products></Products>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen

