import React, { Component } from 'react'
import { formatCurrency } from "../../helper/utils";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { FaTrashRestore } from 'react-icons/fa';
import { removeFromCart, clearCart, addToCart, removeByItemFromCart } from "../../actions/cart";
import { createOrder, clearOrder } from "../../actions/order";
import SmallCart from '../smallcart/SmallCart';
import Order from '../order/Order';

class BigCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: "",
            showCheckout: false,
        };
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };

        this.setState({ showCheckout: false })
        this.props.createOrder(order);
    };

    render() {
        const { cartItems } = this.props;
        return (
            <div>
                <SmallCart />
                <Order />
                {cartItems && cartItems.length !== 0 && (
                    <div>
                        <Fade bottom>
                            <button className="button clear"
                                onClick={() => {
                                    this.setState({ showCheckout: true });
                                    this.props.clearCart()
                                }}><FaTrashRestore />Clear Cart</button>
                            <div className="cart">
                                <div className="total">

                                    <div>
                                        <strong>Total:{" "}
                                            {formatCurrency(
                                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                            )}</strong>
                                    </div>
                                    <button
                                        onClick={() => {
                                            this.setState({ showCheckout: true });
                                        }}
                                        className="button proceed"
                                    >Proceed</button>
                                </div>
                            </div>
                        </Fade>
                        {this.state.showCheckout && (
                            <Fade right cascade>
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email:</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="Your email"
                                                    onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <label>Name:</label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    required
                                                    placeholder="Your name"
                                                    onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <label>Phone Number:</label>
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    required
                                                    placeholder="Your phone number"
                                                    onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <label>Address:</label>
                                                <input
                                                    name="address"
                                                    type="text"
                                                    required
                                                    placeholder="Your address"
                                                    onChange={this.handleInput}
                                                ></input>
                                            </li>
                                            <li>
                                                <button className="button proceed" type="submit">
                                                    Checkout
                                                    </button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </Fade>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart, addToCart, removeByItemFromCart, clearCart, createOrder, clearOrder }
)(BigCart);
