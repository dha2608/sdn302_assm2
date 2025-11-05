const axios = require('axios');

// API Backend đang chạy trên port 3000
const API_URL = 'http://localhost:3000';

// Tạo một instance của Axios để dùng chung
// (Chúng ta không dùng HTTPS như ví dụ demo 
// vì backend A1 đang là HTTP)
const apiService = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

module.exports = apiService;