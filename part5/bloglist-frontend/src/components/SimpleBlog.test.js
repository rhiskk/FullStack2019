import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders  title, author and likes', () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    likes: 1
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  component.debug()
  expect(component.container).toHaveTextContent(
    'titleTest'
  )

  expect(component.container).toHaveTextContent(
    'authorTest'
  )

  expect(component.container).toHaveTextContent(
    1
  )

})

it('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    likes: 1
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})