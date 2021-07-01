import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const UpdateAuthor = ( { authors } ) => {
  const [option, setOption] = useState(null)
  const [born, setBorn] = useState('')
  const options = authors.map(a => a = {value: a.name, label: a.name})
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')

    editAuthor({ variables: {name: option.value, setBornTo: Number(born)} })

    setOption(null)
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <Select 
        value={option}
        onChange={setOption}
        options={options}
      />
      <form onSubmit={submit}>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
