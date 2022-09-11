import axios from "axios";
import { useState, useEffect } from "react";

const App = () =>{
  const [countries, setCountries] = useState([])
  const [search, setNewSearch] = useState('')
  const [filtered, setFilter] = useState([])
  const [capitalWeather, setWeather] = useState({})

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        setCountries(response.data)
        setFilter(response.data)
      })
  },[])

  return (
    <div>
      <h2>Countries</h2>
      <Filter search={search} setNewSearch={setNewSearch} setFilter={setFilter} countries={countries}/>
      <ListCountries 
        countries={countries} 
        search={search} 
        filtered={filtered} 
        setFilter={setFilter} 
        capitalWeather={capitalWeather} 
        setWeather={setWeather}
      />
    </div>
  );
}

//components

const Filter = ({search, setNewSearch, setFilter, countries}) => {
  const handleChange = (e) => {
    setNewSearch(e.target.value)
    setFilter(
      countries.filter(
        country=>country.name.common.toLowerCase()
        .includes(e.target.value.toLowerCase())
      )
    )
  }

  return(
    <>
      find countries <input value={search} onChange={handleChange}/>
    </>
  )
}

//display list of countries

const ListCountries = ({filtered, setFilter, setWeather, capitalWeather}) => {

  if(filtered.length===1){
    return(<CountryInfo country={filtered[0]} capitalWeather={capitalWeather} setWeather={setWeather}/>)
  }
  else if(filtered.length<=10){
    return(
      filtered.map(country=>{
        return(
          <div key={country.name.common.concat(country.capital)}>
            <p>
              {country.name.common} <button 
                onClick={()=>{
                  setFilter([country])
                }}>
                show</button>
            </p>
          </div>
        )
      })
    )
  }
  
  return(
    <p>Too many matches, specify another filter</p>
  )
}


//display single country info
const CountryInfo = ({country, setWeather, capitalWeather}) => {
  
  const languages = []
  const name = country.name.common
  const capital = country.capital

  for(let key in country.languages){
    languages.push(country.languages[key])
  }

  return(
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map(lan=><li key={lan}>{lan}</li>)}
      </ul>
      <img src={country.flags.svg} alt={"Flag of "+name} style={{maxWidth: "10rem"}}/>
      <Weather country={country} capitalWeather={capitalWeather} setWeather={setWeather}/>
    </div>
  )
}

const Weather = ({country, capitalWeather, setWeather}) => {

  const [dataReceived, setDataReceived] = useState(false)

  const capitalLat = country.capitalInfo.latlng[0]
  const capitalLng = country.capitalInfo.latlng[1]

  useEffect(()=>{
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLng}&appid=${process.env.REACT_APP_WEATHER}&units=metric`)
      .then(response=>{
        setWeather(response.data)
        setDataReceived(true)
      })
  },[])
  
  if(dataReceived){
    return(
      <div>
        <h3>{`Weather in ${country.capital}`}</h3>
        <p>{`temperature ${capitalWeather.main.temp} Celcius`}</p>
        <p>{`wind ${capitalWeather.wind.speed} m/s`}</p>
      </div>
    )
  }
}

export default App;
