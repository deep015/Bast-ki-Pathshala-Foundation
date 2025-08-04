import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://server-iota-wine.vercel.app/api',
});

export default instance;
