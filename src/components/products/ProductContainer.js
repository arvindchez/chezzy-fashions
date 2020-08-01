/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ProductList from './ProductList'
import { connect } from "react-redux";
import { fetchProducts, searchProducts } from "../../actions/product";
import { useLocation } from 'react-router-dom'
import { convertToObject } from "../../helper/utils"
import FilterTop from '../filters/FilterTop';
import FilterSide from '../filters/FilterSide';

const ProductContainer = (props) => {

    let location = useLocation();

    useEffect(() => {
        const searchCategory = convertToObject(location.search);

        let query = {
            ...props.filters,
            page: process.env.REACT_APP_PAGE_START_INDEX
        }

        query = searchCategory.cat ? (props.filters ? ({
            query,
            category: searchCategory.cat,
        }) : (
                {
                    category: searchCategory.cat
                }
            )) : (props.filters ? ({
                query,
                title: searchCategory.title ? searchCategory.title : ""
            }) : (
                    {
                        title: searchCategory.title ? searchCategory.title : ""
                    }
                ));

        props.searchProducts(query);

    }, [location.search])

    return (

        <div className="products-container">
            <div className="product-filter">
                <FilterSide />
            </div>
            <div className="product-result">
                <div className="product-result-filter">
                    <FilterTop />
                </div>
                <div>
                    <ProductList />
                </div>
            </div>
        </div>
    )
}
export default connect(
    (state) => ({}),
    {
        fetchProducts, searchProducts
    }
)(ProductContainer);