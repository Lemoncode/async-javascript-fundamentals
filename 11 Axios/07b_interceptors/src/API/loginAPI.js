import axios from 'axios';

export default ({username, password}) => (
    axios.post('http://localhost:8887/login', {username, password})
);