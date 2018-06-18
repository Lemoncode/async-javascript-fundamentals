import axios from 'axios';
import setUp from './interceptors';

export const grantAccess = () => (
    axios.get('http://localhost:8000/api/access')
);