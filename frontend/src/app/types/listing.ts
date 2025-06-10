
  export interface NearbyPlace {
    name: string;
    address: string;
  }
  
  export interface Listing {
    id: string;
    lat: number;
    lng: number;
    title: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    amenities: string[];
    description: string;
    nearby: NearbyPlace[]; // optional
  }