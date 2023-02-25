//importing mongoose
const mongoose = require('mongoose');

//creating a schema
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Todo must have a name'],
    unique: true,
    trimm: true,
  },
  description: { type: String, trim: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dueAt: Date,
  completed: { type: Boolean, required: [true, 'Todo must have a status'] },
});

//modeling a schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
