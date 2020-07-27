import React, { useEffect } from 'react'
import ProductList from './ProductList'
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/product";
import ProductFilter from './ProductFilter';

const ProductContainer = (props) => {
    useEffect(() => {
        props.fetchProducts(
            process.env.REACT_APP_PAGE_START_INDEX,
            process.env.REACT_APP_PAGE_SIZE);
    }, [])

    return (
        <>
            <div>
                {props.search && (
                    <ProductFilter />
                )}
            </div>
            <div>
                <ProductList />
            </div>
        </>
    )
}
export default connect(
    (state) => ({
        products: state.products.filteredItems,
        search: state.products.search
    }),
    {
        fetchProducts
    }
)(ProductContainer);