import { products as defaultProducts, Product } from "@/data/products";

const STORAGE_KEY = "mauli-admin-products";

export const getProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  } catch {
    return defaultProducts;
  }
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("mauli-products-updated"));
};
