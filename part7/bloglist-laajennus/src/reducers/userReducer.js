import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITUSERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const data = await userService.getAll()
    dispatch({
      data,
      type: 'INITUSERS'
    })
  }
}

export default reducer