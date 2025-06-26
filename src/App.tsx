import { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import MapView from "./MapView";
import { PuffLoader } from 'react-spinners';

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
          //throw new Error('Network response was not ok');
          alert("Failed to fetch weather data. Please Check your location and Try again.");
          setLoading(false);
        }
        return res.json();
      })
      .then(data => {
        setWeather({
          icon: `https:${data.current.condition.icon}`,
          condition: data.current.condition.text,
          location: data.location.name,
          country: data.location.country,
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          uv: data.current.uv,
          cloud_percentage: data.current.cloud,
          percenption_amount_mm: data.current.precip_mm
        });
        setLoading(false);
      });
  }, [location]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const geoApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${geoApiKey}`)
      .then(res => {
        if (!res.ok){
          alert("Failed to fetch location data. Please Check your internet connection and Try again.");
        }
        return res.json();
      })
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
          {loading && (
                      <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <PuffLoader color="black" size={150} />
                      </div>
                    )}
          {weather && !loading && <WeatherCard weather={weather} />}
        </div>
      </div>
    </>
  );
}

export default App;