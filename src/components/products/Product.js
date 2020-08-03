import React, { Component } from "react";
import { formatCurrency } from "../../helper/utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { FaShoppingBasket } from "react-icons/fa";
import { addToCart } from "../../actions/cart";

Modal.setAppElement('#root');

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isColorSet: false,
            isSizeSet: false,
            modalIsOpen: false,
            setSize: "",
            setColor: ""
        };
    }

    openModal = (product) => {
        this.setState({
            product: product,
            modalIsOpen: true,
            isColorSet: false,
            isSizeSet: false,
            setSize: "",
            setColor: ""
        });
    };

    closeModal = () => {
        this.setState({
            product: null,
            modalIsOpen: false,
            isColorSet: false,
            isSizeSet: false,
            setSize: "",
            setColor: ""
        });
    };

    addSelectedColor = (color) => {
        let { product } = this.state;
        let temp = { ...product }
        temp.selectedColor = color;
        this.setState({
            product: temp,
            isColorSet: true,
            setColor: color
        })
    };

    addSelectedSize = (size) => {
        let { product } = this.state;
        let temp = { ...product }
        temp.selectedSize = size;
        this.setState({
            product: temp,
            isSizeSet: true,
            setSize: size
        })
    };

    render() {
        const { product } = this.props;
        const { _id, title, availableColours, category, availableSizes, image, price } = product;
        const defaultImg = "/images/common/no-product-image.png";
        const imagePath = `/images/${process.env.REACT_APP_NAME}/${category}/`;

        return (
            <Fade bottom cascade>
                <div className="regular">
                    <a className="product-image"
                        href={"#" + _id}
                        onClick={() => this.openModal(product)}>
                        <img
                            src={imagePath + image || defaultImg} alt={title}></img>
                    </a>
                    <div className="product-info" >
                        <div className="button-container">
                            <p>
                                <button type="button" onClick={() => {
                                    if (availableColours.length > 0) {
                                        product.selectedColor = availableColours[0]
                                    }

                                    if (availableSizes.length > 0) {
                                        product.selectedSize = availableSizes[0]
                                    }

                                    this.props.addToCart(product)
                                }}
                                    title="Add to Cart"
                                    className="button btn-cart show-options">
                                    <span>
                                        <span>
                                            <i className="fa fa-shopping-basket"></i>
                                        </span>
                                    </span>
                                </button>
                            </p>
                        </div>
                        <h2 className="product-name">
                            <a href={"#" + _id}
                                title={title}>{title}</a>
                        </h2>
                        <div className="price-box">
                            <span className="regular-price">
                                <span className="price">{formatCurrency(price)}</span>
                            </span>
                        </div>
                    </div>

                    <div className="hover">
                        <a href={"#" + _id}
                            title={title} className="product-image">
                            <img
                                src={imagePath + image || defaultImg}
                                alt={title} />
                        </a>
                        <h2 className="product-name"><a
                            href={"#" + _id}
                            title={title}>{title}</a></h2>
                        <div className="ratings">
                            <div className="rating-box">
                                <div className="rating" ></div>
                            </div>
                            <p className="rating-links">
                                <a href={"#" + _id}>1 Review(s)</a>
                            </p>
                        </div>
                        <div className="button-container">
                            <p>
                                <button type="button" onClick={() => {
                                    if (availableColours.length > 0) {
                                        product.selectedColor = availableColours[0]
                                    }

                                    if (availableSizes.length > 0) {
                                        product.selectedSize = availableSizes[0]
                                    }

                                    this.props.addToCart(product)
                                }}
                                    title="Add to Cart"
                                    className="button btn-cart show-options">
                                    <span>
                                        <span>
                                            <i className="fa fa-shopping-basket"></i>
                                        </span>
                                    </span>
                                </button>
                            </p>
                        </div>
                        <ul className="add-to-links">
                            <li><a href={"#" + _id}
                                className="link-wishlist" ><span>+</span>Add to Wishlist</a></li>
                            <li><a href={"#" + _id} className="link-compare"><span>+</span>Add to Compare</a></li>
                        </ul>
                    </div>
                </div >
            </Fade>
        );
    }
}

export default connect(
    (state) => ({}),
    {
        addToCart,
    }
)(Product);



