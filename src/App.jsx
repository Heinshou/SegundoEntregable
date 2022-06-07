import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [obj, setObj] = useState()
  const [weather, setWeather] = useState()
  const [grades, setgrades] = useState(true)

  let lon, lat 
  
  useEffect(() => { 
    
      const sucess = pos => {
        console.log(pos.coords)
        lon = pos.coords.longitude
        lat = pos.coords.latitude
        setObj({lon,lat})
      }
  
      navigator.geolocation.getCurrentPosition(sucess)
    
  
  }, [])
  
 
  const API_key ='2b8bfd41f4f34bda243708cdc4007a75'

  useEffect(() => {
    if(obj !== undefined) {
      const url = (`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}`)
    
      axios.get(url)
      .then(res => setWeather(res.data))
      .catch(err => console.log(err))
    }
  }, [obj])

  let celsius = weather?.main?.temp - 273.15;
  let celsiusGrade = celsius.toFixed(2);
  let fahrenheit = celsius * 1.8 + 32;
  let fahrenheitGrade = fahrenheit.toFixed(2);

const changeTemperature = () => setgrades(!grades)

  return (
    <div className="App">
      <div className='conteiner'>
          <h2>{`${weather?.name}, `}{`${weather?.sys.country}`}</h2>
          <img src={weather && `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="" />
          <h3 className='titleTemp'>{`${weather?.weather[0].main}`}</h3>
          <h3 className='actualTemp'>{grades ? `${celsiusGrade}°` : `${fahrenheitGrade}°`}</h3>
          <ul className='temp'> 
            <li><b>Temperatura Maxima: </b>{`${weather?.main.temp_max}°`}</li>
            <li><b>Temperatura Minima: </b>{`${weather?.main.temp_min}°`}</li>
            <li><b>Sensacion Termica: </b>{`${weather?.main.feels_like}°`}</li>
          </ul>
          <ul className='wind'>
            <li><b>Rafagas de viento: </b>{`${weather?.wind.gust}M/S`}</li>
            <li><b>Velocidad: </b>{`${weather?.wind.speed}M/S`}</li>
            <li><b>Humedad: </b>{`${weather?.main.humidity}%`}</li>
          </ul>
          <button onClick={changeTemperature}>Change</button>
        </div>
    </div>
  )
}

export default App
