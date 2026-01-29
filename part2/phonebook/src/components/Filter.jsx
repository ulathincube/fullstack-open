function Filter({ searchName, onChangeSearchHandler }) {
  return (
    <section className='search'>
      <label htmlFor='search-box'>Search User</label>
      <input
        className='text-field'
        type='search'
        name='search'
        id='search-box'
        value={searchName}
        onChange={onChangeSearchHandler}
      />
    </section>
  );
}

export default Filter;
