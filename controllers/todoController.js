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
    //We need to first of all do a deep copy of the req.query object
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];

    //We need to remove this fields from the shallow object before using it to find,
    //incase we dont only want to find, we want to also sort, limit etc
    excludedFields.forEach((each) => delete queryObj[each]);

    //we also check for greater than and lessthan signs to include dollar signs infront of them
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    //dont await here
    //await down there
    let query = Todo.find(JSON.parse(queryStr));

    // 2. Sorting
    if (req.query.sort) {
      const sortStr = req.query.sort.split(',').join(' ');
      query = query.sort(sortStr);
    }

    //3. Limiting
    if (req.query.fields) {
      const fields = req.query.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4. Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTodos = await Todo.countDocuments();
      if (numTodos < skip) {
        throw new Error('This page does not exist');
      }
    }

    //searching upon query
    const allTodos = await query;

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
