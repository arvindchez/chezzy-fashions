import React, { Component } from 'react';
import { connect } from "react-redux";
import { createOrder } from "../actions/order";
import { Link } from 'react-router-dom';
import Orders from '../components/OrderSummary/Orders';

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
        {
          this.props.showOrder ? (
            <Orders />
          ) : (
              <div className="processing-list">
                <button onClick={this.createOrder}>Complete Order</button>
                <Link to="/cart">Back</Link>
              </div>
            )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ cartItems: state.cart.cartItems, showOrder: state.order.showOrder }),
  {
    createOrder
  }
)(Processing);
