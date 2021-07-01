import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('books-user-token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (<button onClick={() => setPage('add')}>add book</button>)}
        {token && (<button onClick={() => setPage('recommend')}>recommend</button>)}
        {!token && (<button onClick={() => setPage('login')}>login</button>)}
        {token && (<button onClick={() => logout()}>logout</button>)}
      </div>

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} token={token}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken}
      />

    </div>
  )
}

export default App