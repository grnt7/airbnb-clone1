export async function GET() {
  try {
    const response = await fetch("https://www.jsonkeeper.com/b/5NPS"); // This is the external JSON source
    if (!response.ok) {
      return new Response(null, { status: response.status, statusText: response.statusText });
    }
    const data = await response.json(); // 'data' now holds your array of accommodation objects

    // --- NEW CODE STARTS HERE to Resolve Broken Image Links---

    // Define your local image paths map within the API route
    const localImageMap = {
      // **IMPORTANT: Update these paths to match your actual downloaded files and their locations in public/images/**
      //"https://links.papareact.com/xqj": "/images/private-room-london.jpg",
      "https://links.papareact.com/hz2": "/images/AirbnbCheap-Room2.jpg", // Your alternative image for hz2
      //"https://links.papareact.com/uz7": "/images/london-studio-apartments.jpg",
      //"https://links.papareact.com/6as": "/images/oxford-street-excel.jpg",
      //"https://links.papareact.com/xhc": "/images/spacious-bedroom.jpg", // You confirmed this loads in browser, so use its downloaded version
      //"https://links.papareact.com/pro": "/images/blue-room-london.jpg",
      //"https://links.papareact.com/8w2": "/images/luxury-apartment.jpg",
      // Add any other papareact.com URLs you encounter from other JSON sources if needed
    };

    // Transform the 'data' array to replace external image URLs with local ones
    const transformedData = data.map(item => {
      if (localImageMap[item.img]) {
        return { ...item, img: localImageMap[item.img] };
      }
      return item; // If no mapping found, return the item as is (e.g., if it's a working external URL)
    });

    // --- NEW CODE ENDS HERE ---

    // Return the transformed data to the client
    return new Response(JSON.stringify(transformedData), { // Use transformedData here
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching from jsonkeeper:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}