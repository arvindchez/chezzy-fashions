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
            <div>
                <h6 className="mb-1 text-left p-3">Colour</h6>
                <div className="form-check pl-0 mb-3">
                    <CirclePicker
                        color={background}
                        colors={props.products ? props.products.colors : []}
                        circleSize={22} p
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

