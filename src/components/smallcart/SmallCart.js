import React, { Component } from 'react'
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { removeFromCart, addToCart, removeByItemFromCart } from "../../actions/cart";
import { formatCurrency } from "../../helper/utils";


class SmallCart extends Component {


  render() {
    const { cartItems } = this.props;
    const defaultImg = "/images/common/no-product-image.png";
    const imagePath = `/images/${process.env.REACT_APP_NAME}/`;

    return (
      <Fade left cascade>
        <ul className="cart-items">
          {cartItems && cartItems.map((item, index) => (
            <li key={index}>
              <div>
                <img src={imagePath + item.category + "/" + item.image || defaultImg} alt={item.title}></img>
              </div>
              <div>
                <div className="cartitem-count">
                  <button className="cartitem-addremove" onClick={() => {
                    if (item.count === 1) {
                      this.setState({ showCheckout: false })
                      this.props.removeFromCart(item)
                    } else {
                      this.props.removeByItemFromCart(item)
                    }
                  }}>
                    <FaChevronCircleLeft className="cartitem-counter" />
                  </button>
                  <p>{item.count}</p>
                  <button className="cartitem-addremove" onClick={() =>
                    this.props.addToCart(item)
                  }>
                    <FaChevronCircleRight className="cartitem-counter" />
                  </button>
                </div>
                <p className="mb-1">{item.title}- (Size/Colour - {item.selectedSize} / {item.selectedColor})</p>

                <div className="cartitem-remove">
                  {formatCurrency(item.price)} x {item.count}{" "}
                  <Fade left cascade>
                    <button className="btn btn-sm"
                      onClick={() => {
                        this.setState({ showCheckout: false })
                        this.props.removeFromCart(item)
                      }
                      }
                    >Remove</button></Fade>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems
  }),
  { removeFromCart, addToCart, removeByItemFromCart }
)(SmallCart);
