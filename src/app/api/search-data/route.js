// export async function GET() {
//     try {
//       const response = await fetch("https://www.jsonkeeper.com/b/5NPS");
//       if (!response.ok) {
//         return new Response(null, { status: response.status, statusText: response.statusText });
//       }
//       const data = await response.json();
//       return new Response(JSON.stringify(data), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching from jsonkeeper:", error);
//       return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   }

import { dynamicContent } from '../../data/staticContent.js';

// This Route Handler now serves local, reliable data.
export async function GET() {
    try {
      // Instead of calling fetch(), we return the imported data array.
      return new Response(JSON.stringify(dynamicContent), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Optional: Add caching headers since this is static data
          'Cache-Control': 'public, max-age=3600, must-revalidate'
        },
      });

    } catch (error) {
      console.error("Error serving local data:", error);
      return new Response(JSON.stringify({ error: "Failed to serve content" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
}