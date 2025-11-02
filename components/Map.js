// "use client"

// import { useState, useEffect } from 'react';
// //import { Map, Marker, Popup } from 'react-map-gl/mapbox';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
// import 'mapbox-gl/dist/mapbox-gl.css'; // Make sure you have this for styles
// //import 'react-map-gl/dist/esm/mapbox-gl'; // Import CSS separately (if needed)



// function MyMap({ searchResults }) {
//   const [viewport, setViewport] = useState({
//     latitude: 51.494720, // Default: London
//     longitude:  -0.12571990,
//     zoom: 11,
//   });

//   const [selectedLocation, setSelectedLocation] = useState({});

//   return (
//     <ReactMapGL
//       mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
//       mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
//       {...viewport}
//       onViewportChange={(nextViewport) => setViewport(nextViewport)}
//     >
//       <Marker longitude={0.1278} latitude={51.5074} key="test-static-marker">
//         <div>📍</div>
//       </Marker>
//       {searchResults.map((result) => (
//         <div key={result.long}>
//           <Marker
//             longitude={result.long}
//             latitude={result.lat}
//             offsetLeft={-20}
//             offsetTop={-10}
//           >
//             <p
//              role="img"
//              onClick={() => {
//                console.log("Clicked Result:", result); // <--- HERE
//                setSelectedLocation(result);
//              }}
//              className="cursor-pointer text-2xl animate-bounce"
//              aria-label="push-pin"
//             >📌</p>
//           </Marker>
// {/*#TODO POPup functionality not working?????????*/}
//           {/*The popup should show if we click on a marker*/}
//           {console.log("Comparing:", selectedLocation?.long, "with", result.long)}
//     {/* The Popup should show if we click on a marker */}
//     {selectedLocation && selectedLocation.long === result.long && (
//       <Popup
//         key={`popup-${result.long}`}
//         latitude={result.lat}
//         longitude={result.long}
//         anchor="bottom"
//         onClose={() => setSelectedLocation(null)}
//         closeOnClick={true}
//       >
//         {result.title}
//       </Popup>
//     )}
//   </div>
// ))}
//     </ReactMapGL>
//   );
// }

// export default MyMap;


// "use client"

// import { useState } from 'react';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Image from 'next/image'; 

// // Note: Ensure your environment variable NEXT_PUBLIC_mapbox_key is set.

// function MyMap({ searchResults }) {
  
//   // --- Data Sanitization and Conversion ---
//   const parsedResults = searchResults.map(result => ({
//     ...result,
//     // Use parseFloat to convert coordinates from string to number
//     lat: parseFloat(result.lat), 
//     long: parseFloat(result.long), 
//   }));
  
//   // Filter out any entries where the parsing failed (resulted in NaN/Infinity).
//   const validResults = parsedResults.filter(
//     (result) => 
//       isFinite(result.lat) && // Checks if it's a number and not NaN/Infinity
//       isFinite(result.long)
//   );

//   // Debugging: Total Markers to Render
//   console.log("Map Debug: Total Markers to Render:", validResults.length); 

//   // 1. Calculate the center of all locations for the initial viewport
//   const coordinates = validResults.map((result) => ({
//     longitude: result.long,
//     latitude: result.lat,
//   }));

//   // Fallback to London coordinates if no valid results exist
//   const initialLatitude =
//     coordinates.length > 0
//       ? coordinates.reduce((sum, curr) => sum + curr.latitude, 0) / coordinates.length
//       : 51.49472;
  
//   const initialLongitude =
//     coordinates.length > 0
//       ? coordinates.reduce((sum, curr) => sum + curr.longitude, 0) / coordinates.length
//       : -0.1257199;

//   const [viewport, setViewport] = useState({
//     latitude: initialLatitude, 
//     longitude: initialLongitude,
//     zoom: 11,
//   });

//   const [selectedLocation, setSelectedLocation] = useState(null);

//   return (
//     // FIX: Replaced h-full with a fixed viewport height (h-[60vh]) 
//     // to guarantee the map component has a visible size.
//     <div className="z-0 h-screen"> 
//         <ReactMapGL
//           mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
//           mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
//           {...viewport}
//           onMove={(e) => setViewport(e.viewState)}
//           // Ensure map component takes 100% of the guaranteed parent height
//           style={{ width: '100%', height: '100%' }} 
//         >
          
//           {/* Render Markers and Popups only if valid data exists */}
//           {validResults.map((result) => (
//             <div key={result.title + result.long}>
              
//               {/* Marker Component */}
//               <Marker
//                 longitude={result.long}
//                 latitude={result.lat}
//                 offsetLeft={-20}
//                 offsetTop={-10}
//               >
//                 <p
//                   role="img"
//                   onClick={() => {
//                     setSelectedLocation(result);
//                   }}
//                   className="cursor-pointer text-2xl animate-bounce"
//                   aria-label="push-pin"
//                 >
//                   📌
//                 </p>
//               </Marker>

//               {/* Popup Component */}
//               {selectedLocation && selectedLocation.title === result.title ? (
//                 <Popup
//                   key={`popup-${result.title}`}
//                   latitude={result.lat}
//                   longitude={result.long}
//                   anchor="bottom"
//                   onClose={() => setSelectedLocation(null)}
//                   closeOnClick={false} 
//                 >
//                   {/* Popup Content */}
//                   <div className="text-black p-1 space-y-2">
                    
//                     {/* Image Display */}
//                     <div className="relative w-full h-16">
//                       <Image
//                         src={result.img} 
//                         alt={result.title}
//                         fill
//                         className="object-cover rounded-t-lg"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       />
//                     </div>
                    
//                     {/* Text Content */}
//                     <p className="font-semibold text-sm pt-2">{result.title}</p>
//                     <p className="text-xs text-gray-500">{result.description}</p>
//                   </div>
//                 </Popup>
//               ) : (
//                 false
//               )}
//             </div>
//           ))}
//         </ReactMapGL>
//     </div>
//   );
// }

// export default MyMap;

"use client"

import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image'; 

// Note: Ensure your environment variable NEXT_PUBLIC_mapbox_key is set.

function MyMap({ searchResults }) {
  
  // --- DEBUGGING: Display Raw Search Results ---
  // Check what the map component is receiving before processing.
  console.log("DEBUG: Search Results Received:", searchResults.slice(0, 3)); // Log first 3 items

  // --- Data Sanitization and Conversion ---
  const parsedResults = searchResults.map(result => ({
    ...result,
    // Use parseFloat to convert coordinates from string to number
    lat: parseFloat(result.lat), 
    long: parseFloat(result.long), 
  }));
  
  // --- DEBUGGING: Display Parsed Results ---
  // Check the coordinates after parsing (look for NaN)
  console.log("DEBUG: Parsed Coordinates (First 3):", parsedResults.slice(0, 3).map(r => ({ title: r.title, lat: r.lat, long: r.long })));
  

  // FIX: Filter out any entry where the coordinate is not a valid number (NaN/Infinity)
  const validResults = parsedResults.filter(
    (result) => 
      // Check if both properties exist and are finite numbers
      result.lat != null && isFinite(result.lat) &&
      result.long != null && isFinite(result.long)
  );

  // Debugging: Total Markers to Render
  console.log("DEBUG: Total Markers to Render:", validResults.length); 

  // 1. Calculate the center of all locations for the initial viewport
  const coordinates = validResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // Fallback to London coordinates if no valid results exist
  const initialLatitude =
    coordinates.length > 0
      ? coordinates.reduce((sum, curr) => sum + curr.latitude, 0) / coordinates.length
      : 51.49472;
  
  const initialLongitude =
    coordinates.length > 0
      ? coordinates.reduce((sum, curr) => sum + curr.longitude, 0) / coordinates.length
      : -0.1257199;

  const [viewport, setViewport] = useState({
    latitude: initialLatitude, 
    longitude: initialLongitude,
    zoom: 11,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    // FIX: Changed h-[60vh] to h-screen for full viewport height. 
    // Removed min-h-[400px] as h-screen handles minimum height.
    <div className="z-0 h-screen"> 
        <ReactMapGL
          mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
          mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
          {...viewport}
          onMove={(e) => setViewport(e.viewState)}
          // Ensure map component takes 100% of the guaranteed parent height
          style={{ width: '100%', height: '100%' }} 
        >
          
          {/* Render Markers and Popups only if valid data exists */}
          {validResults.map((result) => (
            // FIX: Removed the unnecessary wrapping div. 
            // The Marker component now serves as the keyed element.
            <> 
              {/* Marker Component - Key prop moved here */}
              <Marker
                key={result.title + result.long} 
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <p
                  role="img"
                  onClick={() => {
                    setSelectedLocation(result);
                  }}
                  className="cursor-pointer text-2xl animate-bounce"
                  aria-label="push-pin"
                >
                  📌
                </p>
              </Marker>

              {/* Popup Component */}
              {selectedLocation && selectedLocation.title === result.title ? (
                <Popup
                  // The Popup needs a key too, but it doesn't need to be the main key for the loop.
                  key={`popup-${result.title}`} 
                  latitude={result.lat}
                  longitude={result.long}
                  anchor="bottom"
                  onClose={() => setSelectedLocation(null)}
                  closeOnClick={false} 
                >
                  {/* Popup Content */}
                  <div className="text-black p-1 space-y-2">
                    
                    {/* Image Display */}
                    <div className="relative w-full h-16">
                      <Image
                        src={result.img} 
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
            </>
          ))}
        </ReactMapGL>
    </div>
  );
}

export default MyMap;

// "use client"

// import { useState, useEffect } from 'react';
// //import { Map, Marker, Popup } from 'react-map-gl/mapbox';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl/mapbox';
// import 'mapbox-gl/dist/mapbox-gl.css'; // Make sure you have this for styles
// //import 'react-map-gl/dist/esm/mapbox-gl'; // Import CSS separately (if needed)



// function MyMap({ searchResults }) {
//   const [viewport, setViewport] = useState({
//     latitude: 51.494720, // Default: London
//     longitude:  -0.12571990,
//     zoom: 11,
//   });

//   const [selectedLocation, setSelectedLocation] = useState({});

//   return (
//     <ReactMapGL
//       mapboxAccessToken={process.env.NEXT_PUBLIC_mapbox_key}
//       mapStyle="mapbox://styles/skylabblazar/cm9sj2qo300ba01s01f40d2w3"
//       {...viewport}
//       onViewportChange={(nextViewport) => setViewport(nextViewport)}
//     >
//       <Marker longitude={0.1278} latitude={51.5074} key="test-static-marker">
//         <div>📍</div>
//       </Marker>
//       {searchResults.map((result) => (
//         <div key={result.long}>
//           <Marker
//             longitude={result.long}
//             latitude={result.lat}
//             offsetLeft={-20}
//             offsetTop={-10}
//           >
//             <p
//              role="img"
//              onClick={() => {
//                console.log("Clicked Result:", result); // <--- HERE
//                setSelectedLocation(result);
//              }}
//              className="cursor-pointer text-2xl animate-bounce"
//              aria-label="push-pin"
//             >📌</p>
//           </Marker>
// {/*#TODO POPup functionality not working?????????*/}
//           {/*The popup should show if we click on a marker*/}
//           {console.log("Comparing:", selectedLocation?.long, "with", result.long)}
//     {/* The Popup should show if we click on a marker */}
//     {selectedLocation && selectedLocation.long === result.long && (
//       <Popup
//         key={`popup-${result.long}`}
//         latitude={result.lat}
//         longitude={result.long}
//         anchor="bottom"
//         onClose={() => setSelectedLocation(null)}
//         closeOnClick={true}
//       >
//         {result.title}
//       </Popup>
//     )}
//   </div>
// ))}
//     </ReactMapGL>
//   );
// }

// export default MyMap;

