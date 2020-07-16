import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProductsBySize, sortProducts, filterProductsByColor } from "../actions/product";
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
                        Size{" "}
                        <select
                            value={this.props.size}
                            onChange={(e) =>
                                this.props.filterProductsBySize(this.props.products, e.target.value)
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
                    <div className="filter-color">
                        Colour{" "}
                        <select
                            value={this.props.color}
                            onChange={(e) =>
                                this.props.filterProductsByColor(this.props.products, e.target.value)
                            }>
                            <option value="">ALL</option>
                            <option value="fehér">fehér</option>
                            <option value="ekrü">ekrü</option>
                            <option value="bézs">bézs</option>
                            <option value="szürke">szürke</option>
                            <option value="rose">rose</option>
                            <option value="porrózsaszín">porrózsaszín</option>
                            <option value="menta">menta</option>
                            <option value="Igény-szerint">Igény szerint</option>
                            <option value="Halvány-menta">Halvány menta</option>
                            <option value="közép-menta">közép menta</option>
                            <option value="sötét-menta">sötét menta</option>
                            <option value="smaragd">smaragd</option>
                            <option value="sötétkék">sötétkék</option>
                            <option value="farmerkék">farmerkék</option>
                            <option value="mályva">mályva</option>
                            <option value="pasztellrózsaszín">pasztellrózsaszín</option>
                            <option value="világosszürke">világosszürke</option>
                            <option value="vanília">vanília</option>
                            <option value="rózsaszín">rózsaszín</option>
                            <option value="kék">kék</option>
                            <option value="világoskék">világoskék</option>
                            <option value="türkiz">türkiz</option>
                            <option value="Rose-fehér-szürke">Rose-fehér-szürke</option>
                            <option value="Menta-türkiz-fehér">Menta-türkiz-fehér</option>
                            <option value="fehér-bézs-szürke">fehér-bézs-szürke</option>
                            <option value="Rose-világoskék-fehér">Rose-világoskék-fehér</option>
                            <option value="Menta-fehér-szürke">Menta-fehér-szürke</option>
                            <option value="Menta-rose-fehér">Menta-rose-fehér</option>
                        </select>
                    </div>
                </div>
            );
    }
}
export default connect(
    (state) => ({
        color: state.products.color,
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProductsBySize,
        sortProducts,
        filterProductsByColor
    }
)(Filter);
