import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/product";
import Loading from './Loading';

class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (
            <div> <Loading /></div>
        ) : (
                <div className="filter">
                    <div className="filter-result">
                        {this.props.filteredProducts.length} Products
                    </div>
                    <div className="filter-sort">
                        Order{" "}
                        <select
                            value={this.props.sort}
                            onChange={(e) =>
                                this.props.sortProducts(
                                    this.props.filteredProducts,
                                    e.target.value
                                )
                            }
                        >
                            <option value="latest">Latest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                        </select>
                    </div>
                    <div className="filter-size">
                        Filter{" "}
                        <select
                            value={this.props.size}
                            onChange={(e) =>
                                this.props.filterProducts(this.props.products, e.target.value)
                            }
                        >
                            <option value="">ALL</option>
                            <option value="Egyméret">Egyméret</option>
                            <option value="10x10cm">10x10 cm</option>
                            <option value="15x15cm">15x15 cm</option>
                            <option value="100x115cm(+-5cm)">100x115 cm (+- 5cm)</option>
                            <option value="10-13cm">10-13 cm</option>
                            <option value="13-16cm">13-16 cm</option>
                            <option value="Kicsi(65x40cmb-első)">Kicsi (65x40 cm belső)</option>
                            <option value="Nagy(90x45cm-belső)">Nagy (90x45 cm belső)</option>
                        </select>
                    </div>
                </div>
            );
    }
}
export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter);
