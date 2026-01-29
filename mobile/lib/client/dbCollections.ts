export const CLIENT_DB_COLLECTIONS = {
  users: {} as { email: string; role: "admin" | "user" },
  orders: {} as { total: number; userId: string },
} as const;
