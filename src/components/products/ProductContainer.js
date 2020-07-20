import React, { Component } from 'react'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import { FaFilter } from 'react-icons/fa';
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/product";

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
        this.props.fetchProducts();
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

                <ProductList />
            </>
        )
    }
}

export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
        fetchProducts
    }
)(ProductContainer);