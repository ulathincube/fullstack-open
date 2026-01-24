import { useState } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

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
