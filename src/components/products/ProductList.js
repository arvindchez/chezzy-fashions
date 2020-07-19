import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/product";
import Product from "./Product";
import Loading from "../Loading";
import { addToCart } from "../../actions/cart";

class ProductList extends Component {

    addToCart = (product) => {
        addToCart()
    }

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
            </section>
        )
    }
}

export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
        fetchProducts,
        addToCart,
    }
)(ProductList);