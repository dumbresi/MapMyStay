import { Listing } from "../types/listing";
import Image from "next/image";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  const fullStars = Math.floor(listing.rating);
  const hasHalfStar = listing.rating % 1 >= 0.25 && listing.rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

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

      {/* ⭐ Star rating */}
      <div className="flex items-center mb-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOutline key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-xs text-gray-600 ml-2">{listing.rating.toFixed(1)}</span>
      </div>

      <ul className="list-disc ml-4">
        {listing.nearby?.length > 0 ? (
          listing.nearby.map((place, i) => (
            <li key={i}>
              {place.name} - {place.address}
            </li>
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
}
