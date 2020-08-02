import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { searchProducts } from "../../../actions/product";
import Fade from "react-reveal/Fade";
import { FaCheck } from "react-icons/fa"
import ClearFilter from '../ClearFilter';
import { criteria } from '../FilterEnum';

const Size = (props) => {
    const [checkedItems, setCheckedItems] = useState(new Map());

    useEffect(() => {
        if (props.filters && props.filters.sizes && props.filters.sizes.length === 0) {
            setCheckedItems(new Map());
        }
    }, [props.filters])

    const handleChecked = (event) => {
        let filters = {};
        let sizes = [];

        if (props.filters) {
            filters = { ...props.filters };
            sizes = filters.sizes && [...filters.sizes];
        }

        let query = {};
        if (event.target.checked === false) {
            const index = sizes && sizes.indexOf(event.target.name);
            if (index > -1) {
                sizes.splice(index, 1);
            }

        } else {
            sizes = sizes && sizes.length > 0 ?
                [...sizes, event.target.name] : [event.target.name];
        }

        query = {
            ...filters,
            sizes: [...new Set(sizes)],
            page: process.env.REACT_APP_PAGE_START_INDEX,
        }

        const item = event.target.name;
        const isChecked = event.target.checked;

        let list;
        if (!checkedItems) {
            list = new Map()
        } else {
            list = checkedItems
        }

        setCheckedItems(list.set(item, isChecked));

        props.searchProducts(query)
    }

    const clearFilter = () => {
        if (props.filters) {
            const query = {
                ...props.filters,
                sizes: [],
                page: process.env.REACT_APP_PAGE_START_INDEX,
            }

            setCheckedItems(new Map());
            props.searchProducts(query)
        }
    }

    const renderSizes = () => {
        return (
            props.products.sizes.map((item, index) => {
                return (
                    <label key={item} htmlFor={item} className="btn text-left">
                        <input key={index} type="checkbox"
                            checked={checkedItems.get(item) || false}
                            name={item} id={item} className="badgebox"
                            onChange={handleChecked}
                        />
                        <span className="badge"><FaCheck /></span>
                        {" "}{item}
                    </label>
                )
            })
        )
    }

    return (
        <Fade bottom>
            <div>
                <h6 className="mb-1 text-left p-3">Size
                    <ClearFilter
                        clearFilter={clearFilter}
                        filters={props.filters}
                        condition={criteria.SIZE} /></h6>
                <div className="size-filter-content">
                    {props.products && props.products.sizes &&
                        (
                            renderSizes()
                        )
                    }
                </div>
            </div>
        </Fade >
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
)(Size);

