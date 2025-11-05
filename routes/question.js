const express = require('express');
const router = express.Router();
const api = require('../services/axios.service');

// GET: Hiển thị danh sách câu hỏi [cite: 24, 61]
router.get('/', async (req, res) => {
    try {
        const response = await api.get('/question');
        res.render('questions/list', { 
            questions: response.data, 
            title: 'Danh sách Câu hỏi' 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET: Hiển thị form tạo câu hỏi mới 
router.get('/new', (req, res) => {
    res.render('questions/create', { title: 'Tạo Câu hỏi Mới' });
});

// POST: Tạo câu hỏi mới [cite: 25]
router.post('/', async (req, res) => {
    try {
        const { text, options, correctAnswerIndex } = req.body;
        // Chuyển đổi chuỗi options (phân tách bằng dấu phẩy) thành mảng 
        const optionsArray = options.split(',').map(opt => opt.trim());
        
        const newQuestion = {
            text,
            options: optionsArray,
            correctAnswerIndex: parseInt(correctAnswerIndex)
        };
        
        await api.post('/question', newQuestion);
        res.redirect('/questions');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET: Hiển thị chi tiết 1 câu hỏi 
router.get('/:id', async (req, res) => {
    try {
        const response = await api.get(`/question/${req.params.id}`);
        res.render('questions/details', { 
            question: response.data, 
            title: 'Chi tiết Câu hỏi' 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET: Hiển thị form chỉnh sửa câu hỏi 
router.get('/:id/edit', async (req, res) => {
    try {
        const response = await api.get(`/question/${req.params.id}`);
        const question = response.data;
        
        // Chuyển mảng options thành chuỗi để hiển thị
        question.optionsString = question.options.join(', ');
        
        res.render('questions/edit', { 
            question: question, 
            title: 'Chỉnh sửa Câu hỏi' 
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT: Cập nhật câu hỏi [cite: 25]
router.put('/:id', async (req, res) => {
    try {
        const { text, options, correctAnswerIndex } = req.body;
        const optionsArray = options.split(',').map(opt => opt.trim());
        
        const updatedQuestion = {
            text,
            options: optionsArray,
            correctAnswerIndex: parseInt(correctAnswerIndex)
        };
        
        await api.put(`/question/${req.params.id}`, updatedQuestion);
        res.redirect(`/questions/${req.params.id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE: Xóa câu hỏi [cite: 25]
router.delete('/:id', async (req, res) => {
    try {
        await api.delete(`/question/${req.params.id}`);
        res.redirect('/questions');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;