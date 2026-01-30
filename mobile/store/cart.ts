import { create } from "zustand";

export interface FreeSample {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  stock?: number; // Optional for backward compatibility
}

export interface PromoCodeData {
  code: string;
  discount: number;
}

export interface CartState {
  cart: CartItem[];
  promoCode: PromoCodeData | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  setPromoCode: (code: string, discount: number) => void;
  clearPromoCode: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (id: string) => boolean;

  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  cart: [],
  hasHydrated: false,
  setHasHydrated: (v) => set({ hasHydrated: v }),
  promoCode: null,
  cartOpen: false,

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

  clearCart: () => set({ cart: [], promoCode: null }),

  setPromoCode: (code: string, discount: number) => {
    set({ promoCode: { code, discount } });
  },

  clearPromoCode: () => set({ promoCode: null }),

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
}));
