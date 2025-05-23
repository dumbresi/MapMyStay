// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

// Mock Airbnb data
const listings = [
  {
    id: 1,
    title: "Cozy 2BHK near Downtown",
    lat: 40.748817,
    lng: -73.985428
  },
  {
    id: 2,
    title: "Studio apartment near Central Park",
    lat: 40.785091,
    lng: -73.968285
  }
];

const GOOGLE_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

app.get('/api/listings', async (req, res) => {
  const type = req.query.type || 'restaurant'; // e.g., 'restaurant' or 'bus_station'
  const keyword = req.query.keyword || 'Indian';
  const radius = 500; // meters

  const results = await Promise.all(
    listings.map(async (listing) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.lat},${listing.lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=${GOOGLE_API_KEY}`;

      try {
        const { data } = await axios.get(url);
        return {
          ...listing,
          nearby: data.results.map(r => ({ name: r.name, address: r.vicinity }))
        };
      } catch (err) {
        return {
          ...listing,
          nearby: [],
          error: err.message
        };
      }
    })
  );

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// frontend/pages/index.js (Next.js)
import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{ color: 'red' }}>📍{text}</div>;

export default function Home() {
  const [data, setData] = useState([]);

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
