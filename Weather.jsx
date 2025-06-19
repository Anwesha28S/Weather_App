import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/searchfinal.png'
import cloudy_icon from '../assets/PartlyCloudy.jpg'
import rain_icon from '../assets/Rain.webp'
import storm_icon from '../assets/ThunderStorm.jpeg'
import clear_icon from '../assets/sun-icon.jpg'
import humidity_icon from '../assets/humidity-ic.jpg'
import wind_icon from '../assets/windy.webp'

const Weather = () => {
  const [weatherData,SetweatherData]=useState(false);
  const [city, setCity] = useState("London");

  const search=async (cityName) => {
    try {
      const url=`https://api.weatherapi.com/v1/current.json?key=4ddba02ab1e34012a7f70446251806&q=${cityName}`
      const response= await fetch(url);
      const data=await response.json();
      console.log(data);
      SetweatherData({
        humidity:data.current.humidity,
        windSpeed:data.current.wind_kph,
        temperature:Math.floor(data.current.temp_c),
        location:data.location.name,
        icon: data.current.condition.icon,
        description: data.current.condition.text
      });
    } catch (error) {
      console.error("API Fetch Error:", error);
    }
  }
  useEffect(()=>{
    search(city)
  },[])
  return (
    <div className='weather'>
        <div className="search-bar">
          <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            search(city);
            }
          }}
          />
          <img src={search_icon} alt="search"  className="searchicon" onClick={() => search(city)}/>
        </div>
        <img src={`https:${weatherData.icon}`}
          alt={weatherData.text}
          className="weather-icon"
        />

        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather