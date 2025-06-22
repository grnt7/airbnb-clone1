// pages/search.js
"use client";

import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { format } from "date-fns";
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image'; // Assuming this is used for InfoCard or elsewhere
import InfoCard from '../../../components/InfoCard';
import MyMap from '../../../components/Map'; // Corrected path from earlier example

// Ensure your global CSS is imported here or in _app.js/layout.js
// If you are using custom CSS classes instead of pure Tailwind for the layout:
// import '../styles/globals.css'; // Make sure this is uncommented if your layout CSS is in there

// async function getData() { /* ... */ } // This function appears unused in the provided code

function SearchParamsHandler({ searchParams }) {
  const location = searchParams?.get('location');
  const startDateString = searchParams?.get('startDate');
  const endDateString = searchParams?.get('endDate');
  const noOfGuests = searchParams?.get('noOfGuests');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';
  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  return (
    // Note: This section's classes are specific to its content, not the overall layout
    <section className="flex-grow pt-14 px-6">
      <p className="text-xs">300+ Stays -{range}- for {noOfGuests} guests</p>
      <h1 className="text-3xl font-semi-bold mt-2 mb-6">Stays in {location}</h1>
      <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
        <p className="button">Cancellation Flexbility</p>
        <p className="button">Type of Place</p>
        <p className="button">Price</p>
        <p className="button">Rooms and Beds</p>
        <p className="button">More Filters</p>
      </div>
    </section>
  );
}

export default function Search() {
  const [searchParamsClient, setSearchParamsClient] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchParamsClient(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    async function fetchSearchResults() {
      if (searchParamsClient) {
        try {
          // ENSURE YOUR API PATH IS CORRECT AND DOESN'T HAVE TYPOS LIKE 'math-inline'
          const res = await fetch(`/api/search-data?location=${searchParamsClient.get('location')}&startDate=${searchParamsClient.get('startDate')}&endDate=${searchParamsClient.get('endDate')}&noOfGuests=${searchParamsClient.get('noOfGuests')}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch search results: ${res.status}`);
          }
          const data = await res.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    }

    fetchSearchResults();
  }, [searchParamsClient]);

  const location = searchParamsClient?.get('location');
  const startDateString = searchParamsClient?.get('startDate');
  const endDateString = searchParamsClient?.get('endDate');
  const noOfGuests = searchParamsClient?.get('noOfGuests');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';
  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  return (
    // This is the main layout container for the entire page content
    // We'll use Tailwind CSS classes here for responsive layout
    <div className="flex flex-col min-h-screen"> {/* Mobile: column; takes full height */}
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      
      {/* The main content area, which will flex */}
      <main className="flex flex-grow flex-col md:flex-row"> {/* Mobile: column; MD+: row */}

        {/* This is the left/top content section (InfoCards, filters) */}
        <section className="flex-grow pt-14 px-6 md:w-1/2 md:order-1 overflow-y-auto"> {/* MD+: takes 1/2 width, order 1 */}
          <Suspense fallback={<p>Loading search details...</p>}>
            <SearchParamsHandler searchParams={searchParamsClient} />
          </Suspense>
          <div className="flex flex-col ">
            {searchResults.map((result) => (
              <InfoCard key={result.img} {...result} />
            ))}
          </div>
        </section>

        {/* This is the right/bottom map section */}
        <section className="w-full h-96 md:h-screen md:w-1/2 md:order-2 relative"> {/* Mobile: full width, h-96. MD+: 1/2 width, full screen height, order 2 */}
          {/* Now, pass the className to MyMap. MyMap will apply it to ReactMapGL */}
          <MyMap className="w-full h-full" searchResults={searchResults} /> {/* MyMap will fill this section */}
        </section>

      </main>
      <Footer />
    </div>
  );
}


