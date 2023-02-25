const Todo = require('./../models/todoModel');

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        todo: newTodo,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: 'failed',
      error: {
        error,
      },
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();


    //searching upon query

    res.status(200).json({
      status: 'success',
      length: allTodos.length,
      data: {
        todos: allTodos,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: 'failed',
      error: {
        error,
      },
    });
  }
};

exports.getSingleTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.find({ _id: todoId });

    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      error: {
        error,
      },
    });
  }
};

exports.deleteSingleTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;

    const newTodo = await Todo.findOneAndDelete({ _id: todoId });

    res.status(204).json({
      status: 'success',
      data: {
        todo: newTodo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      error: {
        error,
      },
    });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;

    const newTodo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      { $set: req.body },
      { runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        todo: newTodo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      error: {
        error,
      },
    });
  }
};
