import React from 'react'
import { connect } from "react-redux";
import { searchProducts } from "../../../actions/product";
import Fade from "react-reveal/Fade";
import { FaCheck } from "react-icons/fa"
import ClearFilter from '../ClearFilter';
import { criteria } from '../FilterEnum';

class Size extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
        }
    }

    handleChecked = (event) => {
        let filters = {};
        let sizes = [];

        if (this.props.filters) {
            filters = { ...this.props.filters };
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
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));

        this.props.searchProducts(query)
    }

    clearFilter = () => {
        if (this.props.filters) {
            const query = {
                ...this.props.filters,
                sizes: [],
                page: process.env.REACT_APP_PAGE_START_INDEX,
            }

            this.setState(prevState => ({ checkedItems: new Map() }));
            this.props.searchProducts(query)
        }
    }

    renderSizes = () => {
        return (
            this.props.products.sizes.map((item, index) => {
                return (
                    <label key={item} htmlFor={item} className="btn text-left">
                        <input key={index} type="checkbox"
                            checked={this.state.checkedItems.get(item) || false}
                            name={item} id={item} className="badgebox"
                            onChange={this.handleChecked}
                        />
                        <span className="badge"><FaCheck /></span>
                        {" "}{item}
                    </label>
                )
            })
        )
    }
    render() {
        return (
            <Fade bottom>
                <div>
                    <h6 className="mb-1 text-left p-3">Size
                    <ClearFilter
                            clearFilter={this.clearFilter}
                            filters={this.props.filters}
                            condition={criteria.SIZE} /></h6>
                    <div className="size-filter-content">
                        {this.props.products && this.props.products.sizes &&
                            (
                                this.renderSizes()
                            )
                        }
                    </div>
                </div>
            </Fade >
        )
    }
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

