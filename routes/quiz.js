const express = require('express');
const router = express.Router();
const api = require('../services/axios.service');

// GET: Hiển thị danh sách quiz [cite: 20, 66]
router.get('/', async (req, res) => {
    try {
        const response = await api.get('/quizzes'); // API này đã populate
        res.render('quiz/list', { 
            quizzes: response.data, 
            title: 'Danh sách Quiz' 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET: Hiển thị form tạo quiz mới 
router.get('/new', (req, res) => {
    res.render('quiz/create', { title: 'Tạo Quiz Mới' });
});

// POST: Tạo quiz mới [cite: 21]
router.post('/', async (req, res) => {
    try {
        await api.post('/quizzes', req.body);
        res.redirect('/quizzes');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET: Hiển thị chi tiết 1 quiz (cùng các câu hỏi) [cite: 22, 67]
router.get('/:id', async (req, res) => {
    try {
        const response = await api.get(`/quizzes/${req.params.id}`); // API này đã populate
        res.render('quiz/details', { 
            quiz: response.data, 
            title: 'Chi tiết Quiz' 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET: Hiển thị form chỉnh sửa quiz 
router.get('/:id/edit', async (req, res) => {
    try {
        const response = await api.get(`/quizzes/${req.params.id}`);
        res.render('quiz/edit', { 
            quiz: response.data, 
            title: 'Chỉnh sửa Quiz' 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT: Cập nhật quiz [cite: 21]
router.put('/:id', async (req, res) => {
    try {
        await api.put(`/quizzes/${req.params.id}`, req.body);
        res.redirect(`/quizzes/${req.params.id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE: Xóa quiz [cite: 21]
router.delete('/:id', async (req, res) => {
    try {
        // API (A1) của chúng ta đã tự động xóa các câu hỏi liên quan
        await api.delete(`/quizzes/${req.params.id}`);
        res.redirect('/quizzes');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- Yêu cầu đặc biệt: Thêm câu hỏi vào Quiz  ---
// GET: Hiển thị form thêm câu hỏi MỚI cho 1 quiz
router.get('/:quizId/questions/new', (req, res) => {
    res.render('questions/create_for_quiz', {
        title: 'Thêm câu hỏi vào Quiz',
        quizId: req.params.quizId
    });
});

// POST: Tạo và thêm câu hỏi MỚI vào 1 quiz
// (Sử dụng API: POST /quizzes/:quizId/question)
router.post('/:quizId/questions', async (req, res) => {
    try {
        const { quizId } = req.params;
        const { text, options, correctAnswerIndex } = req.body;
        
        const optionsArray = options.split(',').map(opt => opt.trim());
        const newQuestion = {
            text,
            options: optionsArray,
            correctAnswerIndex: parseInt(correctAnswerIndex)
        };

        // Gọi API từ Assignment 1
        await api.post(`/quizzes/${quizId}/question`, newQuestion);
        
        // Quay về trang chi tiết quiz
        res.redirect(`/quizzes/${quizId}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;