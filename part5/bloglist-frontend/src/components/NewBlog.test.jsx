import NewBlog from './NewBlog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<NewBlog />', () => {
  test('Renders the newblog form', async () => {
    const user = userEvent.setup()
    const onError = vi.fn()

    const mockBlogCreate = vi.fn()
    render(<NewBlog onBlogCreate={mockBlogCreate} onUpdateMessage={onError} />)

    const title = screen.getByLabelText('Title')
    const author = screen.getByLabelText('Author')
    const url = screen.getByLabelText('Url')

    await user.type(title, 'How to get a job in CS')
    await user.type(author, 'Ulathi Ncube')
    await user.type(url, 'https://ulathi-ncube/how-to-get-a-job-in-cs')

    const button = screen.getByText('Create')
    await user.click(button)

    expect(mockBlogCreate.mock.calls[0][0].title).toBe('How to get a job in CS')
    expect(mockBlogCreate.mock.calls[0][0].author).toBe('Ulathi Ncube')
    expect(mockBlogCreate.mock.calls[0][0].url).toBe(
      'https://ulathi-ncube/how-to-get-a-job-in-cs'
    )
  })
})
