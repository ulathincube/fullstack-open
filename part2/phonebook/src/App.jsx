import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import personServices from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personServices.getAllUsers().then(allPersons => setPersons(allPersons));
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const onSubmitPersonHandler = event => {
    event.preventDefault();

    const userExists = persons.find(person => person.name === newName);

    if (userExists) {
      const answer =
        confirm(`${userExists.name} is already added to the phonebook, replace the old number
        with a new one?`);

      if (!answer) return;
      personServices
        .updateUser(userExists.id, {
          ...userExists,
          number: newNumber,
        })
        .then(updatedUser => {
          const userIndex = persons.findIndex(
            person => person.id === updatedUser.id,
          );
          const newPersons = [...persons];
          newPersons[userIndex] = updatedUser;
          setPersons(newPersons);
          setNewName('');
          setNewNumber('');
        });

      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personServices.create(newPerson).then(personData => {
      console.log('Created Person', { personData });
      const personsList = [...persons, personData];
      setPersons(personsList);
      setNewName('');
      setNewNumber('');
    });
  };

  const onUpdatePersons = newPersons => setPersons(newPersons);

  const onChangeNameHandler = event => setNewName(event.target.value);

  const onChangeNumberHandler = event => setNewNumber(event.target.value);

  const onChangeSearchHandler = event => {
    const searchKey = event.target.value;
    setSearchName(searchKey);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onChangeSearchHandler={onChangeSearchHandler}
        searchName={searchName}
      />
      <h3>Add A New Person</h3>
      <Form
        onSubmitPerson={onSubmitPersonHandler}
        name={newName}
        onChangeName={onChangeNameHandler}
        number={newNumber}
        onChangeNumber={onChangeNumberHandler}
      />
      <h3>Numbers</h3>
      <Persons
        searchName={searchName}
        persons={persons}
        onUpdatePersons={onUpdatePersons}
      />
    </div>
  );
}

export default App;
