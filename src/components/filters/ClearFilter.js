import React, { useEffect, useState } from 'react';
import { FcClearFilters } from "react-icons/fc";
import { connect } from "react-redux";
import { searchProducts } from "../../actions/product";
import { criteria } from "./FilterEnum";

const ClearFilter = ({ filters, condition, clearFilter }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        applyFilter();
    }, [filters])

    const applyFilter = () => {
        if (filters) {
            switch (condition) {
                case criteria.ALL:
                    setShow((filters && filters.sizes && filters.sizes.length > 0) ||
                        (filters && filters.color && filters.color));
                    break;
                case criteria.TITLE:
                    setShow(filters && filters.title && filters.title !== "");
                    break;
                case criteria.CATEGORY:
                    setShow(filters && filters.category && filters.category !== "");
                    break;
                case criteria.SIZE:
                    setShow(filters && filters.sizes && filters.sizes.length > 0);
                    break;
                case criteria.COLOR:
                    setShow(filters && filters.color && filters.color !== "");
                    break;
                case criteria.PRICE:
                    setShow(filters && filters.price && filters.price !== "");
                    break;
                default:
                    setShow(false);
            }
        }

        return false;
    }

    return (
        <>
            <div>
                {
                    show && <button className="filter-icon"
                        onClick={clearFilter}>
                        <FcClearFilters size={20} /></button>

                }
            </div>
        </>
    )
}

export default connect(
    (state) => ({
        filters: state.products.filters,
        products: state.products.products,
    }),
    {
        searchProducts
    }
)(ClearFilter);


