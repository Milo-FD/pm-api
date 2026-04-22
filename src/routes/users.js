const express = require('express');
const router = express.Router();
const pool = require('../db/connections');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const {name, email, password, position } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email, password, position) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, password, position]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {name, email, position} = req.body
        const result = await pool.query('UPDATE users SET name = $1, email = $2, position = $3 WHERE id = $4 RETURNING *', [name, email, position, req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});


router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
        res.json({ message: 'User deleted', user: result.rows[0]});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;