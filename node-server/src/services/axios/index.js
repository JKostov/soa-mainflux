
const axios = require('axios');

const apiUrl = 'http://172.25.0.9/';

const instance = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

module.exports = instance;
