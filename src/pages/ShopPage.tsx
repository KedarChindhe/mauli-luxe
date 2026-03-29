import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [category, setCategory] = useState(initialCat);
  const [priceRange, setPriceRange] = useState("all");
  const [size, setSize] = useState("all");

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (category !== "all" && p.category !== category) return false;
      if (size !== "all" && !p.sizes.includes(Number(size))) return false;
      if (priceRange === "under1000" && p.price >= 1000) return false;
      if (priceRange === "1000-3000" && (p.price < 1000 || p.price > 3000)) return false;
      if (priceRange === "above3000" && p.price <= 3000) return false;
      return true;
    });
  }, [category, priceRange, size]);

  const selectClass = "bg-card border border-border rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground mb-8">Discover our collection</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8">
          <select value={category} onChange={e => setCategory(e.target.value)} className={selectClass}>
            <option value="all">All Categories</option>
            <option value="chappal">Chappal</option>
            <option value="shoes">Shoes</option>
            <option value="custom">Custom Design</option>
          </select>
          <select value={size} onChange={e => setSize(e.target.value)} className={selectClass}>
            <option value="all">All Sizes</option>
            {[6, 7, 8, 9, 10, 11, 12].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className={selectClass}>
            <option value="all">All Prices</option>
            <option value="under1000">Under ₹1,000</option>
            <option value="1000-3000">₹1,000 – ₹3,000</option>
            <option value="above3000">Above ₹3,000</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
