const { check, validationResult } = require('express-validator');

// User validation rules
exports.validateUser = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6+ characters').isLength({ min: 6 })
];

// Task validation rules
exports.validateTask = [
  check('title', 'Title is required').not().isEmpty(),
  check('dueDate', 'Please enter a valid date').optional().isISO8601()
];

// Login validation rules
exports.validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};