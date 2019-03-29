import React from 'react'

const PersonForm = ({ addPerson, newName, newNumber, handleName, handleNumber }) => {
    return (
        <form onSubmit={addPerson}>
        <div> 
          <h3>lisää uusi</h3>
          nimi: <input 
          value={newName}
          onChange={handleName}
          />
        </div>
        <div>
          numero: <input
          value={newNumber}
          onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm