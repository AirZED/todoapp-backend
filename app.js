const express = require('express');
const morgan = require('morgan');

//importing routers
// const todoRouter = require(`${__dirname}/routes/todoRoutes`);

const todoRouter = require('./routes/todoRoutes');

// initializing app js
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//make the middleware that enables the availability of the req on the req.body
app.use(express.json());

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
