import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProductsBySize, sortProducts, searchProducts, filterProductsByColor } from "../actions/product";
import Loading from './Loading';


const getUnique = (items, value) => {
    let type = [...new Set(items.map(item => item[value]))]
    type = new Set(type.flat(1))
    return ['All', ...type]
}

class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (
            <div> <Loading /></div>
        ) : (
                <div className="filter">
                    <div>
                        <div>Total Products: {this.props.filteredProducts.length} </div>
                    </div>
                    <div>
                        <label htmlFor="sort">Order </label>
                        <select
                            name="sort"
                            value={this.props.sort}
                            onChange={(e) =>
                                this.props.sortProducts(
                                    this.props.filteredProducts,
                                    e.target.value
                                )
                            }>
                            <option value="latest">Latest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="size">Size </label>
                        <select
                            name="size"
                            value={this.props.size ? this.props.size : "All"}
                            onChange={(e) =>
                                this.props.filterProductsBySize(this.props.products, e.target.value)
                            }>{
                                this.props.products ?
                                    (
                                        getUnique(this.props.products, 'availableSizes')
                                            .map((item, index) => {
                                                if (item === "All") {
                                                    return <option value="" key={index}>{item}</option>
                                                } else {
                                                    return <option value={item} key={index}>{item}</option>
                                                }
                                            })

                                    ) : "All"
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="color">Colour </label>
                        <select
                            name="color"
                            value={this.props.color ? this.props.color : "All"}
                            onChange={(e) =>
                                this.props.filterProductsByColor(this.props.products, e.target.value)
                            }>{
                                this.props.products ?
                                    (
                                        getUnique(this.props.products, 'availableColours')
                                            .map((item, index) => {
                                                if (item === "All") {
                                                    return <option value="" key={index}>{item}</option>
                                                } else {
                                                    return <option value={item} key={index}>{item}</option>
                                                }
                                            })

                                    ) : "All"
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="search">Search </label>
                        <input className="filter-input"
                            type="text"
                            autoComplete="false"
                            name="search"
                            placeholder="Search product..."
                            onKeyUp={(e) =>
                                this.props.searchProducts(e.target.value)
                            } />
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
        filterProductsByColor,
        searchProducts
    }
)(Filter);
