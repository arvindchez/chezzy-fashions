import React from 'react';
import { connect, useSelector } from "react-redux";
import { searchProducts } from "../../actions/product";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const FilterTop = (props) => {

    const itemsCount = useSelector(state =>
        state.products &&
        state.products.products &&
        state.products.products.count);

    const onChangeSelected = (option) => {
        props.searchProducts(
            props.filters ? ({
                ...props.filters,
                sort: option.label,
                page: process.env.REACT_APP_PAGE_START_INDEX
            }) : (
                    {
                        sort: option.label,
                        page: process.env.REACT_APP_PAGE_START_INDEX
                    }
                ))
    }

    const arrowClosed = (
        <span className="arrow-closed" />
    )
    const arrowOpen = (
        <span className="arrow-open" />
    )

    return (
        <section>
            <div className="filter-top-container">
                <div className="sortby-filter align-items-left">
                    <label className="mb-1 text-uppercase">
                        Sort by</label>{" "}
                    <Dropdown options={props.products ? props.products.sort : []}
                        value={props.filters && props.filters.sort ?
                            props.filters.sort.toLowerCase() : process.env.REACT_APP_DEFAULT_SORT
                        }

                        placeholder="Select an option"
                        className="text-capitalize filter-block"
                        onChange={onChangeSelected}
                        arrowClosed={arrowClosed}
                        arrowOpen={arrowOpen}
                    />
                </div>
                <div className="item-count align-text-bottom">
                    <span
                        className="badge badge-pill justify-content-center align-text-bottom badge-info text-capitalize ">
                        {itemsCount && itemsCount > 1 ?
                            " items" : " item"}  {itemsCount ? itemsCount : "0"}</span>
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
)(FilterTop);

