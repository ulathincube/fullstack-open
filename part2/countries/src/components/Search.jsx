function Search({ country, onChangeCountry }) {
  const countryChangeHandler = event => onChangeCountry(event.target.value);
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='countries'>Find Countries</label>
        <input
          type='text'
          name='countries'
          id='countries'
          value={country}
          onChange={countryChangeHandler}
        />
      </div>
    </form>
  );
}

export default Search;
