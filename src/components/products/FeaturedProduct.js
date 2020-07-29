/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Title from '../title/SectionTitle';
import Loading from '../Loading/Loading';
import Product from './Product';
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/product";

const FeaturedProduct = (props) => {

    useEffect(() => {
        props.fetchProducts(
            process.env.REACT_APP_PAGE_START_INDEX,
            process.env.REACT_APP_PAGE_SIZE);
    }, [])

    if (!props.products) {
        return (
            <div><Loading /></div>
        )
    }

    let products = props.products.filter(product => product.featured === true);

    if (products) {
        products = products.map(product => {
            return <Product key={product._id} product={product} />
        })
    }

    return (
        <section className="featured-products">
            <Title title="Featured Products"> </Title>
            <div className="featured-products-center">
                {products && products.length > 0 ? (products) : (
                    <div className="empty-search">
                        <h5>Featured products coming soon...</h5>
                    </div>
                )}
            </div>
        </section>
    );
}

export default connect(
    (state) => ({
        products: state.products.filteredItems
    }),
    { fetchProducts }
)(FeaturedProduct);
