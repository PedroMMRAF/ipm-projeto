// components/GoogleMap.js
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "80vh",
};
const darkMapStyles = [
    {
        stylers: [
            { hue: "#ff1a00" },
            { invert_lightness: true },
            { saturation: -100 },
            { lightness: 33 },
            { gamma: 0.5 },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#2D333C" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
    },
];

export default function GoogleMapComponent({ center, children }) {
    return (
        <LoadScript googleMapsApiKey="AIzaSyB4Oq6hw7A6vrVcOT3ZVP8u9-qrLe5ijr0">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                options={{
                    styles: darkMapStyles,
                }}
            >
                {children}
            </GoogleMap>
        </LoadScript>
    );
}
