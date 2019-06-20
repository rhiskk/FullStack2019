import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const BlogList = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 15,
    paddingLeft: 5,
    border: 'solid',
    borderRadius: 7,
    borderWidth: 2,
    marginBottom: 5,
    color: 'hotpink'
  }

  const linkStyle = {
    fontSize: 20,
    color: 'goldenrod'
  }

  return(
    <div>
      {props.blogs.sort(byLikes).map(blog =>
        <List key={blog.id} style={blogStyle}>
          <Link style={linkStyle} to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </List>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}


export default connect(
  mapStateToProps
)(BlogList)