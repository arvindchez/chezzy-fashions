import React from 'react';
import Price from './fields/Price';
import FilterCategory from './FilterCategory';

const FilterSide = () => {

    return (
        <section>
            <div className="side-filter-container">
                <div className="price-filter filter-block">
                    <Price />
                </div>
                <div className="category-filter">
                    <FilterCategory />
                </div>
            </div>
        </section>
    )
}

export default FilterSide

