import React, { useState } from 'react'
import './WeatherApp.css'


export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'API KEY HERE'
    const difKelvin = 273.15 // restar este numero a grados kilvin para obtener resultado en celsious

    const fetchWeatherData = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error('Ocurrio un error: ',error)
        }
    }

    const handleCityChange = (event) =>{
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(city)
        fetchWeatherData()
    }
    
    return (
        <div className='container'>
            <h1>Weather App in React</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder='Type your city'
                value={city}
                onChange={handleCityChange}    
                />
                <button type='submit'>Search</button>
            </form>

            {weatherData && (
                <div className='weatherDataStyle'>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es de <br /> <span className='grados'>{ Math.floor(weatherData.main.temp - difKelvin) }°C</span></p>
                    <p>La condicion meteorologica actual es:<br /><span className='grados'>{weatherData.weather[0].description}</span></p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                </div>
            )}

        </div>
  )
}
