# Interview Experience Submission Platform

A full-stack application for sharing and managing interview experiences built with React, Node.js, and MongoDB.

## Features

- User authentication with JWT
- Create and view interview experiences
- Pagination for submissions list
- Comprehensive test coverage
- Responsive Material-UI design
- Search functionality
- Session management

## Tech Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Testing: Jest, Supertest

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sundeep1310/interview-platform.git
cd interview-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/interview-platform
JWT_SECRET=M7NTw5jPVcsXr9Q2kH3gL8yF4vB6uK1RxZnAeD0YbWmSiEjGhC
PORT=5000
FRONTEND_URL=http://localhost:3000
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start MongoDB server
2. Start backend:
```bash
cd backend
npm start
```

3. Start frontend:
```bash
cd frontend
npm start
```

4. Access the application at `http://localhost:3000`

## Running Tests

Backend tests:
```bash
cd backend
npm test
```

Frontend tests:
```bash
cd frontend
npm test
```


### Authentication Endpoints

- POST `/api/auth/register`: Register new user
- POST `/api/auth/login`: Login user

### Submission Endpoints

- GET `/api/submissions`: Get all submissions (paginated)
- POST `/api/submissions`: Create new submission
- GET `/api/submissions/user`: Get user's submissions

## Security Notes

- JWT tokens expire in 24 hours
- Passwords are hashed using bcrypt
- CORS enabled only for frontend domain
- Environment variables required for sensitive data
