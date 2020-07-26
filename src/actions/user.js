import { userConstants } from '../constants/user';
import { userService } from '../services/user';
import { alertActions } from '../actions/alert';
import { history } from '../helper/history';

export const userActions = {
    login,
    logout,
    update,
    register,
    delete: _delete
};

function login(email, password, previous) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    let path = "/";
                    if (previous) {
                        path = previous;
                    }

                    history.push(path);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        userService.logout()
            .then(
                user => {
                    dispatch(success(user));
                    history.push("/");
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(user) { return { type: userConstants.LOGOUT, user } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/me');
                    dispatch(alertActions.success('Profile updated successfully'));
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.USER_UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.USER_UPDATE_SUCCESS, user } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_USER_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_USER_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_USER_FAILURE, id, error } }
}