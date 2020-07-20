import React, { Component } from 'react'
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { animated } from "react-spring";
import { FaShoppingCart } from 'react-icons/fa';

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
   justify-content: center;
    align-items: center;
    cursor: pointer;    
    padding-right: 1rem;
    position: relative;
    height: 0;
    padding-top: calc(var(--height) / var(--width) * 100%);
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #f4f4f4 38%, #fafafa 54%);
    background-size: 1000px 640px;
    animation: placeHolderShimmer 1.8s linear infinite forwards;

    `;
