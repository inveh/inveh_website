import { reactive, ref } from 'vue';

export interface CartItem {
  model_name: string;
  model_num: string;
  model_price: string;
  quantity: number;
}

export const cart = reactive<CartItem[]>([]);
export const isCartOpen = ref(false);

export const addToCartStore = (item: CartItem) => {
  const existing = cart.find(i => i.model_num === item.model_num);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
};
