'use client';

import { useEffect, useState ,useRef} from 'react';
import ListingCard from './components/ListingCard';
import { Listing } from './types/listing';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';


export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl= process.env.NEXT_PUBLIC_BASE_URL
 
  const [query, setQuery] = useState('');
  const listingRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  const handleMarkerClick = (id: string) => {
    const el = listingRefs.current[parseInt(id)];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-4", "ring-blue-400");
  
      // Remove highlight after a short delay
      setTimeout(() => el.classList.remove("ring-4", "ring-blue-400"), 1500);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NGROCK_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_query: query }),
      });
  
      const data = await res.json();
    console.log("Agent response:", data);

    setListings(data.listings); // <-- use filtered listings
    setLoading(false); 
    } catch (error) {
      console.error("Failed to contact LLM agent:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 pb-6">Available Listings</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {!loading && listings.length > 0 && <MapView listings={listings} onMarkerClick={handleMarkerClick} />}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map(listing => (
            <div
            ref={el => {
              if (el) listingRefs.current[Number(listing.id)] = el;
            }}
          >
            <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
