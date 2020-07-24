import {
    FETCH_CAROUSEL
} from "../constants/carousel";

export const fetchCarousel = () => async (dispatch) => {
    const url = 'carousel'
    const res = await fetch(url)
    const data = await res.json();

    dispatch({
        type: FETCH_CAROUSEL,
        payload: {
            carousel: data
        }
    });
};

