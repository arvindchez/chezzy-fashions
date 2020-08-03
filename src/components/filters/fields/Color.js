import React, { useState } from 'react'
import { connect } from "react-redux";
import { searchProducts } from "../../../actions/product";
import Fade from "react-reveal/Fade";
import { CirclePicker } from 'react-color';
import ClearFilter from '../ClearFilter';
import { criteria } from '../FilterEnum';
var namer = require('color-namer');

const Color = (props) => {

    const [background, setBackground] = useState("")

    const handleChangeComplete = (color) => {
        setBackground(color.hex);
    };

    const clearFilter = () => {
        if (props.filters) {
            const query = {
                ...props.filters,
                color: "",
                page: process.env.REACT_APP_PAGE_START_INDEX,
            }

            setBackground("");
            props.searchProducts(query)
        }
    }

    return (
        <Fade bottom>
            <div>
                <h6 className="mb-1 text-left p-3">
                    Colour
                    <ClearFilter
                        clearFilter={clearFilter}
                        filters={props.filters}
                        condition={criteria.COLOR} />
                </h6>
                <div className="pl-0 mb-3">
                    <CirclePicker className="color-picker"
                        color={background}
                        colors={props.products ? props.products.colors : []}
                        circleSize={22}
                        onChangeComplete={handleChangeComplete}
                        onChange={(color, event) => {
                            props.searchProducts(
                                props.filters ? ({
                                    ...props.filters,
                                    color: namer(color.hex).basic[0].name,
                                    page: process.env.REACT_APP_PAGE_START_INDEX
                                }) : (
                                        {
                                            color: namer(color.hex).basic[0].name,
                                            page: process.env.REACT_APP_PAGE_START_INDEX
                                        }
                                    ));
                        }
                        } />
                </div>
            </div>

        </Fade>
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
)(Color);

