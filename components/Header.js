"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, GlobeAltIcon, Bars3Icon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/navigation';

function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = (location, startDate, endDate, noOfGuests) => {
    const queryString = `location=${encodeURIComponent(location)}&startDate=${encodeURIComponent(startDate.toISOString())}&endDate=${encodeURIComponent(endDate.toISOString())}&noOfGuests=${encodeURIComponent(noOfGuests)}`;
    router.push(`/search?${queryString}`);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/*Left*/}
      <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition='left'
          alt="Airbnb logo"
        />
      </div>

      {/*Middle-search*/}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400" 
          type="text" 
          placeholder={placeholder || "Start your search"}
        />
        <MagnifyingGlassIcon className="h-8 bg-red-400 text-white rounded-full p-1 cursor-pointer hidden md:inline-flex md:mx-2" />
      </div>

      {/*Right*/}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {searchInput && (
           <div className="flex flex-col col-span-3 mx-auto mt-10">
           <DateRangePicker
             ranges={[selectionRange]}
             mindate={new Date()}
             rangeColors={["#FD5B61"]}
             onChange={handleSelect}
           />
           <div className='flex items-center border-b mb-4 w-full '>
             <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
             <UsersIcon className="h-5" />
             <input
               value={noOfGuests}
               onChange={(e) => setNoOfGuests(parseInt(e.target.value) >= 1 ? parseInt(e.target.value) : 1)}
               type="number"
               min={1}
               className="w-12 pl-2 text-lg outline-none text-red-400" />
           </div>
           <div className='flex space-x-2'>
            <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
            <button onClick={() => search(searchInput, startDate, endDate, noOfGuests)} className='flex-grow text-red-400'>Search</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;



/*
flex flex-col col-span-3 mx-auto mt-10
fixed top-0 left-0 z-50 bg-white w-full h-screen flex flex-col items-center justify-start p-6 md:relative md:h-auto md:w-auto md:left-auto md:top-auto md:bg-transparent md:p-0 md:col-span-3 md:mx-auto md:mt-10


if (typeof searchInput !== 'string') {
        console.error("searchInput is not a string:", searchInput);
        return; // Prevent router.push if searchInput is invalid
      }
const guestsString = String(noOfGuests); // Explicitly convert to string




 const search = () => {
      router.push({
        pathname: "/search",
        query: {
          location: "test",
        },
      });
    };


    router.push({
          pathname: "/search",
          query: {
          location: searchInput,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          noOfGuests,
         
        },

        });
    };
*/