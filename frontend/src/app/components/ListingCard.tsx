import { Listing } from "../types/listing";
import Image from "next/image";

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <Image src={listing.image_url}
        alt={listing.title}
        className="w-full h-48 object-cover rounded mb-4">
      </Image>
      
      <h2 className="text-xl font-semibold mb-1">{listing.title}</h2>
      <p className="text-lg text-green-600 font-bold mb-2">${listing.price}/night</p>
      <p className="text-sm text-gray-600 mb-2">
        Location: ({listing.lat}, {listing.lng})
      </p>
      <div>
        <h3 className="font-medium text-gray-800">Nearby:</h3>
        <ul className="list-disc ml-4 text-sm">
          {listing.nearby?.length > 0 ? (
            listing.nearby.map((place, i) => (
              <li key={i}>
                {place.name} - {place.address}
              </li>
            ))
          ) : (
            <li>No nearby places found</li>
          )}
        </ul>
      </div>
    </div>
  );
}