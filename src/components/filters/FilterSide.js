import React from 'react';
import Price from './fields/Price';
import Color from './fields/Color';

const FilterSide = () => {

    return (
        <section>
            <div className="side-filter-container">
                <div className="price-filter">
                    <Price />
                </div>
                <div className="color-filter">
                    <Color />
                </div>
            </div>
        </section>
    )
}

export default FilterSide

