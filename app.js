const express = require('express');
const morgan = require('morgan');
const cors = require('cors')


const todoRouter = require('./routes/todoRoutes');

// initializing app js
const app = express();
app.use(cors()) //The cors package exports a function which serves as a middleware that handles cors related issues
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//make the middleware that enables the availability of the req on the req.body
app.use(express.json());

//I hope you understand that this function is just to demonstrate that express is structured in a middleware style and that you can manipulate an incoming request by strategically placing a middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  const date = new Date();
  console.log(date.toLocaleTimeString());
  next();
});

//Middlewares does not run until a request hits the server
//mounting the tours
app.use(`/api/v1/todos`, todoRouter);

//exporting the app
module.exports = app;