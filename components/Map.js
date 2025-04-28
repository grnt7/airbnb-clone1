"use client"

import { useState, useEffect } from 'react';
//import { Map, Marker, Popup } from 'react-map-gl/mapbox';
import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css'; // Make sure you have this for styles
//import 'react-map-gl/dist/esm/mapbox-gl'; // Import CSS separately (if needed)

import getCenter from "geolib/es/getCenter";

function MyMap({ searchResults }) {
  const [viewport, setViewport] = useState({
    latitude: 51.494720, // Default: London
    longitude:  -0.12571990,
    zoom: 11,
  });

  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
      mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker longitude={0.1278} latitude={51.5074} key="test-static-marker">
        <div>📍</div>
      </Marker>
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
             role="img"
             onClick={() => {
               console.log("Clicked Result:", result); // <--- HERE
               setSelectedLocation(result);
             }}
             className="cursor-pointer text-2xl animate-bounce"
             aria-label="push-pin"
            >📌</p>
          </Marker>

          {/*The popup should show if we click on a marker*/}
          {selectedLocation?.long === result.long ? ( // Conditionally render Popup
            <Popup
              key={`popup-${result.long}`}
              latitude={result.lat}
              longitude={result.long}
              anchor="bottom" // Adjust anchor as needed
              onClose={() => setSelectedLocation({})} // Clear selectedLocation on close
              closeOnClick={true}
            >
              {result.title} {/* Your popup content */}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default MyMap;

/*

*/

