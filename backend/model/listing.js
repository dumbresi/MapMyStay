const axios = require('axios');

class Listing {
  constructor() {
    this.GOOGLE_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
  }

  async getNearbyPlaces(lat, lng, type = 'restaurant', keyword = 'Indian', radius = 500) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=${this.GOOGLE_API_KEY}`;
    
    try {
      const { data } = await axios.get(url);
      return data.results.map(r => ({ name: r.name, address: r.vicinity }));
    } catch (err) {
      throw new Error(`Failed to fetch nearby places: ${err.message}`);
    }
  }
}

module.exports = new Listing();

const mocklistings = [
    {
      id: 1,
      title: "Cozy 2BHK near Downtown",
      lat: 40.748817,
      lng: -73.985428,
      image: "https://via.placeholder.com/150",
      price: 1000,
      rating: 4.5,
      reviews: 100,
      amenities: ["Wifi", "Parking", "Pool"],
      description: "This is a cozy 2BHK apartment near Downtown. It has a spacious living room, a fully equipped kitchen, and a private balcony. The apartment is located in a quiet neighborhood, close to all amenities.",
      isAvailable: true,
      
    },
    {
      id: 2,
      title: "Studio apartment near Central Park",
      lat: 40.785091,
      lng: -73.968285,
      image: "https://via.placeholder.com/150",
      price: 800,
      rating: 4.2,
      reviews: 75,
      amenities: ["Wifi", "Parking", "Gym"],
      description: "This is a studio apartment near Central Park. It has a spacious living room, a fully equipped kitchen, and a private balcony. The apartment is located in a quiet neighborhood, close to all amenities.",
      isAvailable: true,
    }   
  ];

  export default mocklistings;