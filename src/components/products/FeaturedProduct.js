import React, { Component } from "react";
import { formatCurrency } from "../../helper/utils";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";

class FeaturedProduct extends Component {
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

    render() {
        const { product } = this.props;
        const { _id, title, availableColours, category, availableSizes, rating, image, price } = product;
        const defaultImg = "/images/common/no-product-image.png";
        const imagePath = `/images/${process.env.REACT_APP_NAME}/${category}/`;

        return (
            <Fade bottom cascade>
                <div className="featured">
                    <Link className="product-image"
                        to={{
                            pathname: `/details/${_id}`,
                            state: { id: _id }
                        }} >
                        <img
                            src={imagePath + image || defaultImg} alt={title}></img>
                    </Link>
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
                        <div>
                            <StarRatingComponent
                                name="rating"
                                editing={false}
                                starCount={parseInt(process.env.REACT_APP_RATING_MAX)}
                                value={rating}
                            />
                        </div>
                        <div className="price-box">
                            <span className="regular-price">
                                <span className="price">{formatCurrency(price)}</span>
                            </span>
                        </div>
                    </div>
                </div >
            </Fade >
        );
    }
}


export default connect(
    (state) => ({}),
    {
        addToCart,
    }
)(FeaturedProduct);



