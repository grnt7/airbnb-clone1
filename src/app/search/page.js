// pages/search.js
"use client";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
function SearchParamsDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  return <p>Query: {query || 'No query'}</p>;
}

export default function Search() {
  return (
    <div>
      <h1>Minimal Search Page</h1>
      <Suspense fallback={<p>Loading query...</p>}>
        <SearchParamsDisplay />
      </Suspense>
    </div>
  );
}

/*
import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { format } from "date-fns";
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component for optimized images
import InfoCard from '../../../components/InfoCard';
import { Suspense } from 'react';
import MyMap from '../../../components/Map';

async function getData() {
  const res = await fetch("/api/search-data");
  if (!res.ok) {
    throw new Error(`Failed to fetch search results: ${res.status}`);
  }
  return res.json();
}

export default function Search() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const noOfGuests = searchParams.get('noOfGuests');

  const startDateString = searchParams.get('startDate');
  const endDateString = searchParams.get('endDate');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';

  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const data = await getData();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    fetchSearchResults();
  }, []);

  console.log("Search Results:", searchResults);

  return (
    /*
    /*
    <Suspense fallback={<p>Loading search results...</p>}> {/* Wrap the entire content }
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays -{range}- for {noOfGuests} guests</p>
          <h1 className="text-3xl font-semi-bold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button "> Cancellation Flexibility</p>
            <p className="button"> Type of Place</p>
            <p className="button"> Price</p>
            <p className="button">   Rooms and Beds</p>
            <p className="button"> More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
        <MyMap searchResults={searchResults} /> 
         </section>
      </main>
      <Footer />
    </div>
  </Suspense>
);
}
*/
// Remove getServerSideProps as it's not used in the app router
// export async function getServerSideProps(context) {
//   // ...
// }











/*"use client";

import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { format } from "date-fns";
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component for optimized images

async function getData() {
  const res = await fetch("https://www.jsonkeeper.com/b/5NPS");
  if (!res.ok) {
    throw new Error(`Failed to fetch search results: ${res.status}`);
  }
  return res.json();
}

export default function Search() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const noOfGuests = searchParams.get('noOfGuests');

  const startDateString = searchParams.get('startDate');
  const endDateString = searchParams.get('endDate');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';

  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const data = await getData();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    fetchSearchResults();
  }, []);

  console.log("Search Results:", searchResults);

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays -{range}- for {noOfGuests} guests</p>
          <h1 className="text-3xl font-semi-bold mt-2 mb-6">Stays in {location}</h1>
          <div className="mt-5">
            {searchResults.map((item) => (
              <div key={item.id} className="flex items-center py-2">
                {item.img && (
                  <div className="relative h-20 w-20 mr-2">
                    <Image src={item.img} alt={item.title} layout="fill" objectFit="cover" className="rounded-md" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  { Render other details from the item object }
                  {item.description && <p className="text-gray-500">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

  <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button "> Cancellation Flexibility</p>
            <p className="button"> Type of Place</p>
            <p className="button"> Price</p>
            <p className="button">  Rooms and Beds</p>
            <p className="button"> More Filters</p>
          </div>





minimum example- "use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  return <p>Location: {location}</p>;
}

export default function Search() {
  return (
    <div>
      <h1>Search Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchPageContent />
      </Suspense>
    </div>
  );
}

"use client";

import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { format } from "date-fns";
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import InfoCard from '../../../components/InfoCard';

async function getData() {
  const res = await fetch("/api/search-data");
  if (!res.ok) {
    throw new Error(`Failed to fetch search results: ${res.status}`);
  }
  return res.json();
}

export default function Search() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const noOfGuests = searchParams.get('noOfGuests');

  const startDateString = searchParams.get('startDate');
  const endDateString = searchParams.get('endDate');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';

  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const data = await getData();
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, []);

  console.log("Search Results:", searchResults);

  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <div>
        <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
        <main className="flex">
          <section className="flex-grow pt-14 px-6">
            <p className="text-xs">300+ Stays -{range}- for {noOfGuests} guests</p>
            <h1 className="text-3xl font-semi-bold mt-2 mb-6">Stays in {location}</h1>
            <div className="flex flex-col">
              {searchResults.map(
                ({ img, location, title, description, star, price, total }) => (
                  <InfoCard
                    key={img}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                  />
                )
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}



          */


