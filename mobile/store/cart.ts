import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  stock?: number;
}

export interface PromoCodeData {
  code: string;
  discount: number;
}

export interface CartState {
  cart: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  cart: [],

  addItem: (item: CartItem) => {
    // Prevent adding if stock is 0 or less
    if (item.stock !== undefined && item.stock <= 0) {
      return;
    }

    const existingItem = get().cart.find((i) => i.id === item.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + item.quantity;
      // Check if adding would exceed stock
      if (item.stock !== undefined && newQuantity > item.stock) {
        return;
      }
      set({
        cart: get().cart.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: newQuantity,
                stock: item.stock,
                name: item.name || i.name,
                description: item.description || i.description,
              }
            : i,
        ),
      });
    } else {
      set({ cart: [...get().cart, item] });
    }
  },

  removeItem: (id: string) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
  },

  incrementQuantity: (id: string) => {
    set({
      cart: get().cart.map((item) => {
        if (item.id === id) {
          // Prevent incrementing if stock is 0 or quantity would exceed stock
          if (item.stock !== undefined) {
            if (item.stock <= 0 || item.quantity >= item.stock) {
              return item; // Return unchanged if stock check fails
            }
          }
          const newQuantity = item.quantity + 1;

          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    });
  },

  decrementQuantity: (id: string) => {
    set({
      cart: get()
        .cart.map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity - 1;
            if (newQuantity <= 0) {
              return null; // Will be filtered out
            }

            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[],
    });
  },

  getTotalPrice: () => {
    const subtotal = get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    return subtotal;
  },

  getTotalItems: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  isInCart: (id: string) => get().cart.some((item) => item.id === id),

  clearCart: () => set({ cart: [] }),
}));
