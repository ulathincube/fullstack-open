function Form({ onSubmitPerson, name, onChangeName, number, onChangeNumber }) {
  return (
    <form onSubmit={onSubmitPerson}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='person'
          value={name}
          onChange={onChangeName}
        />
      </div>
      <div>
        <label htmlFor='number'>Phone Number</label>
        <input
          type='number'
          name='number'
          id='number'
          value={number}
          onChange={onChangeNumber}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
}

export default Form;
