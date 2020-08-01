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

export const searchProducts = (
    search,
    sort = "latest",
    page = process.env.REACT_APP_PAGE_START_INDEX,
    limit = process.env.REACT_APP_PAGE_SIZE,
    next = false) => async (dispatch) => {
        let url = `products?page=${page}&limit=${limit}&query=${search}&sort=${sort}`;
        if (next === true) {
            url = `products?page=${page}&limit=${limit}&category=${search}&sort=${sort}`;
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const data = await fetch(url, requestOptions).then(handleResponse);


        console.log(search)

        const filters = {
            search: search,
            sort: sort
        }

        dispatch({
            type: FILTER_PRODUCTS_BY_SEARCH,
            payload: {
                filters: filters,
                data: data
            },
        });
    };