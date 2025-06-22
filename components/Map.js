"use client" // This is important for Next.js to treat it as a client component

import { useState, useEffect, useRef } from 'react'; // Added useRef for potential map instance access
import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css'; // Essential Mapbox GL styles
import getCenter from "geolib/es/getCenter";
// Helper function for robust coordinate comparison
// Moved inside the component or a dedicated utils file if you prefer,
// but for clarity in this single file, let's keep it here.
const areCoordinatesRoughlyEqual = (loc1, loc2, tolerance = 0.000001) => {
  if (!loc1 || !loc2) return false;
  return Math.abs(loc1.lat - loc2.lat) < tolerance &&
         Math.abs(loc1.long - loc2.long) < tolerance;
};

function MyMap({ searchResults }) {
  // State for map viewport (viewState is the more common prop name in ReactMapGL)
  const [viewState, setViewState] = useState({
    latitude: 51.494720, // Default: London (ensure this is a number, not a string)
    longitude: -0.12571990, // Ensure this is a number
    zoom: 11,
  });

  // State to hold the currently selected location for the popup
  // Initialized to null, meaning no location is selected.
  const [selectedLocation, setSelectedLocation] = useState(null);

  // You need to set the map's height using CSS, not directly in viewState.
  // The 'height' prop of ReactMapGL expects a string (e.g., "100vh", "500px").
  // It was in your viewport state, which is unconventional for ReactMapGL's `height` prop.
  // Let's pass it separately or ensure your container div has the height.
  // For this example, let's assume the parent container has height or set it inline for the map.

  // Using a ref to potentially get the map instance for advanced control if needed later
  const mapRef = useRef(null);

  // If you want the map to automatically center on the search results:
  useEffect(() => {
    if (searchResults.length > 0) {
      // getCenter from geolib/es/getCenter needs an array of {latitude, longitude} objects
      const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long,
      }));

      // Only calculate center if there are valid coordinates
      const center = getCenter(coordinates);

      if (center) {
        setViewState(prev => ({
          ...prev,
          latitude: center.latitude,
          longitude: center.longitude,
        }));
      }
    }
  }, [searchResults]); // Recalculate center when searchResults change


  return (
    // Set map height explicitly here or via CSS for the parent div
    <ReactMapGL
      ref={mapRef} // Attach ref if needed
      mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
      mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
      {...viewState} // Spread the viewState
      onMove={evt => setViewState(evt.viewState)} // Correct way to update viewState on user interaction
      // You can also add other props like `style={{ width: '100%', height: '100%' }}`
      // to the ReactMapGL component or ensure its parent container handles height.
      // Assuming a parent div handles 100vh for now.
    >

      {searchResults.map((result) => (
        // Key for the outer div wrapping Marker and Popup for better React reconciliation
        <div key={`location-${result.long}-${result.lat}`}>
          <Marker
            key={`marker-${result.long}-${result.lat}`}
            latitude={result.lat}
            longitude={result.long}
            // offsetLeft/Top are for the marker's visual icon, adjust if your pin image has a different anchor point
            offsetLeft={-20} // Center of a 40px wide icon
            offsetTop={-30} // Bottom of a 60px tall icon (adjust based on your pin icon's actual size)
          >
            {/* Using a button or div for clickability is often better than <p> */}
            <button
              onClick={() => {
                console.log("Clicked Marker Data:", result); // Keep for debugging
                setSelectedLocation(result);
                // Optionally, fly to the selected location
                setViewState(prev => ({
                  ...prev,
                  latitude: result.lat,
                  longitude: result.long,
                  zoom: 13, // Zoom in a bit when selected
                }));
              }}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label={`Show details for ${result.title}`}
              style={{ background: 'none', border: 'none', padding: 0 }} // Remove default button styles
            >
              📌 {/* Your pin icon */}
            </button>
          </Marker>

          
          {selectedLocation && areCoordinatesRoughlyEqual(selectedLocation, result) ? (
  <Popup
    key={`popup-${result.long}-${result.lat}`}
    latitude={result.lat}
    longitude={result.long}
    anchor="bottom"
    onClose={() => setSelectedLocation(null)}
    closeOnClick={true}
    style={{
      zIndex: 9999,
      backgroundColor: 'white', // Clean white background
      padding: '10px',
      borderRadius: '8px', // Rounded corners
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Subtle shadow
      border: '1px solid #ddd', // Light border
    }}
  >
    <div style={{ maxWidth: '250px' }}> {/* Limit popup width */}
      {result.img && (
        <img
          src={result.img}
          alt={result.title}
          style={{
            width: '100%',
            maxHeight: '150px', // Limit image height
            objectFit: 'cover', // Maintain aspect ratio
            borderRadius: '8px 8px 0 0', // Rounded corners on top
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
  false
)}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default MyMap;

/*
 <Marker longitude={0.1278} latitude={51.5074} key="test-static-marker"> 
       <div>📍</div> 
    </Marker> 
*/

