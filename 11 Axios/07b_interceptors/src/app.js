import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
import { setUpRequest } from './API/interceptors';
import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

document.addEventListener('DOMContentLoaded', () => {
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
            axios.get('http://localhost:3050/api/cars')
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
        });
});