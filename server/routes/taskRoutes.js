const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/stats')
  .get(protect, getTaskStats);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;