import React, { Component } from 'react'
import SmallCart from '../smallcart/SmallCart';
import { connect } from "react-redux";
import emptyCart from '../../images/emptycart.gif';
import Fade from "react-reveal/Fade";
import { formatCurrency } from "../../helper/utils";
import { clearCart } from "../../actions/cart";
import Order from "../order/Order"
import Checkout from '../checkout/Checkout';
import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class BigCart extends Component {
    render() {
        const { showOrder, cartItems } = this.props;

        return (
            <section className="cartlist">
                <div className="cartlist-container">
                    <div className="cartlist-item summary">
                        {cartItems && cartItems.length === 0 ? (
                            <div>
                                <div>
                                    {!showOrder ? "Your cart is empty" : "Complete your order"}
                                </div>
                                <img src={emptyCart} height="30%" width="40%" alt="Cart is empty"></img>
                            </div>
                        ) : (<div>{!showOrder ?
                            <div><FaShoppingBasket />
                                {"  "} You have {cartItems ? cartItems.length : "0"}
                                {cartItems && cartItems.length > 1 ?
                                    " items" : " item"} in the cart{" "}
                            </div> :
                            <div >Complete your order</div>

                        }
                        </div>
                            )}
                    </div>
                    <div>
                        {showOrder && (
                            <Checkout />
                        )}
                        <Order />
                    </div>
                    <div className="cartlist-item details">
                        {!showOrder && (
                            <SmallCart />
                        )
                        }
                    </div>
                    <div className="cartlist-item total">
                        {<div>
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
                                                <Link to="/processing" className="btn btn-link">Check out</Link>
                                                <button type="button" onClick={() => {
                                                    this.props.clearCart()
                                                }}>Clear Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            )}
                        </div>
                        }
                    </div>
                </div>
            </section >
        );
    }
}


export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
        showOrder: state.order.showOrder,
    }),
    { clearCart }
)(BigCart);
