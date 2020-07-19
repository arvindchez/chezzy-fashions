import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { createOrder, showCheckout } from "../../actions/order";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: ""
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

        this.props.createOrder(order);
    };

    render() {
        const { showOrder, cartItems } = this.props;
        return (
            <div>
                {showOrder && cartItems && cartItems.length !== 0 && (
                    <Fade right cascade>
                        <div className="form-row">
                            < div className="form-column">
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
                                                Complete Order
                                        </button>
                                        </li>
                                        <li>
                                            <button className="button remove"
                                                onClick={() => {
                                                    this.props.showCheckout(false);
                                                }}

                                            >Back</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>

                    </Fade>
                )
                }
            </div>
        );
    }
}

export default connect(

    (state) => ({
        cartItems: state.cart.cartItems,
        showOrder: state.order.showOrder
    }),
    { createOrder, showCheckout }
)(Checkout);
