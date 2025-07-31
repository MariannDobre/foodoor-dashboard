export interface Restaurant {
  id: number;
  name: string;
  poster: string;
  banner: string;
  location: string;
  delivery_city: string;
  open_time: string;
  close_time: string;
  days_open: string[];
  created_at: string;
  rating: string;
  avg_prep_time: string;
}

export interface Product {
  id: number;
  restaurant_id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  prep_time_in_seconds: number;
  weight_in_grams: number;
  product_tag: string;
  created_at: string;
}
