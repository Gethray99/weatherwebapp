import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function MapView({ location }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={13}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;