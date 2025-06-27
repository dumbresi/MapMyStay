'use server';
import { notFound } from "next/navigation";
import Image from "next/image";
import { Listing } from "@/app/types/listing";

export default async function ListingDetailPage(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params; // ✅ await the params object

  const res = await fetch(`http://localhost:3001/api/listings/${id}`, {
    cache: "no-store",
  });
  console.log(res)
//   if (!res.ok) return notFound();

  const listing: Listing = await res.json();
  console.log("Fetched listing:", listing);
    if (!listing) return notFound();
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Image
        src={listing.image}
        alt={listing.title}
        width={600}
        height={400}
        className="rounded mb-4 object-cover w-full h-72"
      />
      <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
      <p className="text-lg text-green-700 font-semibold mb-2">${listing.price}/night</p>
      <p className="text-gray-600 mb-4">{listing.description}</p>

      <h2 className="text-lg font-semibold mb-2">Amenities:</h2>
      <ul className="list-disc ml-5 mb-4">
        {listing.amenities.map((amenity, i) => (
          <li key={i}>{amenity}</li>
        ))}
      </ul>

      <p className="text-sm text-gray-500">Rating: {listing.rating} ⭐</p>
      <p className="text-sm text-gray-500">Coordinates: ({listing.lat}, {listing.lng})</p>
    </div>
  );
}
