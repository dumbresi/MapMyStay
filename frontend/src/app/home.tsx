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
    setLoading(true); 
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
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 pb-6">Available Listings</h1>
  
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
  
      <div className="flex flex-col md:flex-row gap-6 min-h-screen">
        {/* Map always visible and full height */}
        <div className="md:w-1/2 h-[80vh]">
          <MapView listings={listings} onMarkerClick={handleMarkerClick} />
        </div>

        {/* Listings section */}
        <div className="md:w-1/2 overflow-y-auto">
          {loading ? (
            <p className="text-center mt-6 text-gray-600">Loading listings...</p>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  ref={(el) => {
                    if (el) listingRefs.current[Number(listing.id)] = el;
                  }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-6 text-gray-500">No listings found.</p>
          )}
        </div>
      </div>
    </div>
  );
  
}
