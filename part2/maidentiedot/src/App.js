import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
    const [ countries, setCountries ] = useState([])

    const hook = () => {
        console.log('effect')
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
        })
    }
    useEffect(hook, [])

    const [ filter, setFilter ] = useState('')

    const handleFilter = (event) => {
        setFilter(event.target.value)
      }

    const countriesToShow = filter
        ?countries.filter (country => country.name.toUpperCase().includes(filter.toUpperCase()))
        :countries
    
    const showCountries = () => {
        if(countriesToShow.length > 10 || countriesToShow.length < 0) {
            return <p>Too many matches, specify another filter</p>
        } else if (countriesToShow.length > 1){
            return countriesToShow.map(country =>
                <p key={country.name}>
                    {country.name}
                    <button 
                    value={country.name}
                    onClick={handleFilter}>
                    show
                    </button>
                </p>
                )
        } else {
            return countryInfo()
        }
    }

    const countryInfo = () => {
        
        return countriesToShow.map(country =>
            <div key={country.name}>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h4>languages</h4>
                <ul>
                {
                    country.languages.map(language =>
                            <li key={language.name}>{language.name}</li>
                        )
                }
                </ul>
                <br/>
                <img src={country.flag} width="300" height="200" alt={country.name}></img>
                <h4>Weather in {country.capital}</h4>
            </div>
            )
    }
 
    return (
        <div>
        Find countries: <input
        value={filter}
        onChange={handleFilter}
        />
        {showCountries()}
      </div>
    )
}

export default App

