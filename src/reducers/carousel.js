import {
    FETCH_CAROUSEL
} from "../constants/carousel";

export const carousel = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CAROUSEL:
            return {
                carousel: action.payload.carousel,
            };
        default:
            return state;
    }
};
