import React, { Component } from 'react'
import SmallCart from '../smallcart/SmallCart';
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { formatCurrency } from "../../helper/utils";
import { clearCart } from "../../actions/cart";
import { FaShoppingBasket, FaSmileWink } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class BigCart extends Component {

    emptyCart = "/images/emptycart.gif";

    render() {
        const { cartItems } = this.props;

        return (
            <div className="cartlist-container">
                {
                    cartItems && cartItems.length === 0 ?
                        (<div>
                            <div className="empty-cart-container">Cart empty!!! Lets get shopping
                                    <FaSmileWink className="empty-cart-smile" /> </div>
                            <img src={this.emptyCart} className="empty-cart" alt="Cart is empty"></img>
                        </div>
                        ) : (
                            <div className="cartlist-item summary">
                                <div>
                                    <FaShoppingBasket />
                                    {"  "} You have {cartItems ? cartItems.length : "0"}
                                    {cartItems && cartItems.length > 1 ?
                                        " items" : " item"} in the cart{" "}
                                </div>
                            </div>
                        )
                }
                <div className="cartlist-item details">
                    <SmallCart />
                </div>
                <div className="cartlist-item total">
                    {<div>
                        {cartItems && cartItems.length !== 0 && (
                            <Fade bottom>
                                <div>
                                    <div className="card card-body">
                                        <p className="mb-1">Total Items</p>
                                        <h4 className=" mb-3 txt-right">{cartItems.length}</h4>
                                        <p className="mb-1">Total Payment</p>
                                        <h3 className="m-0 txt-right">{formatCurrency(
                                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}</h3>
                                        <hr className="my-4" />
                                        <div className="text-center">
                                            <Link to="/processing">Check out</Link>
                                            <button className="btn btn-sm clear-cart" type="button" onClick={() => {
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
        );
    }
}


export default connect(
    (state) => ({
        cartItems: state.cart.cartItems
    }),
    { clearCart }
)(BigCart);
