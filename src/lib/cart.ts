import { Product } from "@/model/products/zod-schema";
import { toast } from "sonner";

export type CartItem = Product & {
  quantity: number;
};

export function addCartItem(item: Product) {
  const key = 'cart';
  const stored = localStorage.getItem(key);
  const cart: CartItem[] = stored ? JSON.parse(stored) : [];

  const index = cart.findIndex((i) => i._id === item._id);
  if (index !== -1) {
    // Item exists, increment quantity
    cart[index].quantity += 1;
  } else {
    // Add new item with quantity 1
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem(key, JSON.stringify(cart));
  toast("Item has been added to cart.");
}