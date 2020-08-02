import React from 'react';
import Color from './fields/Color';
import Size from './fields/Size';

const FilterCategory = () => {

    return (
        <section>
            <div className="side-filter-category-container filter-block">
                <div>
                    <h6 className="mb-1 text-uppercase pt-3">Shop by</h6>
                    <hr className="my-4" />
                </div>
                <div className="color-filter">
                    <Color />
                </div>
                <div className="size-filter">
                    <Size />
                </div>
            </div>
        </section>
    )
}

export default FilterCategory

