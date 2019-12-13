import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const notify = (message, color = 'success') => {
    props.setNotification({ message, color }, 10)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    props.createBlog(title.value, author.value, url.value)
      .then(
        notify(`a new blog ${title.value} by ${author.value} added`),
        titleReset(),
        authorReset(),
        urlReset()
      )
      .catch(error => {
        notify(JSON.stringify(error.response.data), 'error')
      })
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          icon='edit outline'
          iconPosition='left'
          placeholder='title'
          id='title'
          {...title} />

        <Form.Input
          fluid
          icon='male'
          iconPosition='left'
          placeholder='author'
          id='author'
          {...author}
        />
        <Form.Input
          fluid
          icon='bookmark outline'
          iconPosition='left'
          placeholder='url'
          id='url'
          {...url}
        />
        <Button data-cy='create' color="pink" fluid size='large' type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default connect(null, {
  createBlog, setNotification
})(NewBlog)