import React, { Component } from 'react'
import ProductList from './ProductList'
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/product";
import { fetchCarousel } from "../../actions/carousel";

class ProductContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            scrolled: false
        };
    }

    componentDidMount() {
        this.props.fetchProducts(
            process.env.REACT_APP_PAGE_START_INDEX,
            process.env.REACT_APP_PAGE_SIZE);
        this.props.fetchCarousel();
    }

    render() {

        return (
            <>
                <div>
                    <ProductList />
                </div>
            </>
        )
    }
}

export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
        fetchProducts, fetchCarousel
    }
)(ProductContainer);