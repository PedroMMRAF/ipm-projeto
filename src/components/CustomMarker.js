import { Marker } from '@react-google-maps/api';

const CustomMarker = ({ color, position, onClick }) => {
    const markerOptions = {
        position: {
            lat: position[0],
            lng: position[1]
        },
        icon: {
            path:
                'M256 0C132.3 0 32 100.3 32 224c0 168.5 224 480 224 480s224-311.5 224-480C480 100.3 379.7 0 256 0zm0 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z',
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 0.04,
        },
        onClick: onClick,
    };

    return <Marker {...markerOptions} />;
};

export default CustomMarker;