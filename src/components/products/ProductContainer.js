/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import { connect } from "react-redux";
import { fetchProducts, searchProducts } from "../../actions/product";
import ProductFilter from './ProductFilter';
import { useLocation } from 'react-router-dom'
import { convertToObject } from "../../helper/utils"

const ProductContainer = (props) => {

    let location = useLocation();
    const searchCategory = convertToObject(location.search);
    useEffect(() => {
        if (searchCategory.cat) {
            props.searchProducts(
                searchCategory.cat,
                process.env.REACT_APP_PAGE_START_INDEX,
                process.env.REACT_APP_PAGE_SIZE,
                true);
        } else {
            props.fetchProducts(
                process.env.REACT_APP_PAGE_START_INDEX,
                process.env.REACT_APP_PAGE_SIZE);
        }
    }, [])

    return (
        <>
            <div>
                {props.search && props.products.length > 0 && (
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
        fetchProducts, searchProducts
    }
)(ProductContainer);