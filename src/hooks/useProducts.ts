import { useState, useEffect, useCallback } from "react";
import { Product } from "@/data/products";
import { getProducts } from "@/lib/productStore";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(getProducts);

  const refresh = useCallback(() => setProducts(getProducts()), []);

  useEffect(() => {
    window.addEventListener("mauli-products-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("mauli-products-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return products;
};
