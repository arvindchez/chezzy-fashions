import React, { Component } from 'react'
import SmallCart from '../smallcart/SmallCart';
import Order from '../order/Order';
import Checkout from '../checkout/Checkout';

class BigCart extends Component {
    render() {
        return (
            <div>
                <SmallCart />
                <Order />
                <Checkout />
            </div>
        );
    }
}

export default BigCart