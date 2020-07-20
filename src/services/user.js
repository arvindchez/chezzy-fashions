import { authHeader } from '../helper/auth-header';
import { history } from '../helper/history';

export const userService = {
    login,
    logout,
    register,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch("/users/login", requestOptions)
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch("/users/me", requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch("/users/register", requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: '[PATCH]',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch("/users/me", requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch("/users/me", requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                // eslint-disable-next-line no-restricted-globals
                //location.reload(true);
                history.push('/');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}