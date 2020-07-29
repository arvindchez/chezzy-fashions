import {
    FETCH_CATEGORY
} from "../constants/category";

export const category = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CATEGORY:
            return {
                catergories: action.payload.catergories,
            };
        default:
            return state;
    }
};
