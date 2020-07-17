import React, { Component } from "react";
import formatCurrency from "../helper/utils";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import emptyCart from '../images/emptycart.png';
import { removeFromCart } from "../actions/cart";
import { createOrder, clearOrder } from "../actions/order";
import { FaShoppingBag } from 'react-icons/fa';


class Cart extends Component {
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

    closeModal = () => {
        this.props.clearOrder();
    };

    render() {
        const { cartItems, order } = this.props;
        return (
            <div>
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

                {order && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
              </button>
                            <div className="order-details">
                                <h3 className="success-message">Your order has been placed.</h3>
                                <h2>Order {order._id}</h2>
                                <ul>
                                    <li>
                                        <div>Name:</div>
                                        <div>{order.name}</div>
                                    </li>
                                    <li>
                                        <div>Email:</div>
                                        <div>{order.email}</div>
                                    </li>
                                    <li>
                                        <div>Phone:</div>
                                        <div>{order.phone}</div>
                                    </li>
                                    <li>
                                        <div>Address:</div>
                                        <div>{order.address}</div>
                                    </li>
                                    <li>
                                        <div>Date:</div>
                                        <div>{order.createdAt}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{formatCurrency(order.total)}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>
                                            {order.cartItems.map((x) => (
                                                <div>
                                                    {x.count} {" x "} {x.title} {"(Size/Colour -"} {x.selectedSize} {"/"} {x.selectedColor}{")"}
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                    </Modal>
                )}
                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems && cartItems.map((item) => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}- (Size/Colour - {item.selectedSize} / {item.selectedColor})</div>

                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count}{" "}
                                                <button
                                                    className="button remove"
                                                    onClick={() => {
                                                        this.setState({ showCheckout: false })
                                                        this.props.removeFromCart(item)
                                                    }
                                                    }
                                                >
                                                    Remove
                        </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems && cartItems.length !== 0 && (
                        <div>
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
            </div>
        );
    }
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart, createOrder, clearOrder }
)(Cart);
