import { Marker } from "@react-google-maps/api";

const CustomMarker = ({ color, position, onClick }) => {
    const markerOptions = {};

    return (
        <Marker
            position={position}
            icon={{
                path: "m 0,-704 c -123.70000,0 -224,100.3 -224,224 C -224,-311.5 0,0 0,0 c 0,0 224,-311.5 224,-480 0,-123.7 -100.3,-224 -224,-224 z m 0,320 c -35.3,0 -64,-28.7 -64,-64 0,-35.3 28.7,-64 64,-64 35.3,0 64,28.7 64,64 0,35.3 -28.7,64 -64,64 z",
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 0.045,
            }}
            onClick={onClick}
        />
    );
};

export default CustomMarker;
