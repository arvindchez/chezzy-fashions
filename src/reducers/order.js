import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS } from "../constants/order";

export const order = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case CLEAR_ORDER:
      return {
        ...state,
        order: null
      };
    case FETCH_ORDERS:
      return {
        ...state,
        items: action.payload.data,
        filteredItems: action.payload.data,
        totalOrders: action.payload.totalOrders
      };
    default:
      return state;
  }
};

