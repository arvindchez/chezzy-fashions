import React, { Component } from "react";
import { formatCurrency, convertToAppDate } from "../../helper/utils";
import Fade from "react-reveal/Fade";

class Order extends Component {

    render() {
        const { order } = this.props;

        return (
            <div >
                <Fade bottom cascade>
                    <article className="customer-user">
                        <div><strong>Order Number:</strong> {order._id}</div>
                        <div><strong>Total:</strong> {formatCurrency(order.total)}</div>
                        <div><strong>Order Date:</strong> {convertToAppDate(order.createdAt)}</div>
                        <div><strong>Items:</strong>
                            {order.cartItems.map((item, index) => (
                                <div key={index}>
                                    {item.count} {" x "} {item.title} {"(Size/Colour -"} {item.selectedSize} {"/"} {item.selectedColor}{")"}
                                </div>
                            ))}
                        </div>
                    </article>
                </Fade>
            </div >
        );
    }
}


export default Order;



