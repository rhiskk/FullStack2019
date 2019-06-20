import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UserList = (props) => {

  return (
    <div>
      <h3>Users</h3>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <td></td>
            <Table.Cell>blogs created</Table.Cell>
          </Table.Row>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.username}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)