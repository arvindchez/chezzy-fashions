import { alertConstants } from '../constants/alert';

export const alertActions = {
    success,
    error,
    warn,
    info,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function warn(message) {
    return { type: alertConstants.WARNING, message };
}

function info(message) {
    return { type: alertConstants.INFO, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

export const clearAlert = () => (dispatch) => {
    dispatch(clear());
};
