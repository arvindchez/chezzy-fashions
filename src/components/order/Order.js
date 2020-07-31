import React, { Component } from 'react'
import { formatCurrency, convertToAppDate } from "../../helper/utils";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { clearOrder } from "../../actions/order";

Modal.setAppElement('#root');
class Order extends Component {
    closeModal = () => {
        this.props.clearOrder();
    };

    render() {
        const { order } = this.props;
        return (
            <div>
                {order && (
                    <Modal style={{ overlay: { zIndex: 3 } }} isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="btn btn-sm" onClick={this.closeModal}>x</button>
                            <div className="order-details">
                                <h3 className="success-message">Your order has been placed.</h3>
                                <h2>{order._id}</h2>
                                <ul>
                                    <li>
                                        <div>Date:</div>
                                        <div>{convertToAppDate(order.createdAt)}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{formatCurrency(order.total)}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>
                                            {order.cartItems.map((x, index) => (
                                                <div key={index}>
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
            </div>
        )
    }
}


export default connect(
    (state) => ({
        order: state.orders.order
    }),
    { clearOrder }
)(Order);
