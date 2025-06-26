function WeatherCard({ weather }) {
  return (
    <div style={styles.card}>
      <img
        src={weather.icon}
        alt="weather icon"
        style={styles.icon}
      />
      <p><strong>{weather.condition}</strong></p>
      <p><strong>📍 Location:</strong> {weather.location}, {weather.country}</p>
      <p>🌡 Temp: {weather.temp}°C</p>
      <p>💧 Humidity: {weather.humidity}%</p>
      <p>🌬 Wind: {weather.wind} km/h</p>
      <p>☀️ UV Index: {weather.uv}</p>
      <p>☁️ Cloud Cover: {weather.cloud_percentage}%</p>
      <p>🌫️ Precipitation amount: {weather.percenption_amount_mm}mm</p>
    </div>
  );
} 

const styles = {
  card: {
    position: 'fixed',
    top: '100px',
    right: '24px',
    width: '280px',
    backgroundColor: 'black',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '16px',
    textAlign: 'center',
    zIndex: 1000
  },
  icon: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
    marginBottom: '8px'
  }
};

export default WeatherCard;