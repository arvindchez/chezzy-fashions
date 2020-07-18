import React, { Component } from 'react'
import styled from "styled-components";
import { FaShoppingCart } from 'react-icons/fa';
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { animated } from "react-spring";

class SmallCart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <Fade left cascade>
        <CartDiv>
          <a href="/cart">{
            cartItems && cartItems.length > 0 ? cartItems.length : ""
          }</a>
          <FaShoppingCart className="small-cart" />
        </CartDiv>
      </Fade >
    )
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  })
)(SmallCart);

const CartDiv = styled(animated.div)`
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 75;
    `;
