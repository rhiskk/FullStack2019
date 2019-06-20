import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { login } from '../reducers/loginReducer'
import { Grid, Form, Button, Header, Segment } from 'semantic-ui-react'

const LoginForm = (props) => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')

  const notify = (message, color = 'success') => {
    props.setNotification({ message, color }, 10)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login({
      username: username.value,
      password: password.value
    }).then(() => {
      notify(`${username.value} logged in`)
    }).catch(() => {
      notify('wrong username or password', 'error')
    })
    passwordReset()
    usernameReset()
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <div>
          <Header as='h2' color='pink' textAlign='center'>
            Login to application
          </Header>

          <Notification />
          <Form size='large' onSubmit={handleLogin} >
            <Segment color="pink" >
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
                {...username} />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                {...password}
              />

              <Button color='pink' fluid size='large' type="submit">Login</Button>
            </Segment>
          </Form>
        </div>
      </Grid.Column>
    </Grid>
  )
}
export default connect(null, {
  login, setNotification
})(LoginForm)
