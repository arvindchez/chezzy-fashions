import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS, FILTER_ORDERS_BY_SEARCH } from "../constants/order";
import { CLEAR_CART } from "../constants/cart";
import { authHeader } from "../helper/auth-header"
import { history } from '../helper/history';
import { alertActions } from '../actions/alert';

export const createOrder = (order) => async (dispatch) => {

  const contentHeader = { "Content-Type": "application/json" };
  const tokenHeader = authHeader()

  await fetch("orders", {
    method: "POST",
    headers: { ...contentHeader, ...tokenHeader },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });

      if (data.paymenttype === "cod") {
        localStorage.removeItem("cartItems");
        dispatch({ type: CLEAR_CART });
        history.push("/myorders");
        dispatch(alertActions.success(`Ordered successfully! Your order number is : ${data._id} `));
        dispatch({ type: CLEAR_ORDER });
      }
    });
};

export const confirmOrder = (order) => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({ type: CLEAR_CART });
  history.push("/myorders");
  dispatch(alertActions.success(`Ordered successfully! Your order number is : ${order._id} `));
  dispatch({ type: CLEAR_ORDER });
}

export const fetchOrders = (page, limit) => async (dispatch) => {
  const url = `orders/me?page=${page}&limit=${limit}`
  await fetch(url, {
    method: "GET",
    headers: authHeader()
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_ORDERS,
        payload: {
          data: data.result,
          totalOrders: data.count
        }
      });
    });
};

export const searchOrders = (search, page, limit) => async (dispatch) => {
  const url = `orders/me?page=${page}&limit=${limit}&query=${search}`
  await fetch(url, {
    method: "GET",
    headers: authHeader()
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FILTER_ORDERS_BY_SEARCH,
        payload: {
          search: search,
          totalOrders: data.count,
          items: data.result
        },
      });
    });
}

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
