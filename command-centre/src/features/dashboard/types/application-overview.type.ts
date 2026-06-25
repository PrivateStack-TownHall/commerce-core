export interface ApplicationOverview {
  id: string;
  name: string;
  emoji: string;

  products: number;
  categories: number;
  images: number;
  reviews: number;
  orders: number;

  lastUpdated: string;
}
