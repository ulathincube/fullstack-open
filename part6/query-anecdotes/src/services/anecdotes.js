const baseUrl = 'http://localhost:3001/anecdotes'

async function getAllAnecdotes() {
  try {
    const response = await fetch(baseUrl)

    if (!response.ok) throw new Error('Failed to fetch anecdotes')

    return await response.json()
  } catch (error) {
    if (error.message === 'Failed to fetch')
      throw new Error(
        'Anecdote service not available due to problems with the server',
      )
    throw error
  }
}

async function createAnecdote(anecdoteText) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: anecdoteText,
      votes: 0,
    }),
  }
  try {
    const response = await fetch(baseUrl, options)

    if (!response.ok) throw new Error('Failed to create anecdote!')

    return await response.json()
  } catch (error) {
    if (error.message === 'Failed to fetch')
      throw new Error(
        'Anecdote service not available due to problems with the server',
      )
    throw error
  }
}

async function voteAnecdote(anecdote) {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

  console.log(updatedAnecdote)
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAnecdote),
  }
  try {
    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

    if (!response.ok) throw new Error('Failed to vote for anecdote!')

    return await response.json()
  } catch (error) {
    if (error.message === 'Failed to fetch')
      throw new Error(
        'Anecdote service not available due to problems with the server',
      )
    throw error
  }
}

export default { getAllAnecdotes, createAnecdote, voteAnecdote }
