import Image from "next/image";
import Header from "../../components/Header";
import Banner from "../../components/Banner"
import SmallCard from "../../components/SmallCard";
import MediumCard from "../../components/MediumCard";
import LargeCard from "../../components/LargeCard";
import Footer from "../../components/Footer";
import { exploreData as localExploreData, cardsData as localCardsData } from '../../public/data/exploreData';
// async function getData() {
//   const res = await fetch("https://www.jsonkeeper.com/b/4G1G");

//   // Handle potential errors
//   if (!res.ok) {
//     throw new Error(`Failed to fetch data: ${res.status}`);
//   }
//   return res.json();
// }

// async function getCardsData() {
//   const res = await fetch("https://www.jsonkeeper.com/b/VHHT");
//   if (!res.ok) {
//     throw new Error(`Failed to fetch cards data: ${res.status}`);
//   }
//   return res.json();
// }

<<<<<<< HEAD
export default function Home() {
  
  const exploreData = localExploreData;
  const cardsData = localCardsData; // Place the new fetch here
=======
export default async function Home() {
 // --- FIX IS HERE: Changed 'const' to 'let' for exploreData ---
  let exploreData = await getData(); // Use 'let' because we'll reassign it later

  const cardsData = await getCardsData(); // Place the new fetch here

  // --- NEW CODE STARTS HERE ---

  // Define your local image paths (assuming they are in public/images/)
  const localImageMap = {
    "https://links.papareact.com/2k3": "/images/CardiffRetro.jpg", // Replace with your actual downloaded image path
    "https://links.papareact.com/40m": "/images/LiverpoolRetro.jpg", // Replace with your actual downloaded image path
    "https://links.papareact.com/1to": "/images/Manchester-city.jpg", // Replace with your actual downloaded image path
    // Add more mappings here if other papareact.com images break
    "https://links.papareact.com/hz2": "/images/AirbnbCheap2.jpg", // <-- ADD THIS NEW ENTRY
    "https://links.papareact.com/qd3": "/images/AirbnbCheap2.jpg", 
  };

  // Transform exploreData to use local paths where applicable
  exploreData = exploreData.map(item => {
    if (localImageMap[item.img]) {
      return { ...item, img: localImageMap[item.img] };
    }
    return item; // Return original item if no replacement is needed
  });

  // --- NEW CODE ENDS HERE ---
>>>>>>> 6e941e266b72d419359927d1db7333c26a584b86
  

  return (
    <div className="">
      {/* Header*/ }
      <Header />
      {/* Banner*/ }
      <Banner />
      {/* Main*/ }
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-6">Explore Nearby</h2>
          {/* Pull data from a server*/ }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData.map((item) => (
            <SmallCard 
            key={item.img} 
            img={item.img} 
            distance={item.distance} 
            location={item.location}/>
            
          ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide p-3 -m-3">
          {cardsData.map(({img, title}) => (
            <MediumCard
            key={img} 
            img={img} 
            title={title}
            
            
            />
            
            
          ))}

          </div>

        
        </section>
        <LargeCard
        // 
        img="/images/Wishlists.webp"
        title="The Greatest Outdoors"
        description="Wishlists curated by Airbnb."
        buttonText="Get inspired"
        
        />
        <Footer/>
      </main>
    </div>
  );
}