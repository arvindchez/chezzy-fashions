import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_COLOR,
    FILTER_PRODUCTS_BY_SEARCH,
    FILTER_PRODUCTS_BY_SIZE,
    ORDER_PRODUCTS_BY_PRICE
} from "../constants/product";

export const fetchProducts = (page, limit) => async (dispatch) => {
    const url = `products?page=${page}&limit=${limit}`
    const res = await fetch(url)
    const data = await res.json();

    dispatch({
        type: FETCH_PRODUCTS,
        payload: {
            data: data.result,
            totalProducts: data.count
        }
    });
};

export const searchProducts = (search, page, limit, next) => async (dispatch) => {
    let url = `products?page=${page}&limit=${limit}&query=${search}`
    if (next === true) {
        url = `products?page=${page}&limit=${limit}&category=${search}`
    }

    const res = await fetch(url);
    const data = await res.json();
    dispatch({
        type: FILTER_PRODUCTS_BY_SEARCH,
        payload: {
            search: search,
            totalProducts: data.count,
            items: data.result
        },
    });
};

export const filterProductsBySize = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === ""
                    ? products
                    : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
        },
    });
};

export const filterProductsByColor = (products, color) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_COLOR,
        payload: {
            color: color,
            items:
                color === ""
                    ? products
                    : products.filter((x) => x.availableColours.indexOf(color) >= 0),
        },
    });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if (sort === "latest") {
        sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
    } else {
        sortedProducts.sort((a, b) =>
            sort === "lowest"
                ? a.price > b.price
                    ? 1
                    : -1
                : a.price > b.price
                    ? -1
                    : 1
        );
    }

    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts,
        },
    });
};
