export interface DataItem {
    name: string;
    uri?: string; // URI for images
    description?: string; // Description for the item
    price?: string; // Price for the item
    rating?: number; // Rating for the item
  }
  export interface HotelImage {
    id: string;
    image: string;
    description: string;
  }
  
  export interface Hotel {
    id: string;
    featured_image: string;
    images?: HotelImage[];
    name: string;
    cuisines: string;
    average_cost_for_two?: number;
    aggregate_rating: number;
    adress: string;
    smalladress: string;
    offer: string;
    no_of_Delivery: number;
    latitude: number;
    longitude: number;
    time: string;
  }

export type RootStackParamList = {
  HotelScreen: { 
    id: string;
    name: string;
    address: string; 
    smallAddress: string; 
    cuisines: string;
    aggregate_rating: number; 
  }; // Define the parameters for HotelScreen
  // Add other screens here
};

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  ratings: number;
  image: string;
  veg: boolean;
  bestSeller: boolean;
  quantity: number;
}

// Define the type for a menu category
export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}