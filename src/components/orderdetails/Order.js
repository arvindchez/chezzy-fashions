import React, { Component } from "react";
import { formatCurrency, convertToAppDate } from "../../helper/utils";
import Fade from "react-reveal/Fade";

class Order extends Component {

    render() {
        const { order } = this.props;

        return (
            <div >
                <Fade bottom cascade>
                    <article className="order-details">
                        <div className="col a"><strong></strong> {order._id}</div>
                        <div className="col a"><strong></strong> {formatCurrency(order.total)}</div>
                        <div className="col a"><strong></strong> {convertToAppDate(order.createdAt)}</div>
                        <div className="col b"><strong></strong>
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



