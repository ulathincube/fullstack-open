import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import axios from 'axios';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      const { data: personsArray } = response;
      setPersons(personsArray);
    });
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const onSubmitPersonHandler = event => {
    event.preventDefault();

    const userExists = persons.find(person => person.name === newName);

    if (userExists) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }
    const personsList = [
      ...persons,
      { name: newName, id: persons.length + 1, number: newNumber },
    ];
    setPersons(personsList);
  };

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
      <Persons searchName={searchName} persons={persons} />
    </div>
  );
}

export default App;
