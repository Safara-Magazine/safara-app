import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  color?: string;
  size?: string;
}

export interface DeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
}

interface CartState {
  items: CartItem[];
  _hasHydrated: boolean;
  
  // Checkout flow state
  currentStep: 1 | 2 | 3 | 4;
  deliveryInfo: DeliveryInfo | null;
  discountCode: string;
  discountAmount: number;
  saveDeliveryDetails: boolean;
  
  // Actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  
  // Checkout actions
  setStep: (step: 1 | 2 | 3 | 4) => void;
  nextStep: () => void;
  prevStep: () => void;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  setDiscountCode: (code: string) => void;
  applyDiscount: (code: string) => void;
  setSaveDeliveryDetails: (save: boolean) => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  resetCheckout: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      currentStep: 1,
       _hasHydrated: false,
      deliveryInfo: null,
      discountCode: '',
      discountAmount: 0,
      saveDeliveryDetails: false,

      addToCart: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter(item => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Checkout flow actions
      setStep: (step) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const current = get().currentStep;
        if (current < 4) {
          set({ currentStep: (current + 1) as 1 | 2 | 3 | 4 });
        }
      },

      prevStep: () => {
        const current = get().currentStep;
        if (current > 1) {
          set({ currentStep: (current - 1) as 1 | 2 | 3 | 4 });
        }
      },

      setDeliveryInfo: (info) => {
        set({ deliveryInfo: info });
      },

      setDiscountCode: (code) => {
        set({ discountCode: code });
      },

      applyDiscount: (code) => {
        // Simple discount logic - you can expand this
        const discounts: Record<string, number> = {
          'SAFARI10': 500,
          'WELCOME': 1000,
          'SAVE20': 1500,
        };
        
        const discount = discounts[code.toUpperCase()] || 0;
        set({ 
          discountCode: code,
          discountAmount: discount 
        });
      },

      setSaveDeliveryDetails: (save) => {
        set({ saveDeliveryDetails: save });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getDiscount: () => {
        return get().discountAmount;
      },

      getDeliveryFee: () => {
        // Fixed delivery fee - you can make this dynamic based on location
        return 2500;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const delivery = get().getDeliveryFee();
        return subtotal - discount + delivery;
      },

      resetCheckout: () => {
        set({
          currentStep: 1,
          deliveryInfo: null,
          discountCode: '',
          discountAmount: 0,
          saveDeliveryDetails: false,
        });
      },
    }),
     {
    name: 'safara-cart',
    onRehydrateStorage: () => (state) => {
      if (state) {
        state._hasHydrated = true;
      }
    },
  }
    )
  );