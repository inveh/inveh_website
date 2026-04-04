import { reactive, ref } from 'vue';

export interface CartItem {
  model_name: string;
  model_num: string;
  model_price: number;
  quantity: number;
}

const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('inveh_cart');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const cart = reactive<CartItem[]>(loadCart());
export const isCartOpen = ref(false);

const saveCartStore = () => {
  localStorage.setItem('inveh_cart', JSON.stringify(cart));
};

export const addToCartStore = (item: CartItem) => {
  const existing = cart.find(i => i.model_num === item.model_num);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCartStore();
};
