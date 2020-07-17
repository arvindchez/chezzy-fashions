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

  calDepth = () => {
    if (document.documentElement.scrollTop === 0) {
      if (this.state.showFilter !== false) {
        this.setState({ showFilter: true });
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.calDepth)
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.calDepth)
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
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.hideComponent()
              }}>
                <FaFilter onClick={() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                  this.hideComponent()
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

