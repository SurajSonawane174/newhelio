const mongoose = require('mongoose');
const fs = require('fs');
const project = require('../models/project');

main()
  .then(() => {
    console.log('Database connected');

    const data = JSON.parse(fs.readFileSync('./data/project.json', 'utf8'));
    return project.insertMany(data);
  })
  .then(() => {
    console.log('Data inserted into database');
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Mongoose connection closed');
  })
  .catch((err) => {
    console.error('Error occurred:', err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/heliocoder');
}