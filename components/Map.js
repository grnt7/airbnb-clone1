//"use client"

import { useState, useEffect } from 'react';
import { Map, Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import getCenter from "geolib/es/getCenter";

function MyMap({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 51.5074, // Default: London
    longitude: 0.1278,
    zoom: 11,
  });

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const validCoordinates = searchResults
        .map(result => ({ longitude: result.long, latitude: result.lat }))
        .filter(coord => Number.isFinite(coord.longitude) && Number.isFinite(coord.latitude));

      if (validCoordinates.length > 0) {
        const center = getCenter(validCoordinates);
        console.log("Calculated Center:", center);
        if (center) {
          setViewport(prev => ({ ...prev, latitude: center.latitude, longitude: center.longitude }));
        }
      } else {
        console.warn("No valid coordinates to calculate center.");
      }
    } else {
      console.log("searchResults is empty or undefined. Using default.");
    }
  }, [searchResults]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
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
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >📌</p>
            </Marker>
            {selectedLocation.long === result.long ? (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
              >
                {result.title}
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}

export default MyMap;



