const express = require('express');
const app = express();
const pool = require('./src/db/connections');
const userRouter = require('./src/routes/users');
const projectsRouter = require('./src/routes/projects')
const tasksRouter = require('./src/routes/tasks')
const authRouter = require('./src/routes/auth');

app.use(express.json());
app.use('/users', userRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

