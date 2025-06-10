'use client';

import { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import { Listing } from './types/listing';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';


export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl= process.env.NEXT_PUBLIC_BASE_URL
 
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/mocklistings`)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch listings:', err);
        setLoading(false);
      });
  }, []);


  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("User query:", query);
    // TODO: call LLM agent API here
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 pb-6">Available Listings</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {!loading && listings.length > 0 && <MapView listings={listings} />}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
