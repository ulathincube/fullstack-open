import personServices from '../services/persons';

function Persons({ searchName, persons, onUpdatePersons }) {
  let personsData, filteredPersons;

  const deleteUser = userId => {
    const user = persons.find(person => person.id === userId);
    const answer = confirm(`Delete ${user.name}?`);

    if (!answer) return;
    personServices.deleteUser(userId).then(() => {
      const filteredPersons = persons.filter(
        personObject => personObject.id !== userId,
      );
      onUpdatePersons(filteredPersons);
    });
  };

  if (searchName) {
    filteredPersons = persons
      .filter(person =>
        person.name.toLowerCase().includes(searchName.toLowerCase()),
      )
      .map(({ name, id, number }) => (
        <li key={id}>
          <span>{name}</span> <span>{number}</span>
          <button onClick={() => deleteUser(id)}>Delete</button>
        </li>
      ));
  } else {
    personsData = persons.map(person => (
      <li key={person.id}>
        <span>{person.name}</span> <span>{person.number}</span>
        <button onClick={() => deleteUser(person.id)}>Delete</button>
      </li>
    ));
  }
  return <ul>{filteredPersons ? filteredPersons : personsData}</ul>;
}

export default Persons;
