function Form({ onSubmitPerson, name, onChangeName, number, onChangeNumber }) {
  return (
    <form className='user-form' onSubmit={onSubmitPerson}>
      <div className='form-field'>
        <label htmlFor='name'>Name</label>
        <input
          className='text-field'
          type='text'
          name='name'
          id='person'
          value={name}
          onChange={onChangeName}
        />
      </div>
      <div className='form-field'>
        <label htmlFor='number'>Phone Number</label>
        <input
          className='text-field'
          type='text'
          name='number'
          id='number'
          value={number}
          onChange={onChangeNumber}
        />
      </div>
      <div>
        <button className='add-person' type='submit'>
          Add Person
        </button>
      </div>
    </form>
  );
}

export default Form;
