import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../actions/order";
import { formatCurrency, convertToAppDate } from "../../helper/utils";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders } = this.props;
    return !orders ? (
      <div>Orders</div>
    ) : (
        <div className="orders">
          <h2>Orders</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ITEMS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{convertToAppDate(order.createdAt)}</td>
                  <td> {formatCurrency(order.total)}</td>
                  <td>
                    {order.cartItems.map((item, index) => (
                      <div key={index}>
                        {item.count} {" x "} {item.title} {"(Size/Colour -"} {item.selectedSize} {"/"} {item.selectedColor}{")"}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
export default connect(
  (state) => ({
    orders: state.order.orders,
  }),
  {
    fetchOrders,
  }
)(Orders);
