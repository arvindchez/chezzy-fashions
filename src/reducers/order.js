import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS, SHOW_ORDER } from "../constants/order";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        showOrder: false,
        order: action.payload
      };
    case CLEAR_ORDER:
      return {
        ...state,
        showOrder: false,
        order: null
      };
    case SHOW_ORDER:
      return {
        ...state,
        showOrder: action.payload.showOrder
      };
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
};
export { orderReducer };
