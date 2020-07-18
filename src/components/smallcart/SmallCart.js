import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { removeFromCart, clearCart, addToCart, removeByItemFromCart } from "../../actions/cart";
import { Container } from "./SmallCartStyles";
import { formatCurrency } from "../../helper/utils";
import emptyCart from '../../images/emptycart.png';

class SmallCart extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      <Container>
        {cartItems && cartItems.length === 0 ? (
          <div>
            <div className="cart cart-header">Cart is empty</div>
            <img src={emptyCart} height="80%" width="80%" alt="Cart is empty"></img>
          </div>
        ) : (
            <div className="cart cart-header">
              <FaShoppingBag />{"  "}
                            You have {cartItems ? cartItems.length : "0"}
              {cartItems && cartItems.length > 1 ?
                " items" : " item"} in the cart{" "}
            </div>
          )}

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
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, addToCart, removeByItemFromCart, clearCart }
)(SmallCart);
