export interface NearbyPlace {
    name: string;
    address: string;
  }
  
  export interface Listing {
    id: number;
    title: string;
    lat: number;
    lng: number;
    price: number;
    image_url: string;
    nearby: NearbyPlace[];
  }
  