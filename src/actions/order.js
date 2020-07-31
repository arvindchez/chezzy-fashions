import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS, FILTER_ORDERS_BY_SEARCH } from "../constants/order";
import { CLEAR_CART } from "../constants/cart";
import { authHeader } from "../helper/auth-header"
import { history } from '../helper/history';
import { alertActions } from '../actions/alert';
import { handleResponse } from "../services/common"

export const createOrder = (order) => async (dispatch) => {

  const contentHeader = { "Content-Type": "application/json" };
  const tokenHeader = authHeader();
  const url = "orders";

  const requestOptions = {
    method: "POST",
    headers: { ...contentHeader, ...tokenHeader },
    body: JSON.stringify(order),
  };

  const data = await fetch(url, requestOptions).then(handleResponse);

  dispatch({ type: CREATE_ORDER, payload: data });
  if (data.paymenttype === "cod") {
    localStorage.removeItem("cartItems");
    dispatch({ type: CLEAR_CART });
    history.push("/myorders");
    dispatch(alertActions.success(`Ordered successfully! Your order number is : ${data._id} `));
    dispatch({ type: CLEAR_ORDER });
  }
}

export const confirmOrder = (order) => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({ type: CLEAR_CART });
  history.push("/myorders");
  dispatch(alertActions.success(`Ordered successfully! Your order number is : ${order._id} `));
  dispatch({ type: CLEAR_ORDER });
}

export const fetchOrders = (page, limit) => async (dispatch) => {
  const url = `orders/me?page=${page}&limit=${limit}`
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const data = await fetch(url, requestOptions).then(handleResponse);
  dispatch({
    type: FETCH_ORDERS,
    payload: {
      data: data.result,
      totalOrders: data.count
    }
  });
}

export const searchOrders = (search, page, limit) => async (dispatch) => {
  const url = `orders/me?page=${page}&limit=${limit}&query=${search}`
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const data = await fetch(url, requestOptions).then(handleResponse);
  dispatch({
    type: FILTER_ORDERS_BY_SEARCH,
    payload: {
      search: search,
      totalOrders: data.count,
      items: data.result
    },
  });
}

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
