import React from "react";
import Brand from "./components/header/Brand";
import Navbar from "./components/navbar/Navbar";
import { connect } from "react-redux";

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
        <div className="grid-container">
          <header>
            <Brand />
            <Navbar
              navbarState={this.state.navbarOpen}
              handleNavbar={this.handleNavbar}
            />
          </header>
        </div>
      </>
    );
  }
}


export default connect(
  (state) => ({
    alert: state.alert
  })
)(App);

