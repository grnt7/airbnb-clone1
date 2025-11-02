"use client"

import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image'; // Required for displaying images in the popup

// Note: Ensure your environment variable NEXT_PUBLIC_mapbox_key is set.

function MyMap({ searchResults }) {
  // 1. Calculate the center of all locations for the initial viewport
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const initialLatitude =
    coordinates.length > 0
      ? coordinates.reduce((sum, curr) => sum + curr.latitude, 0) / coordinates.length
      : 51.49472; // Default London
  
  const initialLongitude =
    coordinates.length > 0
      ? coordinates.reduce((sum, curr) => sum + curr.longitude, 0) / coordinates.length
      : -0.1257199; // Default London

  const [viewport, setViewport] = useState({
    latitude: initialLatitude, 
    longitude: initialLongitude,
    zoom: 11,
  });

  // State to hold the data of the location currently selected for the popup
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <ReactMapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
      mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
      {...viewport}
      // Handler for map movement (zoom, pan)
      onMove={(e) => setViewport(e.viewState)}
      style={{ width: '100%', height: '100%' }} // Ensure the map takes full container size
    >
      
      {searchResults.map((result) => (
        // The key must be on the direct children of the map component
        <div key={result.title}>
          {/* Marker Component */}
          <Marker
            longitude={result.long}
            latitude={result.lat}
            // These offsets help center the pin icon correctly
            offsetLeft={-20}
            offsetTop={-10}
          >
            {/* The clickable element */}
            <p
              role="img"
              onClick={() => {
                // Set the entire data object as the selected location
                setSelectedLocation(result);
              }}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/* Popup Component */}
          {/* Check if the clicked location (selectedLocation) matches the current item (result) */}
          {selectedLocation && selectedLocation.title === result.title ? (
            <Popup
              // Use title as a stable key for the Popup
              key={`popup-${result.title}`}
              latitude={result.lat}
              longitude={result.long}
              anchor="bottom"
              // When the user closes the popup (e.g., clicks the 'X'), clear the state
              onClose={() => setSelectedLocation(null)}
              closeOnClick={false} // Prevents map clicks from immediately closing the popup
            >
              {/* Popup Content */}
              <div className="text-black p-1 space-y-2">
                
                {/* Image Display */}
                <div className="relative w-full h-24">
                  <Image
                    src={result.img} // Uses the image path from the search result
                    alt={result.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Text Content */}
                <p className="font-semibold text-sm pt-2">{result.title}</p>
                <p className="text-xs text-gray-500">{result.description}</p>
              </div>
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