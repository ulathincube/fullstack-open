const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => console.log('Connected to the database'))
  .catch(error =>
    console.log(`Failed to connect to the database: ${error.message}`),
  );

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
