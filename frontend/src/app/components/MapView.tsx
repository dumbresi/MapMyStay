import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Listing } from "../types/listing";

interface Props {
  listings: Listing[];
  onMarkerClick: (id: string) => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};

export default function MapView({ listings,onMarkerClick }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="mb-6">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={{ lat: listing.lat, lng: listing.lng }}
            title={listing.title}
            onClick={() => onMarkerClick(listing.id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
