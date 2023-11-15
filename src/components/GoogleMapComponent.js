// components/GoogleMap.js
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '500px',
};

export default function GoogleMapComponent({ center, children }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB4Oq6hw7A6vrVcOT3ZVP8u9-qrLe5ijr0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: center[0],
          lng: center[1],
        }}
        zoom={10}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};
