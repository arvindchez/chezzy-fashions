/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ProductList from './ProductList'
import { connect } from "react-redux";
import { fetchProducts, searchProducts } from "../../actions/product";
import { useLocation } from 'react-router-dom'
import { convertToObject } from "../../helper/utils"

const ProductContainer = (props) => {

    let location = useLocation();

    useEffect(() => {
        if (location.search === "") {
            props.fetchProducts(
                process.env.REACT_APP_PAGE_START_INDEX,
                process.env.REACT_APP_PAGE_SIZE);
        } else {
            const searchCategory = convertToObject(location.search);
            props.searchProducts(
                searchCategory.cat ? searchCategory.cat : searchCategory.title,
                process.env.REACT_APP_DEFAULT_SORT,
                process.env.REACT_APP_PAGE_START_INDEX,
                process.env.REACT_APP_PAGE_SIZE,
                searchCategory.cat ? true : false);
        }
    }, [location.search])

    return (
        <section>
            <ProductList />
        </section>
    )
}
export default connect(
    (state) => ({}),
    {
        fetchProducts, searchProducts
    }
)(ProductContainer);