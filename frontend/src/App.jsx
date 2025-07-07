import { useState } from 'react'
import { useEffect } from 'react';
import reactLogo from './assets/react.svg'
import { Button } from "../components/ui/button"; // 
import { Input } from "../components/ui/input"
import axios from 'axios';

import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
    try {
      const apikey = "72a7a2b3e419a1aac00f6ff1441200a3";
      const response = await axios.get(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );

      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

   const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (weatherData) {
      const weather = weatherData.weather[0].main.toLowerCase();

      if (weather.includes("rain")) {
        document.body.style.backgroundImage = "url('/animation/weather1.gif')";
      } else if (weather.includes("cloud")) {
        document.body.style.backgroundImage = "url('/animation/weather2.gif')";
      } else if (weather.includes("clear")) {
        document.body.style.backgroundImage = "url('/animation/weather1.gif')";
      } else {
        document.body.style.backgroundImage = "url('/animation/weather1.gif')";
      }

      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    }
  }, [weatherData]);


  return (
    <>
    <div id='maindiv'>
    <h1>Weather App</h1>

     
    <form id='form' onSubmit={handleSubmit}>
      
        <Input
          id='city'
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <Button variant="outline" >Button</Button>
      </form>

<div id='details'>
      {weatherData ? (
        < >
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].main}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}hPa</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
    </div>
    </>
  )
}

export default App
