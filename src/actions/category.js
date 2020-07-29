import {
    FETCH_CATEGORY
} from "../constants/category";

export const fetchCategory = () => async (dispatch) => {
    const url = 'category'
    const res = await fetch(url)
    const data = await res.json();
    dispatch({
        type: FETCH_CATEGORY,
        payload: {
            catergories: data
        }
    });
};

