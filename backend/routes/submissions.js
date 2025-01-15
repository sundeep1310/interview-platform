const router = require('express').Router();
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const submission = new Submission({
      ...req.body,
      userId: req.userId
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const submissions = await Submission.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name');

    const total = await Submission.countDocuments();

    res.json({
      submissions,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.userId });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;