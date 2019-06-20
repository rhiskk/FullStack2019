import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogin, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu, Button } from 'semantic-ui-react'

const App = (props) => {

  useEffect(() => {
    props.initializeUsers()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.initializeLogin()
  // eslint-disable-next-line
  }, [])

  if (props.user === null) {
    return <LoginForm />
  }

  const newBlogRef = React.createRef()

  const userById = (id) =>
    props.users.find(user => user.id === id)

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)


  return (
    <Container>
      <div>
        <Router>
          <div>
            <div>
              <Menu color='pink'>
                <Menu.Item link>
                  <Link to="/">blogs</Link>
                </Menu.Item>
                <Menu.Item link>
                  <Link to="/users">users</Link>
                </Menu.Item>
                <Menu.Item link>
                  {props.user.name
                    ? <p>{props.user.name} logged in </p>
                    : <Link to="/login">login</Link>
                  }
                </Menu.Item>
                <Menu.Item link>
                  <Button color="pink" onClick={props.logout}>logout</Button>
                </Menu.Item>
              </Menu>
            </div>
            <div className="ui pink segment">
              <h2 className="ui pink header">blog app</h2>
              <Notification />
              <Route exact path="/" render={() =>
                <div>
                  <Togglable buttonLabel='create new' ref={newBlogRef}>
                    <NewBlog />
                  </Togglable>
                  <BlogList />
                </div>} />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog blog={blogById(match.params.id)}/>}
              />
              <Route exact path="/users" render={() => <UserList />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} />}
              />
            </div>
          </div>
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeLogin,
  initializeUsers,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)