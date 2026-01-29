export const ADMIN_DB_COLLECTIONS = {
  users: {} as { email: string; role: "admin" | "user" },
  orders: {} as { total: number; userId: string },
} as const;
