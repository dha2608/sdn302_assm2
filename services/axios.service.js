const axios = require('axios');

const API_URL = 'http://localhost:3000';

const apiService = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

module.exports = apiService;