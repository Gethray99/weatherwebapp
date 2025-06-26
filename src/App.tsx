import { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import MapView from "./MapView";
import { ClipLoader } from 'react-spinners';

function App() {
  const [weather, setWeather] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState({ lat: 6.9271, lng: 79.8612 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    setLoading(true);
    setError(null);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchTerm || "Colombo"}`)
      .then(res => {
        if (!res.ok){
          throw new Error('Network response was not ok');
          setLoading(false);
        }
        return res.json();
      })
      .then(data => {
        setWeather({
          icon: `https:${data.current.condition.icon}`,
          condition: data.current.condition.text,
          location: data.location.name,
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          uv: data.current.uv
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data. Please Check your location and Try again.");
        setLoading(false);
      });
  }, [location]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const geoApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${geoApiKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const coords = data.results[0].geometry.location;
          setLocation({ lat: coords.lat, lng: coords.lng });
        } else {
          alert("Location not found.");
        }
      });
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div style={{ position: 'relative' }}>
        <MapView location={location} />
        <div style={{ position: 'absolute', top: 100, left: 50 }}>
          {loading && <ClipLoader color="#ffffff" size={50} loading={loading} />}
          {error && <div className="error">{error}</div>}
          {weather && !loading && !error && <WeatherCard weather={weather} />}
        </div>
      </div>
    </>
  );
}

export default App;