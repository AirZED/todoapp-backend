//require and apply dotenv config before running app
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

//import app to start server
const app = require('./app');

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
