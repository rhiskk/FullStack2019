import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'
import { useSubscription, useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('books-user-token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const bookDataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(bookDataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : bookDataInStore.allBooks.concat(addedBook) }
      })
    }
    const authorDataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(authorDataInStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorDataInStore.allAuthors.concat(addedBook.author)}
      })
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook.author)
      window.alert(`${addedBook.title} by ${addedBook.author.name} added`)
      updateCacheWith(addedBook)
    }
  })

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
        show={page === 'recommend'} token={token}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken}
      />

    </div>
  )
}

export default App