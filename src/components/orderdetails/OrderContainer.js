import React, { Component } from 'react'
import OrderList from './OrderList'
import { fetchOrders } from "../../actions/order";
import { connect } from "react-redux";

class OrderContainer extends Component {

    componentDidMount() {
        this.props.fetchOrders(
            process.env.REACT_APP_PAGE_START_INDEX,
            process.env.REACT_APP_PAGE_SIZE);
    }

    render() {
        return (
            <>
                <OrderList />
            </>
        )
    }
}

export default connect(
    (state) => ({}),
    { fetchOrders }
)(OrderContainer);