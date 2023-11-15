import MyNavbar from '@/components/Navbar';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import CustomMarker from '@/components/CustomMarker';
import React from 'react';
import { Container } from 'react-bootstrap';


const center = [38.66004943847656, -9.203119277954102];
const marker2 = [38.679087, -9.162256];

export default function NearYouPage() {


  const shrink = () => {

  }

  return (
    <div>
      <MyNavbar />
      <div>
        <GoogleMapComponent center={center}>
          <CustomMarker color="blue" position={marker2} />
        </GoogleMapComponent>
      </div>
    </div>
  );
}
