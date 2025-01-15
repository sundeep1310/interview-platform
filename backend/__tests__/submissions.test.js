const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Submission = require('../models/Submission');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Create test user and generate token
  const user = await User.create({
    name: 'Test User',
    email: 'test@test.com',
    password: 'password123'
  });
  userId = user._id;
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Submission.deleteMany({});
});

describe('Submission Endpoints', () => {
  describe('POST /api/submissions', () => {
    it('should create a new submission with valid token', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test User',
          country: 'Test Country',
          company: 'Test Company',
          questions: ['Question 1', 'Question 2']
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('company', 'Test Company');
    });

    it('should not create submission without token', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .send({
          name: 'Test User',
          country: 'Test Country',
          company: 'Test Company',
          questions: ['Question 1']
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/submissions', () => {
    beforeEach(async () => {
      await Submission.create({
        name: 'Test User',
        country: 'Test Country',
        company: 'Test Company',
        questions: ['Question 1'],
        userId
      });
    });

    it('should get paginated submissions', async () => {
      const res = await request(app)
        .get('/api/submissions')
        .query({ page: 1, limit: 10 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('submissions');
      expect(res.body.submissions).toHaveLength(1);
      expect(res.body).toHaveProperty('totalPages');
      expect(res.body).toHaveProperty('currentPage');
    });

    it('should get user submissions', async () => {
      const res = await request(app)
        .get('/api/submissions/user')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body).toHaveLength(1);
    });
  });
});