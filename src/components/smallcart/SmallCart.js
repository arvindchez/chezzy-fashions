import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { removeFromCart, clearCart, addToCart, removeByItemFromCart } from "../../actions/cart";
import { showCheckout } from "../../actions/order";
import { formatCurrency } from "../../helper/utils";
import emptyCart from '../../images/emptycart.png';

class SmallCart extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      <div class="row">
        <div class="column">
          <div>
            {cartItems && cartItems.length === 0 ? (
              <div>
                <div className="cart cart-header">Your cart is empty</div>
                <img src={emptyCart} height="80%" width="80%" alt="Cart is empty"></img>
              </div>
            ) : (
                <div className="cart cart-header">
                  {"  "}
                            You have {cartItems ? cartItems.length : "0"}
                  {cartItems && cartItems.length > 1 ?
                    " items" : " item"} in the cart{" "}
                </div>
              )}
          </div>
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
                        <button className="cartitem-count"
                          onClick={() => {
                            if (item.count === 1) {
                              this.setState({ showCheckout: false })
                              this.props.removeFromCart(item)
                            } else {
                              this.props.removeByItemFromCart(item)
                            }
                          }}>
                          <FaChevronCircleLeft />
                        </button>
                        <p className="mb-1">{item.count}</p>
                        <button className="cartitem-count" onClick={() =>
                          this.props.addToCart(item)
                        }>
                          <FaChevronCircleRight />
                        </button>
                      </div>
                      <p className="mb-1">{item.title}- (Size/Colour - {item.selectedSize} / {item.selectedColor})</p>

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
        </div>

        <div class="column">
          <div>
            {cartItems && cartItems.length !== 0 && (
              <Fade bottom>
                <div className="col-sm-3 p-3">
                  <div className="card card-body">
                    <p className="mb-1">Total Items</p>
                    <h4 className=" mb-3 txt-right">{cartItems.length}</h4>
                    <p className="mb-1">Total Payment</p>
                    <h3 className="m-0 txt-right">{formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}</h3>
                    <hr className="my-4" />
                    <div className="text-center">
                      <button type="button" className="button proceed" onClick={() => {
                        this.props.showCheckout(true);
                      }}>Check out</button>
                      <button type="button" className="button clear" onClick={() => {
                        this.props.clearCart()
                      }}>Clear Cart</button>
                    </div>
                  </div>
                </div>
              </Fade>
            )}
          </div>
        </div>
      </div >
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems
  }),
  { removeFromCart, addToCart, removeByItemFromCart, clearCart, showCheckout }
)(SmallCart);
