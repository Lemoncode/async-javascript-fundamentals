import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
import { setUpRequest, setUpResponse } from './API/interceptors';
import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

const getCars = (cancelSettings) => (
    axios.get('http://localhost:3050/api/cars', cancelSettings)
);

document.addEventListener('DOMContentLoaded', () => {
    setUpResponse();
    submitButtonPromise('click', 'login')
        .then(() => {
            const credentials = readCredentials();
            return login(credentials)
        })
        .then((result) => {
            const { access_token } = result.data;
            setUpRequest(access_token);
        })
        .catch((err) => console.log(err));

    document.getElementById('cars')
        .addEventListener('click', (event) => {
            event.stopPropagation();
            const CancelToken = axios.CancelToken;
            let source = CancelToken.source();
            getCars({ cancelToken: source.token })
                .then((result) => console.log(result))
                .catch((err) => console.log(err));

            source.cancel();
        });
});