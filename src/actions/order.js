import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS, SHOW_ORDER } from "../constants/order";
import { CLEAR_CART } from "../constants/cart";
import { authHeader } from "../helper/auth-header"

export const createOrder = (order) => (dispatch) => {

  const contentHeader = { "Content-Type": "application/json" };
  const tokenHeader = authHeader()

  fetch("/orders", {
    method: "POST",
    headers: { ...contentHeader, ...tokenHeader },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
      localStorage.removeItem("cartItems");
      dispatch({ type: CLEAR_CART });
    });
};

export const fetchOrders = () => (dispatch) => {
  fetch("/orders/me", {
    method: "GET",
    headers: authHeader()
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: FETCH_ORDERS, payload: data });
    });
};

export const showCheckout = (show) => (dispatch) => {
  dispatch({
    type: SHOW_ORDER, payload: {
      showOrder: show
    }
  });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
