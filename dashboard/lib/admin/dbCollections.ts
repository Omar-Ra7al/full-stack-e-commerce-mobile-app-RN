import { Product } from "../schema/product";

export const ADMIN_DB_COLLECTIONS = {
  users: {} as { email: string; role: "admin" | "user" },
  orders: {} as { total: number; userId: string },
  products: {} as Product & { url: string },
} as const;
