import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS, FILTER_ORDERS_BY_SEARCH } from "../constants/order";
import { CLEAR_CART } from "../constants/cart";
import { authHeader } from "../helper/auth-header"
import { history } from '../helper/history';
import { alertActions } from '../actions/alert';

export const createOrder = (order) => (dispatch) => {

  const contentHeader = { "Content-Type": "application/json" };
  const tokenHeader = authHeader()

  fetch("orders", {
    method: "POST",
    headers: { ...contentHeader, ...tokenHeader },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
    });
};

export const fetchOrders = () => (dispatch) => {
  fetch("orders/me", {
    method: "GET",
    headers: authHeader()
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_ORDERS, payload: {
          data: data.result,
          totalOrders: data.count
        }
      });
    });
};

export const confirmOrder = () => async (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({ type: CLEAR_CART });
  history.push("/myorders");
  dispatch(alertActions.success("Ordered successfully...!"));
}

export const searchOrders = (search, page, limit) => async (dispatch) => {
  const url = `orders?page=${page}&limit=${limit}&query=${search}`
  const res = await fetch(url);
  const data = await res.json();

  dispatch({
    type: FILTER_ORDERS_BY_SEARCH,
    payload: {
      search: search,
      totalOrders: data.count,
      items: data.result
    },
  });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
