import {
    FETCH_CAROUSEL
} from "../constants/carousel";
import { handleResponse } from "../services/common"

export const fetchCarousel = () => async (dispatch) => {
    const url = 'carousel'
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const data = await fetch(url, requestOptions).then(handleResponse);

    dispatch({
        type: FETCH_CAROUSEL,
        payload: {
            carousel: data
        }
    });
};

