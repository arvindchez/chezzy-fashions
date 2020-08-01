import React from 'react'
import VisualFilter from 'react-visual-filter';
import { connect } from "react-redux";
import { FaFilter } from 'react-icons/fa';
import { colorService, sizeService } from '../filters/fields';
import { searchProducts } from "../../actions/product";

const Filter = (props) => {

    const handleChange = (data) => {
        let type = [...new Set(data.map(item => item["field"] + "=" + item["value"]))]
        props.searchProducts(type)
    }


    // const updates = Object.keys(req.body)
    // const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'password']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if (!isValidOperation) {
    //     return res.status(400).send('Error: Invalid update')
    // }



    const FIELDS = [
        props.products && colorService.loadColors(props.products.colors),
        props.products && sizeService.loadSizes(props.products.sizes),
    ];

    return (
        <section>
            <div className="main-filter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <h6>Order</h6>
                            <select name="sort"
                                value={props.filters ? props.filters.sort : ""}
                                onChange={(e) =>
                                    props.searchProducts(
                                        props.filters && props.filters.search ?
                                            props.filters.search : "",
                                        e.target.value)
                                }>
                                {
                                    props.products && (props.products.sort.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    }))
                                }
                            </select>
                        </div>
                        <div className="col-md-10">
                            <VisualFilter className="filter-container"
                                fields={FIELDS}
                                locale="en"
                                addFilterText={<p>Add Filter <FaFilter /></p>}
                                keepAddHandler={true}
                                onChange={handleChange} />
                        </div>
                    </div>
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
)(Filter);

