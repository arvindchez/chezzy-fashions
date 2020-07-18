import React, { Component } from "react";
import { formatCurrency } from "../helper/utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/product";
import { addToCart } from "../actions/cart";
import Loading from './Loading'

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isColorSet: false,
            isSizeSet: false,
            setSize: "",
            setColor: ""
        };
    }
    componentDidMount() {
        this.props.fetchProducts();
    }

    openModal = (product) => {
        this.setState({ product });
    };

    closeModal = () => {
        this.setState({
            product: null,
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
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.products ? (
                        <div> <Loading /></div>
                    ) : (
                            <ul className="products">
                                {this.props.products.map((product) => (
                                    <li key={product._id}>
                                        <article className="product">
                                            <div className="img-container">
                                                <a href={"#" + product._id} onClick={() => this.openModal(product)} >
                                                    <img src={product.image} alt={product.title}></img>
                                                    <p>{product.title.length > 19 ? product.title.substring(0, 19) + "..." : product.title}</p>
                                                </a>
                                                <div className="price-top">
                                                    <h6>{formatCurrency(product.price)}</h6>
                                                </div>
                                                <div className="addtocart-bottom">
                                                    <button
                                                        onClick={() => {
                                                            if (product.availableColours.length > 0) {
                                                                product.selectedColor = product.availableColours[0]
                                                            }

                                                            if (product.availableSizes.length > 0) {
                                                                product.selectedSize = product.availableSizes[0]
                                                            }

                                                            this.props.addToCart(product)
                                                        }}
                                                        className="button primary">
                                                        Add To Cart
                                                </button>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        )}
                </Fade>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>{product.description}</p>
                                        <p>
                                            <label> Available Sizes:{" "}</label>
                                            {product.availableSizes.map((x) => (
                                                <span>
                                                    {" "}
                                                    {this.state.isSizeSet && this.state.setSize === x ?
                                                        < button
                                                            onClick={() => { this.addSelectedSize(x); }}
                                                            className="button selected"> {x}
                                                        </button> :
                                                        < button
                                                            onClick={() => { this.addSelectedSize(x); }}
                                                            className="button"> {x}
                                                        </button>
                                                    }
                                                </span>
                                            ))}
                                        </p>
                                        <p>
                                            <label> Available Colours:{" "}</label>
                                            {product.availableColours.map((x) => (
                                                <span>
                                                    {" "}
                                                    {this.state.isColorSet && this.state.setColor === x ?
                                                        < button
                                                            onClick={() => { this.addSelectedColor(x); }}
                                                            className="button selected"> {x}
                                                        </button> :
                                                        < button
                                                            onClick={() => { this.addSelectedColor(x); }}
                                                            className="button"> {x}
                                                        </button>
                                                    }
                                                </span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <label>Price: {formatCurrency(product.price)}</label>
                                            <button
                                                className="button primary"
                                                onClick={() => {

                                                    if (!this.state.isColorSet && product.availableColours.length > 0) {
                                                        product.selectedColor = product.availableColours[0]
                                                    }

                                                    if (!this.state.isSizeSet && product.availableSizes.length > 0) {
                                                        product.selectedSize = product.availableSizes[0]
                                                    }

                                                    this.props.addToCart(product);
                                                    this.closeModal();
                                                }}>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div >
        );
    }
}
export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
        fetchProducts,
        addToCart,
    }
)(Products);
