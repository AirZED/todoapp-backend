const fs = require('fs');

//require and apply dotenv config before running app
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DB_CONNECTION_STRING.replace(
  '<DB_PASSWORD>',
  process.env.DB_PASSWORD
);

//setting strict query to false
mongoose.set('strictQuery', false);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('Connection to database is successful');
  })
  .catch((err) => {
    console.log('Connection to DB Failed');
    console.log(err);
  });

const Todos = fs.readFileSync(
  `${__dirname}/data/todos-dummy.json`,
  (err, data) => {
    if (err) {
      console.log('There is an error');
    }
  }
);

const Todo = require('./models/todoModel');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const fetchDummyData = async () => {
  const res = await fetch('https://dummyjson.com/todos', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
      'X-RapidAPI-Key': 'your-rapidapi-key',
    },
  });

  if (!res.ok) console.log('Fetching dummy todos failed');

  const data = await res.json();
  const description =
    'this is a dummy description, lorem says atleast half bread is better than full groundnut, hence we deal with this in a very elegant manner';

  data.todos.forEach((each) => {
    each.description = description;
    delete each.id;
  });

  fs.writeFile(
    `${__dirname}/data/todos-dummy.json`,
    JSON.stringify(data),
    (err, data) => {
      if (err) console.log(err);
    }
  );
};

const writeToDb = async () => {
  WrittenTodos = JSON.parse(Todos);
  try {
    await Todo.create(WrittenTodos.todos);
    console.log(WrittenTodos.todos.length);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === 'fetch') {
  fetchDummyData();
} else if (process.argv[2] === 'write') {
  writeToDb();
}
