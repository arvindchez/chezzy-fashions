import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../Loading/Loading";
import ReactPaginate from 'react-paginate';
import { fetchOrders, searchOrders } from "../../actions/order";
import Fade from "react-reveal/Fade";
import 'react-accessible-accordion/dist/fancy-example.css';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { formatCurrency, convertToAppDate } from "../../helper/utils";
import Title from '../title/Title';

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

    handleSearch = (query) => {
        this.props.searchOrders(
            query,
            process.env.REACT_APP_PAGE_START_INDEX,
            process.env.REACT_APP_PAGE_SIZE);
    };

    render() {

        if (!this.props.orders) {
            return (
                <div> <Loading /></div>
            )
        }

        return (
            <>
                <Title title={"My Orders"} />
                <section className="order-details-container">

                    <Fade left cascade>
                        <div className="search input-icons">
                            <input type="search"
                                autoComplete="false"
                                name="search"
                                placeholder="Search order..."
                                onKeyUp={(e) =>
                                    this.handleSearch(e.target.value)
                                } />
                            <i class="fas fa-search icon" aria-hidden="true"></i>
                        </div>
                        <div>
                            {this.props.orders.length > 0 ? (
                                <div>
                                    <div>
                                        <Accordion className="accordion-container" allowZeroExpanded>
                                            {this.props.orders.map((order) => (
                                                <AccordionItem key={order._id}>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton>
                                                            Your order number <strong>{order._id}{" "}</strong>
                                                        was placed on <strong> {convertToAppDate(order.createdAt)}{" "}</strong>
                                            amounted <strong>{formatCurrency(order.total)}</strong>
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel>
                                                        {order.cartItems.map((item, index) => (
                                                            <div key={index}>
                                                                <div>
                                                                    <img className="order-details-img" src={item.image} alt={item.title}></img>
                                                                </div>
                                                                <strong>{item.count} {" x "} {item.title} {"(Size/Colour -"} {item.selectedSize} {"/"} {item.selectedColor}{")"} </strong>
                                                            </div>
                                                        ))}
                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                    <div>
                                        <ReactPaginate
                                            previousLabel={<FaChevronCircleLeft />}
                                            nextLabel={<FaChevronCircleRight />}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={Math.ceil(this.props.totalOrders / process.env.REACT_APP_PAGE_SIZE)}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"} />
                                    </div>
                                </div>
                            ) : (
                                    this.props.search ? (
                                        <div className="empty-search">
                                            <h3>Unfortunately no order matched to your search parameters</h3>
                                        </div>
                                    ) : (
                                            <div className="empty-search">
                                                <h3>No orders yet!</h3>
                                            </div>
                                        )
                                )
                            }
                        </div>
                    </Fade>
                </section >
            </>
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

