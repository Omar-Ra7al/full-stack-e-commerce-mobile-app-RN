export interface ProductType {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock?: number;
  quantity?: number;
}

export const CLIENT_DB_COLLECTIONS = {
  products: {} as ProductType,
  orders: {} as { total: number; userId: string },
} as const;
