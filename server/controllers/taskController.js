const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(task);
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if task belongs to user
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  res.json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if task belongs to user
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json(task);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if task belongs to user
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await task.remove();
  res.json({ message: 'Task removed' });
});

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
exports.getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  res.json(stats);
});