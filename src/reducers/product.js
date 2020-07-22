import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_SIZE,
    FILTER_PRODUCTS_BY_SEARCH,
    ORDER_PRODUCTS_BY_PRICE,
    FILTER_PRODUCTS_BY_COLOR,
} from "../constants/product";

export const productsReducer = (state = {}, action) => {
    switch (action.type) {
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            };
        case FILTER_PRODUCTS_BY_SEARCH:
            return {
                ...state,
                search: action.payload.search,
                filteredItems: action.payload.items,
                totalProducts: action.payload.totalProducts
            };
        case FILTER_PRODUCTS_BY_COLOR:
            return {
                ...state,
                color: action.payload.color,
                filteredItems: action.payload.items,
            };
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
            };
        case FETCH_PRODUCTS:
            return {
                items: action.payload.data,
                filteredItems: action.payload.data,
                totalProducts: action.payload.totalProducts
            };
        default:
            return state;
    }
};
