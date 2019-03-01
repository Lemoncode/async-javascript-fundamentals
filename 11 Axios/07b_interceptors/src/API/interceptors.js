import axios from 'axios';

// const setUp = () => {
//     axios.interceptors.request.use((config) => {
//         config.headers['GEN_TOKEN'] = '000aks1243545iopods'
//         return config;
//     }, (err) => {
//         return Promise.reject(err);
//     });
    
//     axios.interceptors.response.use((response) => {
//         // Do something with data
//         console.log(response);
//         // TODO: Catch response. Simulate on server different status
//         return response;
//     }, (error) => {
//         console.log(error.response.status);
//         console.log(error.response.statusText);
//         window.location = "/index.html"; // Play with both
//         //return Promise.reject(error.response);
//     });
// };

// export default setUp();

export const setUpRequest = (token) => {
    axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
};