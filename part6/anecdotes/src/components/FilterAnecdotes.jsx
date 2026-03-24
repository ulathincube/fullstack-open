import { useDispatch } from 'react-redux';
import { filter } from '../reducers/filterReducer';

function FilterAnecdotes() {
  const dispatch = useDispatch();

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='filter'>Filter</label>
        <input
          type='text'
          name='filter'
          id='filter'
          onChange={({ target }) => dispatch(filter(target.value))}
        />
      </div>
    </form>
  );
}

export default FilterAnecdotes;
