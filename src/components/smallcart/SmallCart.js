import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { removeFromCart, clearCart, addToCart, removeByItemFromCart } from "../../actions/cart";
import { showCheckout } from "../../actions/order";
import { formatCurrency } from "../../helper/utils";


class SmallCart extends Component {
  render() {
    const { cartItems, showOrder } = this.props;
    return (
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {!showOrder && cartItems && cartItems.map((item, index) => (
              <li key={index}>
                <div>
                  <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                  <div className="cartitem-count">
                    <button className="cartitem-addremove" onClick={() => {
                      if (item.count === 1) {
                        this.setState({ showCheckout: false })
                        this.props.removeFromCart(item)
                      } else {
                        this.props.removeByItemFromCart(item)
                      }
                    }}>
                      <FaChevronCircleLeft className="cartitem-counter" />
                    </button>
                    <p className="mb-1">{item.count}</p>
                    <button className="cartitem-addremove" onClick={() =>
                      this.props.addToCart(item)
                    }>
                      <FaChevronCircleRight className="cartitem-counter" />
                    </button>
                  </div>
                  <p className="mb-1">{item.title}- (Size/Colour - {item.selectedSize} / {item.selectedColor})</p>

                  <div className="cartitem-remove">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <Fade left cascade>
                      <button
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
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems
  }),
  { removeFromCart, addToCart, removeByItemFromCart, clearCart, showCheckout }
)(SmallCart);
