import React, { Component } from 'react'
import SmallCart from '../smallcart/SmallCart';
import Order from '../order/Order';
import Checkout from '../checkout/Checkout';
import { connect } from "react-redux";
import emptyCart from '../../images/emptycart.gif';

class BigCart extends Component {
    render() {
        const { showOrder, cartItems } = this.props;


        return (
            <div>
                <div className="form-row">
                    < div className="form-column">
                        {cartItems && cartItems.length === 0 ? (
                            <div>
                                <div className="cart cart-header">
                                    {!showOrder ? "Your cart is empty" : "Complete your order"}
                                </div>
                                <img src={emptyCart} height="60%" width="60%" alt="Cart is empty"></img>
                            </div>
                        ) : (<div>{!showOrder ?
                            <div className="cart cart-header">
                                {"  "} You have {cartItems ? cartItems.length : "0"}
                                {cartItems && cartItems.length > 1 ?
                                    " items" : " item"} in the cart{" "}
                            </div> : <div className="cart cart-header">Complete your order</div>
                        }
                        </div>
                            )}
                    </div>
                </div>


                {!showOrder && (
                    <SmallCart />
                )
                }
                {showOrder && (
                    <Checkout />
                )
                }
                <Order />
            </div>
        );
    }
}

export default connect(

    (state) => ({
        showOrder: state.order.showOrder,
        cartItems: state.cart.cartItems
    })
)(BigCart);