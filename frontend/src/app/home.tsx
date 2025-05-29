"use client";

import { useEffect, useState } from "react";
import ListingCard from "./components/ListingCard";
import { Listing } from "./types/listing";

export default function Home() {
    const [listings, setListings] = useState<Listing[]>([]);
  
    useEffect(() => {
      fetch("http://localhost:3001/api/listings?type=restaurant&keyword=Indian")
        .then((res) => res.json())
        .then(setListings);
    }, []);
  
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Find Your Stay</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    );
  }
