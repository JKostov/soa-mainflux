
import axios from 'axios';

const { API_URL } = process.env;

const development = process.env.NODE_ENV === 'development';

const apiUrl = 'http://172.25.0.12:3005';

const instance = axios.create({
  baseURL: `${apiUrl}/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('_token');

    if (authToken) {
      config.headers.Authorization = authToken;
    }

    if (development) {
      console.log(`[${config.method}]: ${config.url}`);
      if (config.data) {
        console.log('Data: ', config.data);
      }
    }

    return config;
  },
  (error) => {
    if (development) {
      console.error(error);
    }
    return Promise.reject(error);
  },
);

export default instance;
