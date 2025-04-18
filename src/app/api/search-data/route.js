export async function GET() {
    try {
      const response = await fetch("https://www.jsonkeeper.com/b/5NPS");
      if (!response.ok) {
        return new Response(null, { status: response.status, statusText: response.statusText });
      }
      const data = await response.json();
      return new Response(JSON.stringify(data), {
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