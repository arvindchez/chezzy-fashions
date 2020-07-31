import React from 'react'
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { formatCurrency } from "../../helper/utils";
import { FaSmileWink } from 'react-icons/fa';

const CartPopUp = (props) => {

    const { cartItems } = props
    return (
        <div>        <Fade bottom>
            {
                <div>
                    {
                        cartItems && cartItems.length === 0 ?
                            (<div>
                                <h5>Cart empty!!! Lets get shopping....<FaSmileWink className="empty-cart-smile" /> </h5>
                            </div>
                            ) : (
                                <div className="cartlist-item summary">
                                    <div>
                                        {"  "} You have {cartItems ? cartItems.length : "0"}
                                        {cartItems && cartItems.length > 1 ?
                                            " items" : " item"} in the cart{" "}
                                    </div>
                                </div>
                            )
                    }

                    {cartItems && cartItems.length !== 0 && (
                        <div>
                            <div className="card card-body">
                                <div> <p className="mb-1 text-left">Order value</p></div>
                                <h6 className="m-0 txt-right">{formatCurrency(
                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                )}</h6>
                                <hr className="my-4" />
                                <div> <p className="mb-1 text-left">Total</p></div>
                                <h6 className="m-0 txt-right">{formatCurrency(
                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                )}</h6>
                            </div>
                        </div>

                    )}
                </div>
            } </Fade>
        </div>
    )
}

export default connect(
    (state) => ({
        cartItems: state.cart.cartItems
    })
)(CartPopUp);
