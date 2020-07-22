import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "./Order";
import Loading from "../Loading/Loading";
import ReactPaginate from 'react-paginate';
import { fetchOrders, searchOrders } from "../../actions/order";

class OrderList extends Component {

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage + 1;
        if (this.props.search) {
            this.props.searchOrders(this.props.search, offset, process.env.REACT_APP_PAGE_SIZE);
        } else {
            this.props.fetchOrders(offset, process.env.REACT_APP_PAGE_SIZE);
        }
    };

    render() {

        if (!this.props.orders) {
            return (
                <div> <Loading /></div>
            )
        }

        if (this.props.orders.length === 0) {
            return (
                <div className="empty-search">
                    <h3>No orders yet!</h3>
                </div>
            )
        }

        return (
            <section className="orderslist">

                <div className="orderslist-center">
                    {
                        this.props.orders.map((item, index) => {
                            return <Order key={index} order={item} />
                        })
                    }
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(this.props.totalOrders / process.env.REACT_APP_PAGE_SIZE)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </section>
        )
    }
}

export default connect(
    (state) => ({
        orders: state.orders.filteredItems,
        totalOrders: state.orders.totalOrders,
        search: state.orders.search
    }),
    { fetchOrders, searchOrders }
)(OrderList);