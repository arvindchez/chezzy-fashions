import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_AUTOCOMPLETE,
    FILTER_PRODUCTS_BY_SEARCH,
    FETCH_FEATURED_PRODUCTS
} from "../constants/product";
import { handleResponse } from "../services/common"

export const fetchProductsAutoComplete = (page, limit, query) => async (dispatch) => {
    if (query) {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        let url = `products?page=${page}&limit=${limit}&query=${query}`
        const data = await fetch(url, requestOptions).then(handleResponse);

        dispatch({
            type: FETCH_PRODUCTS_AUTOCOMPLETE,
            payload: {
                data: data.data,
                count: data.count
            }
        });
    } else {
        dispatch({
            type: FETCH_PRODUCTS_AUTOCOMPLETE,
            payload: {
                data: [],
                count: 0
            }
        });
    }
};

export const fetchProducts = (page, limit) => async (dispatch) => {
    const url = `products?page=${page}&limit=${limit}`
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const data = await fetch(url, requestOptions).then(handleResponse);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: {
            data: data
        }
    });
};

export const fetchFeaturedProducts = () => async (dispatch) => {
    const url = "fproducts"
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const data = await fetch(url, requestOptions).then(handleResponse);

    dispatch({
        type: FETCH_FEATURED_PRODUCTS,
        payload: {
            data: data
        }
    });
};

export const searchProducts = (search) => async (dispatch) => {
    const { price, title, category, color, sizes, sort, page, limit } = search;

    let query = "";
    price && (query += `price=${price}&`);
    title && (query += `title=${title}&`);
    category && (query += `category=${category}&`);
    color && (query += `color=${color}&`);

    if (sizes) {
        query += `size=${sizes.join(",")}&`;
    }

    query += `sort=${sort || "latest"}&`;
    query += `page=${page || process.env.REACT_APP_PAGE_START_INDEX}&`;
    query += `limit=${limit || process.env.REACT_APP_PAGE_SIZE}`;

    let url = `products?${query}`;

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const data = await fetch(url, requestOptions).then(handleResponse);
    dispatch({
        type: FILTER_PRODUCTS_BY_SEARCH,
        payload: {
            filters: search,
            data: data
        },
    });
};