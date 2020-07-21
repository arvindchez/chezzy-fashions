import React, { Component } from 'react';
import { connect } from "react-redux";
import { createOrder } from "../actions/order";
import { Link } from 'react-router-dom';

class Processing extends Component {

  createOrder = (e) => {
    const order = {
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };

    this.props.createOrder(order);
  };

  render() {
    return (
      <div>
        <div className="processing-list">
          {this.props.cartItems && this.props.cartItems.length > 0 ? (
            <div>
              <button onClick={this.createOrder}>Complete Order</button>
              <Link to="/cart">Back</Link>
            </div>) : (
              <Link to="/">Home</Link>
            )
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
  {
    createOrder
  }
)(Processing);
