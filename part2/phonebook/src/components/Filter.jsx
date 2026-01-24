function Filter({ searchName, onChangeSearchHandler }) {
  return (
    <section id='search'>
      <label htmlFor='search-box'>Search User</label>
      <input
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
