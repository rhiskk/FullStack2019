import React from 'react'

const Persons = ( {show, remove} ) => {
    return show.map(person =>
        <p key={person.id}>
            {person.name} {person.number} 
            <button
                value={person.id}
                onClick={remove}>
                poista
            </button>
        </p>
        )
    }
  export default Persons