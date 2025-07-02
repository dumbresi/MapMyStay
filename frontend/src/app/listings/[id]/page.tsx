'use server';
import { notFound } from "next/navigation";
import Image from "next/image";
import { Listing } from "@/app/types/listing";

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const listing: Listing = await res.json();
  if (!listing) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      
      <div className="flex flex-col md:flex-row gap-8">
       
        <div className="md:w-1/2 w-full">
          <Image
            src={listing.image}
            alt={listing.title}
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-72 md:h-full"
          />
        </div>

        
        <div className="md:w-1/2 w-full">
          <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
          <p className="text-green-600 font-semibold text-lg mb-2">
            ${listing.price}/night
          </p>

          
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i + 1 <= Math.floor(listing.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.26 3.885h4.104c.969 0 1.371 1.24.588 1.81l-3.32 2.415 1.262 3.885c.3.921-.755 1.688-1.538 1.117L10 13.347l-3.308 2.392c-.783.57-1.838-.196-1.538-1.117l1.262-3.885-3.32-2.415c-.783-.57-.38-1.81.588-1.81h4.104l1.26-3.885z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {listing.rating} / 5
            </span>
          </div>

          <p className="text-gray-700 mb-4">{listing.description}</p>

          <h2 className="text-md font-semibold mb-1">Amenities:</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {listing.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

          <p className="mt-4 text-sm text-gray-500">
            Coordinates: ({listing.lat}, {listing.lng})
          </p>
        </div>
      </div>
    </div>
  );
}
