import { reactive, ref } from 'vue';
import { productCategories } from '../data/products';

export interface CartItem {
  model_name: string;
  model_num: string;
  model_price: number;
  discount: number;
  quantity: number;
}

const normalizeCartItem = (value: unknown): CartItem | null => {
  if (!value || typeof value !== 'object') return null;

  const storedItem = value as Partial<CartItem>;
  const product = productCategories.find(item => item.model_num === storedItem.model_num);
  const quantity = Number(storedItem.quantity);

  if (!product || !Number.isInteger(quantity) || quantity < 1) return null;

  return {
    model_name: product.model_name,
    model_num: product.model_num,
    model_price: product.model_price,
    discount: product.discount,
    quantity
  };
};

const loadCart = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem('inveh_cart');
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.map(normalizeCartItem).filter((item): item is CartItem => item !== null)
      : [];
  } catch (e) {
    return [];
  }
};

export const cart = reactive<CartItem[]>(loadCart());
export const isCartOpen = ref(false);

const saveCartStore = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('inveh_cart', JSON.stringify(cart));
  }
};

export const addToCartStore = (item: CartItem) => {
  const normalizedItem = normalizeCartItem(item);
  if (!normalizedItem) return;

  const existing = cart.find(i => i.model_num === normalizedItem.model_num);
  if (existing) {
    existing.quantity += normalizedItem.quantity;
  } else {
    cart.push(normalizedItem);
  }
  saveCartStore();
};

export const clearCart = () => {
  cart.splice(0, cart.length);
  saveCartStore();
};
