"use client"

<<<<<<< HEAD
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
=======
import { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css'; // Make sure this CSS import is present and active

// Ensure getCenter is imported if you're using it in useEffect
import getCenter from "geolib/es/getCenter";

// This helper function must be defined outside the component for accessibility and performance
const areCoordinatesRoughlyEqual = (loc1, loc2, tolerance = 0.000001) => {
  if (!loc1 || !loc2) return false;
  return Math.abs(loc1.lat - loc2.lat) < tolerance &&
         Math.abs(loc1.long - loc2.long) < tolerance;
};

function MyMap({ searchResults, className }) {
  const [viewState, setViewState] = useState({
    latitude: 51.494720,
    longitude: -0.12571990,
    zoom: 11,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  // --- DEBUGGING LOG: Monitor selectedLocation changes ---
  useEffect(() => {
    console.log("selectedLocation changed to:", selectedLocation);
  }, [selectedLocation]);
  // --- END DEBUGGING LOG ---

  // Optional: Center map on search results
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long,
      }));
      const center = getCenter(coordinates);
      if (center) {
        setViewState(prev => ({
          ...prev,
          latitude: center.latitude,
          longitude: center.longitude,
        }));
      }
    }
  }, [searchResults]);
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86

  return (
    <ReactMapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
<<<<<<< HEAD
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
=======
      mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3" // Using a standard style for troubleshooting
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      // Add height to ReactMapGL or ensure parent div has it via CSS
      //style={{ width: '100%', height: '100vh' }} // Example of setting height directly
      className={className} 
    >
      {searchResults.map((result) => (
        // Key for the wrapper div around Marker and Popup
        <div key={`location-${result.long}-${result.lat}`}>
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86
          <Marker
            key={`marker-${result.long}-${result.lat}`}
            latitude={result.lat}
<<<<<<< HEAD
            // These offsets help center the pin icon correctly
=======
            longitude={result.long}
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86
            offsetLeft={-20}
            offsetTop={-30}
          >
<<<<<<< HEAD
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
=======
            <button
              onClick={() => {
                console.log("--- MARKER CLICKED ---");
                console.log("Clicked Result to set (full object):", result);
                setSelectedLocation(result);
                // Optionally, fly to the selected location
                setViewState(prev => ({
                  ...prev,
                  latitude: result.lat,
                  longitude: result.long,
                  zoom: 13,
                }));
              }}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label={`Show details for ${result.title}`}
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              📌
            </button>
          </Marker>

          {/* Conditional rendering for the Popup */}
          {(() => { // Using an IIFE to contain the logic and console.log
            const isCurrentlySelected = selectedLocation && areCoordinatesRoughlyEqual(selectedLocation, result);

            // --- CRITICAL DEBUG LOG ---
            if (selectedLocation) { // Only log if something is selected to avoid console spam
              console.groupCollapsed(`Popup Check for: ${result.title}`);
              console.log("selectedLocation (current state):", selectedLocation);
              console.log("result (current loop item):", result);
              console.log(`  Selected Lat: ${selectedLocation.lat}, Long: ${selectedLocation.long}`);
              console.log(`  Current Loop Lat: ${result.lat}, Long: ${result.long}`);
              console.log(`  Abs Diff Lat: ${Math.abs(selectedLocation.lat - result.lat)}`);
              console.log(`  Abs Diff Long: ${Math.abs(selectedLocation.long - result.long)}`);
              console.log(`  Using tolerance: ${0.000001}`);
              console.log(`  ARE COORDS EQUAL (Helper Function Result): ${isCurrentlySelected}`); // This is the boolean result
              console.groupEnd();
            }
            // --- END CRITICAL DEBUG LOG ---

            return isCurrentlySelected ? (
              <Popup
                key={`popup-${result.long}-${result.lat}`} // Unique key for the Popup
                latitude={result.lat}
                longitude={result.long}
                anchor="bottom"
                onClose={() => {
                  console.log("--- POPUP ONCLOSE TRIGGERED ---"); // Log when it closes
                  setSelectedLocation(null);
                  setViewState(prev => ({ ...prev, zoom: 11 })); // Zoom out when closed
                }}
                closeOnClick={false}
                style={{
                  zIndex: 9999, // High z-index to ensure visibility
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #ddd',
                }}
              >
                <div style={{ maxWidth: '250px', color: 'black' }}> {/* Ensure text color is black */}
                  {result.img && (
                    <img
                      src={result.img}
                      alt={result.title}
                      style={{
                        width: '100%',
                        maxHeight: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0',
                        marginBottom: '8px',
                      }}
                    />
                  )}
                  <div style={{ padding: '8px' }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2em', fontWeight: 'bold' }}>
                      {result.title}
                    </h3>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: '#666' }}>
                      {result.location}
                    </p>
                    <p style={{ margin: '0', fontSize: '1em', fontWeight: 'bold', color: '#007bff' }}>
                      {result.price}
                    </p>
                  </div>
                </div>
              </Popup>
            ) : (
              false // Render nothing if not selected
            );
          })()}
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86
        </div>
      ))}
    </ReactMapGL>
  );
}

<<<<<<< HEAD
export default MyMap;
=======
export default MyMap;

/*
 <Marker longitude={0.1278} latitude={51.5074} key="test-static-marker"> 
       <div>📍</div> 
    </Marker> 
*/

/*mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3*/ 
/*mapbox://styles/mapbox/streets-v11*/ //standard styles
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86
