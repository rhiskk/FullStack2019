import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const personsToShow = filter
    ? persons.filter (person => person.name.toUpperCase().includes(filter.toUpperCase()))
    : persons

  const addPerson = (event) => {
      event.preventDefault();
      if(persons.find(person => person.name === newName)) {
        if(window.confirm(newName + ' on jo luettelossa, korvataantko vanha numero uudella?')) {
          const updated = persons.find(person => person.name === newName)
          const id = updated.id
          const newObject = {
            name: newName,
            number: newNumber
          }
          contactService
            .update(id, newObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== id ? person : response.data))

              setMessage(
                `muutettiin henkilön ${newName} numeroa`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)

              setNewName("")
              setNewNumber("")
            })
        }
      } else {

      const personObject = {
          name: newName,
          number: newNumber
      }
      
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))

          setMessage(
            `Lisättiin ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setNewName("")
          setNewNumber("")
        })
      }
      }

  const removePerson = (event) => {
    const removedId = (event.target.value)
    const removed = persons.find(person => person.id == removedId);

    if (window.confirm(`poistetaanko ${removed.name}`)) {
      let filtered = persons.filter(person => person.id != removedId)
      contactService
        .remove(removedId)
        .then(setPersons(filtered))

        .catch(error => {
          setErrorMessage(
            `${removed.name} oli jo poistettu`
          )
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        })

        setMessage(
          `Poistettiin ${removed.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={message} errorMessage={errorMessage} />

        <Filter
          filter={filter}
          handleFilter={handleFilter}
        />

        <PersonForm
            addPerson={addPerson}
            newName={newName}
            newNumber={newNumber}
            handleName={handleName}
            handleNumber={handleNumber}
        />

      <h3>Numerot</h3>

      <Persons
          show={personsToShow}
          remove={removePerson}
      />
    </div>
  )
}

export default App