import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders only title and author by default', () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'titleTest'
  )

  expect(component.container).toHaveTextContent(
    'authorTest'
  )

  expect(component.container).not.toHaveTextContent(
    1
  )

})

/*it ('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    likes: 1
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})*/
