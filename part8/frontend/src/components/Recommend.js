import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
    const userQuery = useQuery(ME)
    const booksQuery = useQuery(ALL_BOOKS)

    if (!props.show || !props.token) {
        return null
    }

    if (booksQuery.loading || userQuery.loading) {
        return <div>loading...</div>
    }

    const favoriteGenre = userQuery.data?.me?.favoriteGenre
    const books = booksQuery.data.allBooks.filter(b => b.genres.includes(favoriteGenre))

    return (
        <div>
            <h1>recommendations</h1>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
                    {books.map(b =>
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend