const express = require('express');
const todoController = require('../controllers/todoController');

//initializing app from express application
const router = express.Router();

router
  .route(`/`)
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);

router
  .route(`/:id`)
  .get(todoController.getSingleTodo)
  .delete(todoController.deleteSingleTodo)
  .patch(todoController.editTodo);

module.exports = router;
