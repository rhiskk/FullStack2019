/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  //const [username, setUsername] = useState('')
  const username = useField('text')
  //const [password, setPassword] = useState('')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const removeBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {

      blogService
        .remove(blog.id)
        .then(setBlogs(blogs.filter(b => b.id !== blog.id)))
        .catch(error => {
          setErrorMessage('blog already removed')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      setMessage(`blog ${blog.title} by ${blog.author} removed!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const like = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, likedBlog).then(returnedBlog => {
        const updatedBlogs = blogs.map(blog => blog.id !== likedBlog.id ? blog : returnedBlog)
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
        setMessage(`blog ${blog.title} by ${blog.author} liked!`)
      })
      .catch(error => {
        setErrorMessage('blog not found')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(
          `a new blog ${title} by ${author} added`
        )
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(error => {
        setErrorMessage(JSON.stringify(error.response.data))
      })
    setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Welcome ${username.value}`)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('wrong username or password')
    }
    setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new'>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          {...username.spread()}
        />
      </div>
      <div>
        salasana
        <input
          {...password.spread()}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} errorMessage={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  const logOutButton = () => (
    <button onClick={() =>
    {
      window.localStorage.clear()
      setUser(null)
      setMessage('Succesffully logged out')
      setTimeout(() => {
        setMessage(null)
        setErrorMessage(null)
      }, 5000)
    }
    }> Logout
    </button>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.username} logged in</p>
      {logOutButton()}
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          like={like} removeBlog={removeBlog}
          user={user}/>
      )}
    </div>
  )
}

export default App