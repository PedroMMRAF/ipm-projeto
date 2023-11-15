import MyNavbar from '@/components/Navbar';
import React, { useEffect } from 'react';
import "@/styles/markers.css";
import { Helmet } from 'react-helmet';

export default function NearYouPage() {
  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAVT4hH0OY8KGFVmzo1Vo9WGN7mkjGaRYk&callback=console.debug&libraries=maps,marker&v=beta";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div>

     <Helmet>{'HTML'}</Helmet>

     
    </div>
  );
}
function write() { console.log("YO"); }
function HTML() {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body {...bodyAttrs}>

        <div id="content">
          <MyNavbar />
          <gmp-map center="38.66004943847656,-9.203119277954102" zoom="14" map-id="DEMO_MAP_ID">
            <gmp-advanced-marker onClick={write} position="38.66004943847656,-9.203119277954102" title="My location"></gmp-advanced-marker>
            <gmp-advanced-marker position="38.679087, -9.162256" title="Movie1"></gmp-advanced-marker>
            <gmp-advanced-marker className="custom-marker blue-marker" glyphColor='rgb(0 0 255)' position="38.705354, -9.213408" title="Custom Marker"></gmp-advanced-marker>
          </gmp-map>
                  // React stuff here
        </div>
      </body>
    </html>
  );
}
