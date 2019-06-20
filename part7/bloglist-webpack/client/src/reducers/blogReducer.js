import blogService from '../services/blogs'

const byVotes = (b1, b2) => b2.votes - b1.votes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    return state
      .map(a => a.id !== action.data.id ? a : action.data)
      .sort(byVotes)
  case 'ADD':
    return state
      .concat(action.data).sort(byVotes)
  case 'REMOVE':
    return state
      .filter(a => a.id !== action.data.id)
      .sort(byVotes)
  case 'INITIALIZE':
    return action.data.sort(byVotes)
  case 'COMMENT':
    return state
      .map(a => a.id !== action.data.id ? a : action.data)
  default:
    return state
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const blog = {
      title,
      author,
      url,
      likes: 0
    }
    const newBlog = await blogService.create(blog)
    dispatch({
      data: newBlog,
      type: 'ADD'
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      data,
      type: 'INITIALIZE'
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(liked)
    dispatch({
      data,
      type: 'LIKE'
    })
  }
}

export const commentBlog = (blog, value) => {
  return async (dispatch) => {
    const comment = { content: value }
    const addedComment = await blogService.comment(blog.id, comment)
    const commentedBlog = { ...blog, comments: blog.comments.concat(addedComment) }
    dispatch({
      data: commentedBlog,
      type: 'COMMENT'
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch({
      data: blog,
      type: 'REMOVE'
    })
  }
}

export default reducer