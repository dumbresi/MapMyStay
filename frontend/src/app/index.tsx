// frontend/pages/index.js (Next.js)
import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

interface Listing {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface MarkerProps {
  text: string;
}

const Marker: React.FC<MarkerProps> = ({ text }) => <div style={{ color: 'red' }}>📍{text}</div>;

export default function Home() {
  const [data, setData] = useState<Listing[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/listings?type=restaurant&keyword=Indian')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
        defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
        defaultZoom={13}
      >
        {data.map(listing => (
          <Marker
            key={listing.id}
            lat={listing.lat}
            lng={listing.lng}
            text={listing.title}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
