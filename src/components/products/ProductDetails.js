import React, { useState, useEffect } from 'react'
import { formatCurrency, inStock } from "../../helper/utils"
import { useLocation } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Loading from '../Loading/Loading';
import ReactImageMagnify from 'react-image-magnify';
import { CirclePicker } from 'react-color';
import { connect } from "react-redux";
import { GiLargeDress, } from "react-icons/gi";
import ReactTooltip from 'react-tooltip';

const ProductDetails = (props) => {

    let location = useLocation();
    const productId = location.state.id;
    const [product, setProduct] = useState(undefined)
    useEffect(() => {
        render();
    }, [props.products]);

    const render = () => {
        if (props.products) {
            const cProduct = props.products.data.find(item => item._id === productId)
            setProduct(cProduct)
        }
    }

    if (!props.products) {
        return (
            <div><Loading /></div>
        )
    }

    if (!product) {
        return (
            <div className="empty-search">
                <h3>Product details not found</h3>
            </div>
        )
    }

    const renderSizes = (sizes) => {
        return (
            <div>
                {
                    sizes.map((item, index) => {
                        return (
                            <i key={index} class="fas"
                                style={{
                                    fontSize: `${index + 1}em`,
                                    margin: `0 auto`
                                }}
                            ><GiLargeDress data-tip={item} />
                                <ReactTooltip className="size-popup" /></i>
                        )
                    })
                }
            </div >
        )
    };

    return (
        <>
            {
                product && (
                    <div className="products-details-container" >
                        <div className="col-main-wrap">
                            <div className="product-category-title">
                                <h2> {product.category}</h2>
                            </div>
                            <div className="product-category-info">
                                <div className="products-info-content">
                                    <div className="image-details">
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                width: 450,
                                                height: 550,
                                                src: `/images/${process.env.REACT_APP_NAME}/${product.category}/${product.image}`
                                            },
                                            largeImage: {
                                                src: `/images/${process.env.REACT_APP_NAME}/${product.category}/${product.image}`,
                                                width: 800,
                                                height: 1100
                                            }
                                        }} />
                                    </div>
                                    <div className="product-information">
                                        <div className="product-shop">
                                            <div className="product-shop-info">
                                                <div className="product-name">
                                                    <h1>{product.title}</h1>
                                                </div>
                                                <div className="ratings">
                                                    {
                                                        product.rating > 0 ? (
                                                            <StarRatingComponent
                                                                name="rating"
                                                                editing={false}
                                                                starCount={parseInt(process.env.REACT_APP_RATING_MAX)}
                                                                value={product.rating}
                                                            />
                                                        ) : (
                                                                <a href="#:0" >Be the first to review this product</a>
                                                            )
                                                    }
                                                    <p class="rating-links">
                                                        <a href="#:0">1 Review(s)</a>
                                                        <span class="separator">|</span>
                                                        <a href="#:0">Add Your Review</a>
                                                    </p>
                                                </div>
                                                <div className="price-box">
                                                    <span className="regular-price" >
                                                        <span className="price">{formatCurrency(product.price)}</span>
                                                    </span>
                                                    <p className={
                                                        `availability ${product.quantity > 0 ? " in-stock" : " out-of-stock"}`}
                                                    > <span>
                                                            {inStock(product.quantity)}</span></p>
                                                    <p className="sku">SKU: <span>{product.sku}</span></p>
                                                </div>
                                                <div className="short-description">
                                                    <p className="std">{product.description}</p>
                                                </div>
                                                <div className="colors-available border-bottom">
                                                    <p className="choices"><span className="required-field">*</span>Colours: <span></span></p>
                                                    <CirclePicker className="color-picker"
                                                        colors={product.availableColours ?
                                                            product.availableColours : []}
                                                        circleSize={22}
                                                    />
                                                </div>
                                                <div className="sizes-available border-bottom">
                                                    <p className="choices">
                                                        <span className="required-field">*</span>Sizes: <span></span>
                                                    </p>
                                                    {renderSizes(product.availableSizes)}
                                                </div>
                                                <p className="required">* Required Fields</p>
                                                <div class="add-to-box-wrap">
                                                    <div class="qty-container">
                                                        <label for="qty">Quantity:</label>
                                                        <div class="qty-wrap">
                                                            <input type="text" name="qty" id="qty" maxlength="12"
                                                                value="1" title="Quantity" class="input-text qty" />
                                                            <div class="qty-elements">
                                                                <a class="increment_qty" href="javascript:void(0)">
                                                                    <i class="fa fa-plus fa-xs"></i>
                                                                </a>
                                                                <a class="decrement_qty" href="javascript:void(0)">
                                                                    <i class="fa fa-minus fa-xs"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="add-to-box">
                                                        <a class="btn" href="#">
                                                            <i className="fa fa-shopping-basket"></i>
                                                            {" "}Add to Cart</a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <ul className="add-to-links">
                                                        <li className="wishlist">
                                                            <button type="button"
                                                                title="Add to Wishlist"
                                                                className="button btn-cart show-options">
                                                                <span className="icon">
                                                                    <i class="fa fa-heart" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                            <a href="#:0" className="link-wishlist" data-id="192">Add to Wishlist</a></li>
                                                        <li className="compare">
                                                            <button type="button"
                                                                title="Add to Compare"
                                                                className="button btn-cart show-options">
                                                                <span className="icon">
                                                                    <i class="fa fa-clone" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                            <a href="#:0" className="link-compare" data-id="192">Add to Compare</a>
                                                        </li>
                                                        <li className="email-friend">
                                                            <button type="button"
                                                                title="Email to a Friend"
                                                                className="button btn-cart show-options">
                                                                <span className="icon">
                                                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                            <a href="#:0">Email to a Friend</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="social-links">
                                                    <a href="https://www.facebook.com">
                                                        <i className="fab fa-facebook"></i></a>
                                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                                    <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                                                    <a href="#"><i className="fab fa-google-plus-g"></i></a>
                                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div>
                )
            }
        </>
    )
}
export default connect(
    (state) => ({
        products: state.products.products
    }),
)(ProductDetails);