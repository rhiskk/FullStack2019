const defaultMessage = 'hello world!'

const notificationReducer = (state = defaultMessage, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'CLEAR_NOTIFICATION':
        return action.data
      default:
        return state
    }
  }

  export const setNotification = (notification, duration) => {
    return async dispatch => {
       await dispatch({ 
        type: "SET_NOTIFICATION", 
        notification 
      })
       setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
          data: null
        })
      }, duration);
    }
  }
  
  export default notificationReducer