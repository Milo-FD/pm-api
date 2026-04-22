# PM - API

A project management REST API built with Node.js, Express, and PostgreSQL. Inspired by Jira, it allows users to manage projects and tasks with full authentication and authorization.

## Tech Stack

- Node.js & Express
- PostgreSQL
- bcrypt (password hashing)
- JWT (authentication)

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies
   npm install
3. Create a .env file in the root directory
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_NAME=jira_clone
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=your_secret_key
4. Start the server
   node index.js

## API Endpoints

### Auth (Public)
- POST /auth/register - Register a new user
- POST /auth/login - Login and receive a JWT token

### Users (Protected)
- GET /users - Get all users
- GET /users/:id - Get a specific user
- POST /users - Create a user
- PUT /users/:id - Update a user
- DELETE /users/:id - Delete a user

### Projects (Protected)
- GET /projects - Get all projects
- GET /projects/:id - Get a specific project
- POST /projects - Create a project
- PUT /projects/:id - Update a project
- DELETE /projects/:id - Delete a project

### Tasks (Protected)
- GET /tasks - Get all tasks
- GET /tasks/:id - Get a specific task
- POST /tasks - Create a task
- PUT /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task

## Authentication

Protected routes require a Bearer token in the Authorization header:
Authorization: Bearer your_jwt_token

Register or login to receive a token.
