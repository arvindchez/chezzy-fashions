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

async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return await fetch("/users/login", requestOptions)
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

async function logout() {
    const contentHeader = { "Content-Type": "application/json" };
    const tokenHeader = authHeader()

    return await fetch("/users/logout", {
        method: "POST",
        headers: { ...contentHeader, ...tokenHeader },
    }).then(handleResponse)
        .then((user) => {
            localStorage.removeItem('user');
            localStorage.removeItem("cartItems");
            return user;
        });
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch("/users/me", requestOptions).then(handleResponse);
}

async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return await fetch("/users/register", requestOptions).then(handleResponse);
}

async function update(user) {
    const { firstName, lastName, phone, address, password } = user
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone, address, password })
    };

    return await fetch("users/me", requestOptions)
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return await fetch("/users/me", requestOptions).then(handleResponse);
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