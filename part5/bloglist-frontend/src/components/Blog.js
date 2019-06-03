import React, { useState } from 'react'

const Blog = ({ blog, user, like, removeBlog }) => {
  const [info, setInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = () => {
    if (blog.user.username === user.username) {
      return (
        <button onClick={() => removeBlog(blog)}>
      remove
        </button>
      )}
  }

  const showInfo = () => {
    if (info === true) {
      return (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br/>
          {blog.likes}
          <button onClick={() => like(blog)}>
        like
          </button>
          <br/>
        added by {blog.user.username}
          <br/>
          {showRemove()}
        </div>
      )}
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setInfo(!info)}>
        {blog.title} {blog.author}
      </div>
      {showInfo()}
    </div>
  )}

export default Blog