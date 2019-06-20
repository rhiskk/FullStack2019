import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'INITLOGIN':
    return action.data
  default:
    return state
  }
}

export const login = (username, password) => {
  return async(dispatch) => {
    const user = await loginService.login(username, password)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      data: user,
      type: 'LOGIN'
    })
  }
}

export const logout = () => {
  blogService.destroyToken()
  window.localStorage.removeItem('loggedBlogAppUser')
  return { type: 'LOGOUT' }
}

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await blogService.setToken(user.token)
      dispatch({
        data: user,
        type: 'INITLOGIN'
      })
    }
  }
}

export default reducer