import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, } from "../constants/cart";

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach((x) => {
        if (x._id === product._id &&
            x.selectedSize === product.selectedSize &&
            x.selectedColor === product.selectedColor) {
            alreadyExists = true;
            x.count++;
        }
    });
    if (!alreadyExists) {
        cartItems.push({ ...product, count: 1 });
    }
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems },
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
    const cartItems = getState()
        .cart.cartItems.slice()
        .filter((x) => (x._id !== product._id ||
            x.selectedSize !== product.selectedSize ||
            x.selectedColor !== product.selectedColor));
    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const clearCart = (product) => (dispatch) => {
    localStorage.removeItem("cartItems");
    dispatch({ type: CLEAR_CART });
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
};
