const express = require('express');
const router = express.Router();
const pool = require('../db/connections')
const authenticateToken = require('../middleware/auth');


// GET all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single task
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, async (req,res) => {
    try {
        const {title, description, project_id, created_by, status, priority} = req.body;
        const result = await pool.query (
            'INSERT INTO tasks (title, description, project_id, created_by, status, priority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, project_id, created_by, status, priority]
            
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {title, description, status, priority} = req.body;
        const result = await pool.query('UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4 WHERE id = $5 RETURNING *', [title, description, status, priority, req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
        res.json({ message: 'Task deleted', project: result.rows[0]});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router