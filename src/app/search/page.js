// pages/search.js
"use client";

import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { format } from "date-fns";
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import InfoCard from '../../../components/InfoCard';
import MyMap from '../../../components/Map';

async function getData() { /* ... */ }

function SearchParamsHandler({ searchParams }) {
  const location = searchParams?.get('location');
  const startDateString = searchParams?.get('startDate');
  const endDateString = searchParams?.get('endDate');
  const noOfGuests = searchParams?.get('noOfGuests');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';
  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  return (
    <section className="flex-grow pt-14 px-6">
      <p className="text-xs">300+ Stays -{range}- for {noOfGuests} guests</p>
      <h1 className="text-3xl font-semi-bold mt-2 mb-6">Stays in {location}</h1>
      <div  className="hidden lg:inline-flex mb-5 space-x-3
       text-gray-800 whitespace-nowrap">
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
          const res = await fetch(`/api/search-data?location=<span class="math-inline">\{searchParamsClient\.get\('location'\)\}&startDate\=</span>{searchParamsClient.get('startDate')}&endDate=<span class="math-inline">\{searchParamsClient\.get\('endDate'\)\}&noOfGuests\=</span>{searchParamsClient.get('noOfGuests')}`);
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
    <div className="flex flex-col ">
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <Suspense fallback={<p>Loading search details...</p>}>
            <SearchParamsHandler searchParams={searchParamsClient} />
          </Suspense>
          <div className="flex flex-col ">
            {searchResults.map((result) => (
              <InfoCard key={result.img} {...result} />
            ))}
          </div>
        </section>
         {/* Map for mobile and tablet (initially hidden on larger) */}
      <section className="flex-flex-col xl:inline-flex xl:min-w-[600px]">
        <MyMap searchResults={searchResults} />
      </section>

     
      </main>
      <Footer />
    </div>
  );
}


