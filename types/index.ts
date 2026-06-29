export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  price: number; // in cents
  weight: string;
  image: string;
  badge?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

export interface CheckoutPayload {
  items: { id: string; quantity: number }[];
  zipCode: string;
}
