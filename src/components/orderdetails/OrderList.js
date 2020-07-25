import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "./Order";
import Loading from "../Loading/Loading";
import ReactPaginate from 'react-paginate';
import { fetchOrders, searchOrders } from "../../actions/order";
import { formatCurrency, convertToAppDate } from "../../helper/utils";
import Fade from "react-reveal/Fade";
import ReactTable from "react-table"

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

        const columns = [
            {
                Header: "Order Number",
                accessor: "_id"
            },
            {
                Header: "Date",
                accessor: "createdAt"
            },
            {
                Header: "Total",
                accessor: "total"
            },
            {
                Header: "Items",
                accessor: "cartItems"
            }]

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

            <section className="order-details-container">

                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {this.props.orders && this.props.orders.map((order, index) => (
                                <li key={index}>
                                    <div><strong></strong> {order._id}</div>
                                    <div><strong></strong> {formatCurrency(order.total)}</div>
                                    <div><strong></strong> {convertToAppDate(order.createdAt)}</div>
                                    <div><strong></strong>
                                        {order.cartItems.map((item, index) => (
                                            <div key={index}>
                                                {item.count} {" x "} {item.title} {"(Size/Colour -"} {item.selectedSize} {"/"} {item.selectedColor}{")"}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
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
            </section >
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