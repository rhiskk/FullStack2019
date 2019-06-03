import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  it('if user is logged, notes are rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(1)
  })

})