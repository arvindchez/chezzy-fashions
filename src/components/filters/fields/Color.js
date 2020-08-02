import React, { useState } from 'react'
import { connect } from "react-redux";
import { searchProducts } from "../../../actions/product";
import Fade from "react-reveal/Fade";
import { CirclePicker } from 'react-color';
var namer = require('color-namer');

const Color = (props) => {

    const [background, setBackground] = useState("")

    const handleChangeComplete = (color) => {
        setBackground(color.hex);
    };

    return (
        <Fade bottom>
            <div className="card">
                <div className="filter-header">
                    <br></br>
                    <h6 className="mb-1">Colour</h6>
                    <hr className="my-4" />
                    <div className="form-check pl-0 mb-3">
                        <CirclePicker
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
                            } />;
                    </div>
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

