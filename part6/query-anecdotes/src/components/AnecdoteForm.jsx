import { useQueryClient, useMutation } from '@tanstack/react-query'
import anecdoteServices from '../services/anecdotes'
import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { dispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteServices.createAnecdote,
    onSuccess: (newAnecdote) => {
      const allAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], allAnecdotes.concat(newAnecdote))

      dispatch({
        type: 'SHOW',
        payload: `Anecdote: ${newAnecdote.content} has just been created!`,
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
    onError: (error) => {
      console.log({ error })
      dispatch({
        type: 'SHOW',
        payload: error.message,
      })

      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)

    event.target.anecdote.value = ''
    // console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
