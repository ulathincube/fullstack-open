import Blog from './Blog'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

describe('<Blog />', () => {
  // variables

  const blog = {
    title: 'How to run a test?',
    author: 'Ulathi Ncube',
    url: 'https://www.google.com/ulathi-ncube',
    likes: 30,
    user: {
      username: 'testuser',
    },
  }

  const userData = {
    username: 'testuser',
  }

  test('Renders title and author but no likes or url by default', () => {
    render(<Blog blog={blog} user={userData} />)

    const blogTitle = screen.getByText('How to run a test?', { exact: false })
    const blogAuthor = screen.getByText('Ulathi Ncube', { exact: false })
    const blogUrl = screen.getByText('https://www.google.com/ulathi-ncube')

    expect(blogTitle).toBeVisible()
    expect(blogAuthor).toBeVisible()
    expect(blogUrl).not.toBeVisible()
  })

  test('Shows hidden information when show button is clicked', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} user={userData} />)

    const showButton = screen.getByText('View')
    const blogUrl = screen.getByText('https://www.google.com/ulathi-ncube')
    const blogLikes = screen.getByText('30')

    await user.click(showButton)
    expect(blogUrl).toBeVisible()
    expect(blogLikes).toBeVisible()
  })

  test('Clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()

    const mockPostLike = vi.fn()

    render(<Blog blog={blog} user={userData} onPostLike={mockPostLike} />)
    const showButton = screen.getByText('View')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockPostLike.mock.calls).toHaveLength(2)
  })
})
