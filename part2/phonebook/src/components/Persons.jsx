function Persons({ searchName, persons }) {
  let personsData, filteredPersons;

  if (searchName) {
    filteredPersons = persons
      .filter(person =>
        person.name.toLowerCase().startsWith(searchName.toLowerCase()),
      )
      .map(({ name, id, number }) => (
        <li key={id}>
          <span>{name}</span> <span>{number}</span>
        </li>
      ));
  } else {
    personsData = persons.map(person => (
      <li key={person.id}>
        <span>{person.name}</span> <span>{person.number}</span>
      </li>
    ));
  }
  return <ul>{filteredPersons ? filteredPersons : personsData}</ul>;
}

export default Persons;
