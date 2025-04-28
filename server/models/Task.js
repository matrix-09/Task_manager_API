const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'completed'], 
    default: 'todo' 
  },
  dueDate: { type: Date },
  category: { type: String, enum: ['work', 'personal', 'shopping', 'other'] },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);