import { history } from '../helper/history';
import { userService } from '../services/user';

export const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                userService.logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
                history.push('/');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

