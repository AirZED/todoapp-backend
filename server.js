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

//Function for database connection
async function connectDatabase(){
  try{
    await mongoose.connect(DB)
  }catch(err){
    console.log('Database connection failed')
    console.error(err)
  }
}
const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDatabase() //Initialize the database connection once the server starts
  console.log(`app is running at port ${port}`);
});
