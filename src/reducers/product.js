import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_SEARCH,
    FETCH_FEATURED_PRODUCTS,
    FETCH_PRODUCTS_AUTOCOMPLETE
} from "../constants/product";

export const product = (state = {}, action) => {
    switch (action.type) {
        case FILTER_PRODUCTS_BY_SEARCH:
            return {
                ...state,
                filters: action.payload.filters,
                products: action.payload.data
            };
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload.data
            };
        case FETCH_PRODUCTS_AUTOCOMPLETE:
            return {
                ...state,
                autoSuggestions: action.payload.data,
                suggestionsCount: action.payload.count
            };
        case FETCH_FEATURED_PRODUCTS:
            return {
                ...state,
                featuredProducts: action.payload.data
            };
        default:
            return state;
    }
};
