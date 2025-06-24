import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./Header";
import WeatherCard from "./WeatherCard";

function App() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    console.log("API Key:", apiKey);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Colombo`)
      .then(res => res.json())
      .then(data => {
        setWeather({
          icon: `https:${data.current.condition.icon}`,
          condition: data.current.condition.text,
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          uv: data.current.uv
        });
      });
  }, []);

  return (
    <>
      <Header />
      <div style= {{paddingTop: '10px', padding: '16px'}}>
        {weather && <WeatherCard weather={weather} />}
      </div>
    </>
  )
}

export default App
