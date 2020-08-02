import React from 'react';
import Color from './fields/Color';
import Size from './fields/Size';
import ClearFilter from './ClearFilter';
import { criteria } from "./FilterEnum";
import { connect } from "react-redux";
import { searchProducts } from "../../actions/product";

const FilterCategory = (props) => {

    const clearFilter = () => {
        if (props.filters) {
            const query = {
                ...props.filters,
                sizes: [],
                color: "",
                page: process.env.REACT_APP_PAGE_START_INDEX,
            }

            props.searchProducts(query)
        }
    }

    return (
        <section>
            <div className="side-filter-category-container filter-block">
                <div>
                    <h6 className="mb-1 text-uppercase pt-3">
                        Shop by
                           <ClearFilter
                            clearFilter={clearFilter}
                            filters={props.filters} condition={criteria.ALL} />
                    </h6>
                    <hr className="my-4" />
                </div>
                <div className="color-filter">
                    <Color />
                </div>
                <div className="size-filter">
                    <Size />
                </div>
            </div>
        </section>
    )
}

export default connect(
    (state) => ({
        products: state.products.products,
        filters: state.products.filters
    }),
    {
        searchProducts
    }
)(FilterCategory);

