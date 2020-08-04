import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, } from "../constants/cart";
import { alertActions } from "./alert";

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();

    const count = product.count ? product.count : 1

    let alreadyExists = false;
    cartItems.forEach((x) => {
        if (x._id === product._id &&
            x.selectedSize === product.selectedSize &&
            x.selectedColor === product.selectedColor) {
            alreadyExists = true;
            x.count += count;
        }
    });
    if (!alreadyExists) {
        cartItems.push({ ...product, count: count });
    }
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems },
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(alertActions.success('Your product added to cart'));
};

export const removeFromCart = (product) => (dispatch, getState) => {
    const cartItems = getState()
        .cart.cartItems.slice()
        .filter((x) => (x._id !== product._id ||
            x.selectedSize !== product.selectedSize ||
            x.selectedColor !== product.selectedColor));
    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(alertActions.warn('Your product removed from cart'));
};

export const clearCart = (product) => (dispatch) => {
    localStorage.removeItem("cartItems");
    dispatch({ type: CLEAR_CART });
    dispatch(alertActions.warn('Your cart is empty'));
};

export const removeByItemFromCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    cartItems.forEach((x) => {
        if (x._id === product._id &&
            x.selectedSize === product.selectedSize &&
            x.selectedColor === product.selectedColor) {
            x.count--;
        }
    });

    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(alertActions.warn('Your item removed from cart'));
};
