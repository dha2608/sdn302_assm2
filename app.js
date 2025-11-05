const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const port = 5000; // Chạy frontend trên port 5000 (khác port 3000 của backend)

// Cấu hình View Engine là EJS [cite: 10]
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình Middleware [cite: 40]
// Cần 'extended: true' để phân tích các form phức tạp
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Cấu hình Method-Override để dùng PUT, DELETE từ form
// Form sẽ có: <form method="POST" action="/url?_method=DELETE">
app.use(methodOverride('_method'));

// Cấu hình phục vụ file tĩnh (CSS, JS, Images) [cite: 40]
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRouter = require('./routes/index');
const quizRouter = require('./routes/quiz');
const questionRouter = require('./routes/question');

// Sử dụng routes [cite: 42, 45]
app.use('/', indexRouter);
app.use('/quizzes', quizRouter);
app.use('/questions', questionRouter);

// Khởi động server
app.listen(port, () => {
    console.log(`Frontend App đang chạy trên http://localhost:${port}`);
});