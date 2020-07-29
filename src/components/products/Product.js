import React, { Component } from "react";
import { formatCurrency } from "../../helper/utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";


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
            <div >
                <Fade bottom cascade>
                    <article className="products">
                        <div className="img-container">
                            <a
                                href={"#" + _id}
                                onClick={() => this.openModal(product)}
                            >
                                <img src={imagePath + image || defaultImg} alt={title}></img>
                            </a>
                            <div className="price-top">
                                <h6>{formatCurrency(price)}</h6>
                            </div>
                            <p className="product-info">{title.length > 22 ?
                                title.substring(0, 22) + "..." : title}</p>
                            <div>

                                <button className="btn btn-sm" onClick={() => {
                                    if (availableColours.length > 0) {
                                        product.selectedColor = availableColours[0]
                                    }

                                    if (availableSizes.length > 0) {
                                        product.selectedSize = availableSizes[0]
                                    }

                                    this.props.addToCart(product)
                                }}>Add To Cart</button>
                            </div>

                        </div>

                    </article>
                </Fade>
                {product &&
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="btn btn-success btn-sm close-modal" onClick={this.closeModal}>x</button>
                            <div className="product-details">
                                <img src={imagePath + product.image || defaultImg} alt={product.title}></img>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>{product.description}</p>
                                    <p>
                                        <label>Available Sizes:{" "}</label>
                                        {product.availableSizes.map((x, index) => (
                                            <span key={index}>
                                                {" "}
                                                {<button key={index}
                                                    className={this.state.isSizeSet && this.state.setSize === x ? "option-button-selected" : "option-button"}
                                                    onClick={() => { this.addSelectedSize(x); }}
                                                > {x}
                                                </button>
                                                }
                                            </span>
                                        ))}
                                    </p>
                                    <p>
                                        <label>Available Colours:{" "}</label>
                                        {product.availableColours.map((x, index) => (
                                            <span key={index}>
                                                {" "}
                                                {<button key={index}
                                                    className={this.state.isColorSet && this.state.setColor === x ? "option-button-selected" : "option-button"}
                                                    onClick={() => { this.addSelectedColor(x); }}
                                                > {x} </button>
                                                }
                                            </span>
                                        ))}
                                    </p>
                                    <div>
                                        <label>Price: {formatCurrency(product.price)}</label>
                                        <button className="btn btn-success btn-sm"
                                            onClick={() => {

                                                let { product } = this.state;
                                                let temp = { ...product }

                                                if ((!this.state.isColorSet && !this.state.setColor) && product.availableColours.length > 0) {
                                                    temp.selectedColor = product.availableColours[0]

                                                }

                                                if ((!this.state.isSizeSet && !this.state.setSize) && product.availableSizes.length > 0) {
                                                    temp.selectedSize = product.availableSizes[0]
                                                }

                                                this.props.addToCart(temp);
                                                this.closeModal();

                                            }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>

                }
            </div >
        );
    }
}


export default connect(
    (state) => ({}),
    {
        addToCart,
    }
)(Product);



