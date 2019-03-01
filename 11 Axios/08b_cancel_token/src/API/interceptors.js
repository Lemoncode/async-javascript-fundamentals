import axios from 'axios';

export const setUpRequest = (token) => {
    axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
};

export const setUpResponse = () => {
    axios.interceptors.response.use((response) => {
        // Do something with data
        console.log(response);
        return response;
    }, (error) => {
        if (err.response && error.response.status === 401) {
            console.log('you are not allowed');
        }
        return Promise.reject('I am canceled');
    });
}