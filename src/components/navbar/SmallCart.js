import React, { Component } from 'react'
import styled from "styled-components";
import { FaShoppingCart } from 'react-icons/fa';
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { animated } from "react-spring";


class SmallCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      showCheckout: false,
    };
  }

  render() {
    const { cartItems } = this.props;
    return (
      <Fade left cascade>
        <NavLinks>
          <a href="/cart"> {
            cartItems ? cartItems.length : "0"
          }
            < FaShoppingCart className="cart-test" /></a>
        </NavLinks>

      </Fade>
    )
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  })
)(SmallCart);


const NavLinks = styled(animated.a)`
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    `;

