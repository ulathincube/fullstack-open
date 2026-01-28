const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const allPersonsData = JSON.parse(
  readFileSync(join(__dirname, '../../', 'data.json'), {
    encoding: 'utf8',
  }),
);

function getAllPersons(req, res) {
  res.status(200).json(allPersonsData);
}

function getOnePerson(req, res) {
  const { personId } = req.params;

  const person = allPersonsData.find(
    personObject => personObject.id === personId,
  );

  if (!person) return res.status(404).end();

  res.status(200).json(person);
}

function deleteOnePerson(req, res) {
  const { personId } = req.params;

  const person = allPersonsData.find(
    personObject => personObject.id === personId,
  );

  if (!person) return res.status(404).end();

  const otherPersons = allPersonsData.filter(
    personObject => personObject.id !== personId,
  );

  console.log(otherPersons);

  res.status(204).end();
}

function createOnePerson(req, res) {
  const { name, number } = req.body;

  if (!name || !number)
    return res
      .status(400)
      .json({ error: "Please provide both a person's name and number!" });

  const personExists = allPersonsData.find(
    personObject => personObject.name === name,
  );

  if (personExists)
    return res
      .status(400)
      .json({ error: 'Name must be unique! No duplicate names allowed' });

  const generateId = () => Math.round(Math.random() * 200);
  const person = {
    name,
    number,
    id: generateId(),
  };

  const newPersonsArray = allPersonsData.concat(person);
  res.status(201).json(newPersonsArray);
}

// method url status response-time

module.exports = {
  getAllPersons,
  getOnePerson,
  deleteOnePerson,
  createOnePerson,
};
