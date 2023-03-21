const Todo = require('./../models/todoModel');

//Function to handle successful responses
function serverResponse(res, code, data){
  return res.status(code).json({status: 'success', data})
}
//function to handle error
function serverErrorHandler(res, code, err){
  return res.status(code).json({status: 'failed', error: err.message})
}

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    serverResponse(res, 201, todo)
  } catch (error) {
   serverErrorHandler(res, 500, error) //This error handling is not robust - also check status codes, try returning proper status codes
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    //I removed the previous code because it is not necessary, do not worry about pagination for now. When you need it, study it, Jonas makes it complex
    //for now you just want to find all, so do just that
   const todos = await Todo.find({})
   serverResponse(res,200, {length: todos.length, todos})
  } catch (error) {
   serverErrorHandler(res, 500, error)
  }
};

exports.getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id }); //Find returns an array, find one returns a single document which is what you want here
    serverResponse(res, 200, todo)
  } catch (error) {
    serverErrorHandler(res, 500, error)
  }
};

exports.deleteSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findOneAndDelete({ _id: id });
    serverResponse(res, 204, null) //I do not recommed 204 when doing a delete, 204 returns no content but at times you may want to return a message, you can use 200 instead
  } catch (error) {
    serverErrorHandler(res, 500, error)
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const newTodo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    serverResponse(res, 200, newTodo)
  } catch (error) {
    serverErrorHandler(res, 500, error)
  }
};
