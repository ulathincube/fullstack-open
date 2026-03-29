import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteServices from './services/anecdotes'

function App() {
  const { status, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteServices.getAllAnecdotes,
    retry: 1,
  })

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: anecdoteServices.voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const allAnecdotes = queryClient.getQueryData(['anecdotes'])
      const allAnecdotesUpdated = allAnecdotes.map((anecdoteObject) =>
        anecdoteObject.id === updatedAnecdote.id
          ? updatedAnecdote
          : anecdoteObject,
      )
      queryClient.setQueryData(['anecdotes'], allAnecdotesUpdated)
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {status === 'pending' && <div>...Loading Anecdotes...</div>}
      {status === 'error' && <div>Error: {error.message}</div>}
      {status === 'success' &&
        data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App
