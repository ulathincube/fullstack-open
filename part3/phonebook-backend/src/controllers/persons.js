const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const Person = require('../models/person');

function getAllPersons(req, res, next) {
  Person.find({})
    .then(persons => res.status(200).json(persons))
    .catch(error => next(error));
}

function getOnePerson(req, res, next) {
  const { personId } = req.params;

  Person.findById(personId)
    .then(person => {
      if (!person) return res.status(404).end();
      res.status(200).json(person);
    })
    .catch(error => next(error));
}

function deleteOnePerson(req, res, next) {
  const { personId } = req.params;

  Person.findByIdAndDelete(personId)
    .then(() => res.status(204).end())
    .catch(error => next(error));
}

function createOnePerson(req, res, next) {
  const { name, number } = req.body;

  if (!name || !number)
    return res
      .status(400)
      .json({ error: "Please provide both a person's name and number!" });

  // const personExists = allPersonsData.find(
  //   personObject => personObject.name === name,
  // );

  // if (personExists)
  //   return res
  //     .status(400)
  //     .json({ error: 'Name must be unique! No duplicate names allowed' });

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then(() => res.status(201).json(person))
    .catch(error => next(error));
}

function updatePerson(req, res, next) {
  const { personId } = req.params;
  const { number } = req.body;

  Person.findById(personId)
    .then(foundPerson => {
      if (!foundPerson) return res.status(404).end();

      foundPerson.number = number;

      return foundPerson
        .save()
        .then(updatedPerson => res.status(201).json(updatedPerson));
    })
    .catch(error => next(error));
}

module.exports = {
  getAllPersons,
  getOnePerson,
  deleteOnePerson,
  createOnePerson,
  updatePerson,
};
