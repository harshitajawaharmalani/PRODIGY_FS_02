import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true, // Crucial for sending/receiving cookies (JWT)
});

export default API;