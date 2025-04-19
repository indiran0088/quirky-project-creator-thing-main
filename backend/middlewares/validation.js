// middleware/validation.js
const { body, validationResult } = require('express-validator');

exports.validateInvitation = [
  body('guestName').trim().isLength({ min: 2 }).withMessage('Guest name must be at least 2 characters'),
  body('guestEmail').isEmail().withMessage('Please enter a valid email address'),
  body('collegeName').trim().isLength({ min: 2 }).withMessage('College name must be at least 2 characters'),
  body('eventTitle').trim().isLength({ min: 2 }).withMessage('Event title must be at least 2 characters'),
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  body('staffNumber').trim().isLength({ min: 3 }).withMessage('Staff number must be at least 3 characters'),
  body('staffEmail').isEmail().withMessage('Please enter a valid staff email address'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];