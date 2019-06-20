import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { Form, Button, List } from 'semantic-ui-react'

const Blog = (props) => {
  const [comment, commentReset] = useField('text')
  if ( props.blog === undefined) {
    return null
  }

  const notify = (message, color = 'success') => {
    props.setNotification({ message, color }, 10)
  }

  const like = async (blog) => {
    props.likeBlog(blog)
    notify(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const remove = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    props.commentBlog(props.blog, comment.value)
    notify('a new comment added')
    commentReset()
  }

  const creator=props.blog.user.username === props.user.username

  const details = () => (
    <div >
      <a className="ui purple header" href={props.blog.url}>{props.blog.url}</a>
      <h4 className="ui pink header">added by {props.blog.user.name}</h4>
      <div className="ui left labeled button" tabIndex="0">
        <p className="ui basic pink right pointing label">
          {props.blog.likes}
        </p>
        <div onClick={() => like(props.blog)} className="ui pink button">
          <i className="heart icon"></i> Like
        </div>
      </div>
      {creator &&(<Button color='yellow' onClick={() => remove(props.blog)}>remove </Button>)}

      <h4>Comments</h4>
      <Form onSubmit={handleSubmit}>
        <div>
          <input {...comment} /> <Button color='pink' type='submit'>add comment</Button>
        </div>
      </Form>

      <List>
        {props.blog.comments.map(comment => (
          <List.Item key={comment.id}>{comment.content}</List.Item>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <h2>{props.blog.title}</h2>
      {details()}
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  removeBlog,
  commentBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)