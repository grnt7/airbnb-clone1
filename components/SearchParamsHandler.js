"use client";

import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { format } from "date-fns";
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import InfoCard from '../../../components/InfoCard';
import MyMap from '../../../components/Map';

async function getData() {
  const res = await fetch("/api/search-data");
  if (!res.ok) {
    throw new Error(`Failed to fetch search results: ${res.status}`);
  }
  return res.json();
}

function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const startDateString = searchParams.get('startDate');
  const endDateString = searchParams.get('endDate');
  const noOfGuests = searchParams.get('noOfGuests');

  const formattedStartDate = startDateString ? format(new Date(startDateString), "dd MMMM yy") : '';
  const formattedEndDate = endDateString ? format(new Date(endDateString), "dd MMMM yy") : '';
  const range = formattedStartDate && formattedEndDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

  return (
    <>
      <p className="text-xs">300+ Stays -{range}- for {noOfGuests} guests</p>
      <h1 className="text-3xl font-semi-bold mt-2 mb-6">Stays in {location}</h1>
      {/* Add other elements that depend on searchParams here if needed */}
    </>
  );
}

export default function Search() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const startDateString = searchParams.get('startDate');
  const endDateString = searchParams.get('endDate');
  const noOfGuests = searchParams.get('noOfGuests');

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

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <Suspense fallback={<p>Loading search details...</p>}>
            <SearchParamsHandler />
          </Suspense>
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
  );
}
