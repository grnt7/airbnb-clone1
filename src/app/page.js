import Image from "next/image";
import Header from "../../components/Header";
import Banner from "../../components/Banner"
import SmallCard from "../../components/SmallCard";
import MediumCard from "../../components/MediumCard";
import LargeCard from "../../components/LargeCard";
import Footer from "../../components/Footer";
async function getData() {
  const res = await fetch("https://www.jsonkeeper.com/b/4G1G");

  // Handle potential errors
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
  return res.json();
}

async function getCardsData() {
  const res = await fetch("https://www.jsonkeeper.com/b/VHHT");
  if (!res.ok) {
    throw new Error(`Failed to fetch cards data: ${res.status}`);
  }
  return res.json();
}

export default async function Home() {
  const exploreData = await getData();
  const cardsData = await getCardsData(); // Place the new fetch here
  

  return (
    <div className="">
      {/* Header */}
      <Header />
      {/* Banner */}
      <Banner />
      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-6">Explore Nearby</h2>
          {/* Pull data from a server */}
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
        img="https://links.papareact.com/4cj"
        title="The Greatest Outdoors"
        description="Wishlists curated by Airbnb."
        buttonText="Get inspired"
        
        />
        <Footer/>
      </main>
    </div>
  );
}