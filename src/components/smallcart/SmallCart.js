import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { removeFromCart, clearCart, addToCart, removeByItemFromCart } from "../../actions/cart";
import { createOrder, clearOrder } from "../../actions/order";
import { Container } from "./SmallCartStyles";
import { formatCurrency } from "../../helper/utils";

class SmallCart extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      <Container>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems && cartItems.map((item, index) => (
                <li key={index}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div className="cartitem-count">
                      <button className="amount-btn" onClick={() =>
                        this.props.addToCart(item)
                      }>
                        <FaPlus />
                      </button>
                      <p className="amount">{item.count}</p>
                      <button
                        className="amount-btn"
                        onClick={() => {
                          if (item.count === 1) {
                            this.setState({ showCheckout: false })
                            this.props.removeFromCart(item)
                          } else {
                            this.props.removeByItemFromCart(item)
                          }
                        }}>
                        <FaMinus />
                      </button>
                    </div>
                    <div>{item.title}- (Size/Colour - {item.selectedSize} / {item.selectedColor})</div>

                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <Fade left cascade>
                        <button
                          className="button remove"
                          onClick={() => {
                            this.setState({ showCheckout: false })
                            this.props.removeFromCart(item)
                          }
                          }
                        >Remove</button></Fade>
                    </div>

                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </Container >
    );

  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, addToCart, removeByItemFromCart, clearCart, createOrder, clearOrder }
)(SmallCart);