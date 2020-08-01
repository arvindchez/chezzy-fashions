import React from "react";
import { connect } from "react-redux";
import Product from "./Product";
import Loading from "../Loading/Loading";
import ReactPaginate from 'react-paginate';
import { fetchProducts, searchProducts } from "../../actions/product";
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

const ProductList = (props) => {
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage + 1;

        props.searchProducts(
            props.filters ? ({
                ...props.filters,
                page: offset
            }) : (
                    {
                        page: offset
                    }
                ));
    };


    if (!props.products) {
        return (
            <div><Loading /></div>
        )
    }

    if (props.products.data.length === 0 && props.filters.search) {
        return (
            <div className="empty-search">
                <h3>Unfortunately no products matched to your search parameters</h3>
            </div>
        )
    }


    if (props.products.data.length === 0 && !props.filters.search) {
        return (
            <div className="empty-search">
                <h3>No products in the store</h3>
            </div>
        )
    }

    return (
        <section className="productslist">
            <div className="productslist-center">
                {
                    props.products.data.map((item, index) => {
                        return <Product key={index} product={item} />
                    })
                }
            </div>
            <div>
                <ReactPaginate
                    previousLabel={<FaChevronCircleLeft />}
                    nextLabel={<FaChevronCircleRight />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(props.products.count / process.env.REACT_APP_PAGE_SIZE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </section>
    )
}

export default connect(
    (state) => ({
        products: state.products.products,
        filters: state.products.filters
    }),
    { fetchProducts, searchProducts }
)(ProductList);