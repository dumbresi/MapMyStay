import { Listing } from "../types/listing";
import Image from "next/image";

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  return (
    <div className="border p-3 rounded-md shadow hover:shadow-md transition text-sm">
      <Image
        src={listing.image}
        alt={listing.title}
        width={300}
        height={180}
        className="w-full h-36 object-cover rounded mb-2"
      />

      <h2 className="text-base font-semibold mb-1">{listing.title}</h2>
      <p className="text-green-600 font-bold mb-1">${listing.price}/night</p>
      <p className="text-gray-600 mb-1">({listing.lat}, {listing.lng})</p>
      <ul className="list-disc ml-4">
        {listing.nearby?.length > 0 ? (
          listing.nearby.map((place, i) => (
            <li key={i}>
              {place.name} - {place.address}
            </li>
          ))
        ) : (
          <li>No nearby places</li>
        )}
      </ul>
    </div>
  );
}