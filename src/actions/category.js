import {
    FETCH_CATEGORY
} from "../constants/category";
import { handleResponse } from "../services/common"

export const fetchCategory = () => async (dispatch) => {
    const url = 'category'
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const data = await fetch(url, requestOptions).then(handleResponse);

    dispatch({
        type: FETCH_CATEGORY,
        payload: {
            catergories: data
        }
    });
};

