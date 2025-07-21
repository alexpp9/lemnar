import axios from 'axios';

// Axios Instance with base URL
export const client = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
