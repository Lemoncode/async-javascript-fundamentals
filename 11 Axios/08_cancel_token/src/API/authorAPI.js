import axios from 'axios';

export const getAuthors = () => (
    axios.get('http://localhost:8000/api/authors')
);