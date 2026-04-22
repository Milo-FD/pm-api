const express = require('express');
const router = express.Router();
const pool = require('../db/connections');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, description, status, created_by } = req.body;
        const result = await pool.query(
            'INSERT INTO projects (name, description, status, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, status, created_by]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { name, description, status } = req.body;
         const result = await pool.query('UPDATE projects SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *', [name, description, status, req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
        res.json({ message: 'Project deleted', project: result.rows[0]});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;