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
      <div className="row">
        <div>
        </div>
        < div className="column">
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

                      <div className="right">
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
        </div>

        <div className="column">
          <div>
            {!showOrder && cartItems && cartItems.length !== 0 && (
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
                      <button type="button" onClick={() => {
                        this.props.showCheckout(true);
                      }}>Check out</button>
                      <button type="button" onClick={() => {
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
