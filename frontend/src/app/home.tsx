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
    fetch(`${baseUrl}/listings`)
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

  const handleClear = async () => {
    setQuery('');
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/mocklistings`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setLoading(false);
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

    setListings(data.listings); 
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
      <div className="w-full px-6 py-4 border-b shadow-sm flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-500 tracking-tight">MapMyStay</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <button className="hover:underline">Become a host</button>
          <button className="hover:underline">Help</button>
          <button className="hover:underline">Login</button>
        </div>
      </div>
  
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} onClear={handleClear} />
  
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Left side - Listings */}
        <div className="w-full md:w-1/2 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
          )}
        </div>

        {/* Right side - Map */}
        <div className="hidden md:block md:w-1/2 h-full sticky top-0">
          <MapView listings={listings} onMarkerClick={handleMarkerClick} />
        </div>
      </div>

      </div>
  );
  
}
