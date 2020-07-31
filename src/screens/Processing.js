/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from "react-redux";
import { createOrder, confirmOrder } from "../actions/order";
import { Link } from 'react-router-dom';
import Title from '../components/title/Title';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }

    script.onerror = () => {
      resolve(false)
    }

    document.body.appendChild(script)
  })
}

const Processing = (props) => {
  const logo = "/images/logo/logo.png";

  const [paymentMode, setPaymentMode] = useState("");

  const handlePaymentOptions = (e) => {
    setPaymentMode(e.target.value);

    if (e.target.value !== "cod") {
      const order = {
        cartItems: props.cartItems,
        paymenttype: e.target.value
      };

      props.createOrder(order);
    }
  }

  const handleCOD = async () => {
    const order = {
      cartItems: props.cartItems,
      paymenttype: paymentMode
    };

    props.createOrder(order);
  }

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Payment page failed to load. Are you online?')
      return
    }

    const order = props.order

    const options = {
      key: process.env.REACT_APP_RAZORPAY_APIKEY,
      currency: order.currency,
      amount: order.total,
      order_id: order.paymentid,
      name: 'Your shopping details below.',
      description: 'Please make the payment.',
      image: logo,
      handler: function (response) {
        props.confirmOrder(order);
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  if (!props.cartItems) {
    return (
      <div> Payment page loading...</div>
    )
  }

  return (
    <> <Title title={"Payments"} />
      <div className="processing-list">
        <ul>
          {props.cartItems && (
            <div>
              <li>
                <label><input type="radio" name="cod" value="cod"
                  checked={paymentMode === "cod"}
                  onChange={handlePaymentOptions} />{" "}Cash on delivery</label>
              </li>
              <li>
                <label><input type="radio" name="razorpay" value="razorpay"
                  checked={paymentMode === "razorpay"}
                  onChange={handlePaymentOptions} />{" "}Razor Pay</label>
              </li>
            </div>
          )}
          <li>
            {paymentMode === "razorpay" && props.order && (
              <div>
                <button onClick={displayRazorpay} className="btn btn-sm"
                  target="_blank"
                  rel="noopener noreferrer">Make Payment</button>
              </div>

            )}

            {paymentMode === "cod" && (
              <div>
                <button className="btn btn-sm" onClick={handleCOD}>Complete order</button>
              </div>
            )}
          </li>
          <li>
            <Link to="/cart">Back</Link>
          </li>
        </ul>
      </div >
    </>

  );
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.orders.order,
  }),
  {
    createOrder, confirmOrder
  }
)(Processing);
