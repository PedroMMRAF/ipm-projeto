// components/GoogleMap.js
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import config from "@/const/config.json";

const containerStyle = {
    width: "100%",
    height: "100%",
};

/** @type {require("@react-google-maps/api").MapTypeStyle}*/
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
        stylers: [
            { visibility: "off" }, // Turn off road features
        ],
    },
    {
        featureType: "poi",
        stylers: [
            { visibility: "off" }, // Turn off points of interest
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            { visibility: "off" }, // Turn off administrative boundaries
        ],
    },
];

export default function GoogleMapComponent({ center, children, ...props }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: config.googleMapsApiKey,
        libraries: ["geometry", "drawing"],
    });

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                    options={{
                        styles: darkMapStyles,
                    }}
                    {...props}
                >
                    {children}
                </GoogleMap>
            )}
        </>
    );
}

