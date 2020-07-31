import React from 'react'
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { formatCurrency } from "../../helper/utils";

const CartToolTip = (props) => {

    const { cartItems } = props
    return (
        <Fade bottom>
            {
                cartItems && (
                    <div>
                        <div>
                            {"  "} You have {cartItems ? cartItems.length : "0"}
                            {cartItems && cartItems.length > 1 ?
                                " items" : " item"} in the cart{" "}
                        </div>
                        <p className="mb-1 text-left">Order value</p>
                        <p className="m-0 txt-right">{formatCurrency(
                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                        )}
                        </p>
                        <p className="mb-1 text-left">Total</p>
                        <p className="m-0 txt-right">{formatCurrency(
                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                        )}</p>
                    </div>
                )}
        </Fade>
    )
}

export default connect(
    (state) => ({
        cartItems: state.cart.cartItems
    })
)(CartToolTip);
