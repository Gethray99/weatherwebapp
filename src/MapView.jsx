import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
  position: 'relative',
  borderRadius: '0',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  marginTop: '0'
};

const center = {
  lat: 6.9271,
  lng: 79.8612
};

function MapView() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log("✅ Loaded API Key:", apiKey);

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      onLoad={() => console.log("✅ Google Maps script loaded")}
      onError={(err) => console.error("❌ Google Maps script failed", err)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;