import React, { Component } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import Loading from "../Loading/Loading";
import ReactPaginate from 'react-paginate';
import { fetchProducts, searchProducts } from "../../actions/product";

class ProductList extends Component {

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage + 1;
        if (this.props.search) {
            this.props.searchProducts(this.props.search, offset, process.env.REACT_APP_PAGE_SIZE);
        } else {
            this.props.fetchProducts(offset, process.env.REACT_APP_PAGE_SIZE);
        }
    };

    render() {

        if (!this.props.products) {
            return (
                <div> <Loading /></div>
            )
        }

        if (this.props.products.length === 0) {
            return (
                <div className="empty-search">
                    <h3>Unfortunately no products matched to your search parameters</h3>
                </div>
            )
        }

        return (
            <section className="productslist">

                <div className="productslist-center">
                    {
                        this.props.products.map((item, index) => {
                            return <Product key={index} product={item} />
                        })
                    }
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(this.props.totalProducts / process.env.REACT_APP_PAGE_SIZE)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </section>
        )
    }
}

export default connect(
    (state) => ({
        products: state.products.filteredItems,
        totalProducts: state.products.totalProducts,
        search: state.products.search
    }),
    { fetchProducts, searchProducts }
)(ProductList);