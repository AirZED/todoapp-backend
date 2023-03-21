//importing mongoose
const mongoose = require('mongoose');

//creating a schema
const todoSchema = new mongoose.Schema({
  todo: {
    type: String, //I removed the required field because two todos can actually have the same name - you will have to remove the index on your mongodb compass else you fill face errors
    unique: true,
    trim: true,
  },
  description: { type: String, trim: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dueAt: Date,
  completed: { type: Boolean, required: [true, 'Todo must have a status'], default: false},
});

//modeling a schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
