import React, { useState } from 'react'
import { connect } from "react-redux";
import { searchProducts } from "../../../actions/product";
import Fade from "react-reveal/Fade";

const Price = (props) => {

    const [price, setPrice] = useState(0);

    return (

        <Fade bottom>
            <div className="card">
                <div className="filter-header">
                    <br></br>
                    <h6 className="mb-1">Price</h6>
                    <hr className="my-4" />
                    <p className="mb-1">{process.env.REACT_APP_PAYMENT_CURRENCY}{` ${price}`}</p>
                    <div className="form-check pl-0 mb-3">
                        <input type="range" className="price-selector"
                            name="price"
                            min={props.products ? props.products.minPrice : 0}
                            max={props.products ?
                                props.products.maxPrice > process.env.REACT_APP_DEFAULT_MAX_PRICE ?
                                    props.products.maxPrice : process.env.REACT_APP_DEFAULT_MAX_PRICE
                                : process.env.REACT_APP_DEFAULT_MAX_PRICE}
                            id="price"
                            value={price}
                            onChange={(e) => {
                                props.searchProducts(
                                    props.filters ? ({
                                        ...props.filters,
                                        price: e.target.value,
                                        page: process.env.REACT_APP_PAGE_START_INDEX
                                    }) : (
                                            {
                                                price: e.target.value,
                                                page: process.env.REACT_APP_PAGE_START_INDEX
                                            }
                                        ));
                                setPrice(e.target.value);
                            }
                            }
                        />
                    </div>
                </div>
            </div>

        </Fade>
    )
}

export default connect(
    (state) => ({
        products: state.products.products,
        filters: state.products.filters
    }),
    {
        searchProducts
    }
)(Price);

