import React, { Component } from 'react'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import { FaFilter } from 'react-icons/fa';
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/product";
import { fetchCarousel } from "../../actions/carousel";

class ProductContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            scrolled: false
        };

        this.hideComponent = this.hideComponent.bind(this);
    }

    componentDidMount() {
        this.props.fetchProducts(
            process.env.REACT_APP_PAGE_START_INDEX,
            process.env.REACT_APP_PAGE_SIZE);
        this.props.fetchCarousel();
    }

    hideComponent() {
        this.setState({ showFilter: !this.state.showFilter });
    }

    render() {
        const { showFilter } = this.state;

        return (
            <>
                {showFilter && <ProductFilter />}
                <Fade top cascade>
                    <div id="scrollFilter" className="filter-container" onClick={() => {
                        this.hideComponent()
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;

                    }}>
                        <FaFilter onClick={() => {
                            this.hideComponent()
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }} />
                    </div>
                </Fade>
                <div>
                    <ProductList />
                </div>
            </>
        )
    }
}

export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
        fetchProducts, fetchCarousel
    }
)(ProductContainer);