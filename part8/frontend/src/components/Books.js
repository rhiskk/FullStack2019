import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [getGenres, genres] = useLazyQuery(ALL_GENRES)

  useEffect(() => {
    setGenre(null)
    getGenres()
  }, [props.show]) // eslint-disable-line

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre } })
    }
    else getBooks()
  }, [genre]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data?.allBooks.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.data.allGenres.map(g =>
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books