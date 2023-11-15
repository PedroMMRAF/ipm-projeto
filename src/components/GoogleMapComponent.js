// components/GoogleMap.js
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh',
};
const darkMapStyles = [{
  "stylers": [{
      "hue": "#ff1a00"
  }, {
      "invert_lightness": true
  }, {
      "saturation": -100
  }, {
      "lightness": 33
  }, {
      "gamma": 0.5
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
      "color": "#2D333C"
  }]},{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "visibility": 'off',
    }]
  
}]

export default function GoogleMapComponent({ center, children }) {
  return (
    <LoadScript googleMapsApiKey="***REMOVED***">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: center[0],
          lng: center[1],
        }}
        zoom={11}
        options={{
          styles: darkMapStyles,
        }}
       
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};
