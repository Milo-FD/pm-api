const express = require('express');
const router = express.Router();
const pool = require('../db/connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, position } = req.body;
    
    if (!name || !email || !password || name.trim() === '' || email.trim() === '' || password.trim() === '') {
  return res.status(400).json({ error: 'Name, email and password are required.' });

    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, position]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === '' || password.trim() === '') {
  return res.status(400).json({ error: 'Email and password are required.' });

    }

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;