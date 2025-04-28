const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getUsers,
  deleteUser
} = require('../controllers/userController');

router.route('/')
  .get(protect, adminOnly, getUsers);

router.route('/:id')
  .delete(protect, adminOnly, deleteUser);

module.exports = router;