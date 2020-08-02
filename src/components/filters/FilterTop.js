import React from 'react';
import { connect } from "react-redux";
import { searchProducts } from "../../actions/product";

const FilterTop = (props) => {
    return (
        <section>
            <section className="mb-3">
                <div className="row d-flex align-items-left">
                    <div className="col-12 col-md-5">
                        <div className="d-flex flex-wrap">
                            <div className="select-outline position-relative w-100">
                                <label className="mb-1">
                                    <h6 className="mb-1 text-uppercase">Sort by</h6></label>{" "}
                                <select className="mdb-select text-capitalize border border-info"
                                    value={
                                        props.filters && props.filters.sort ?
                                            props.filters.sort.toLowerCase() : process.env.REACT_APP_DEFAULT_SORT
                                    }
                                    onChange={(e) =>
                                        props.searchProducts(
                                            props.filters ? ({
                                                ...props.filters,
                                                sort: e.target.value,
                                                page: process.env.REACT_APP_PAGE_START_INDEX
                                            }) : (
                                                    {
                                                        sort: e.target.value,
                                                        page: process.env.REACT_APP_PAGE_START_INDEX
                                                    }
                                                ))
                                    }
                                >
                                    {
                                        props.products && (props.products.sort.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        }))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section >
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

