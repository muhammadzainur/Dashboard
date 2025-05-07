export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  inventoryStatus: string;
  quantity: number;
  code?: string;
  description?: string;
}
