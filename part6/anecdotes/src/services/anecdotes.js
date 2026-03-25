import { generateId } from '../utils/generateId';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);

    if (!response.ok) throw new Error('Failed to get anecdotes!');

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const createNew = async content => {
  try {
    const anecdote = { content, votes: 0 };
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(anecdote),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, createNew };
