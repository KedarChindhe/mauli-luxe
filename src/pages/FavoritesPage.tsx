import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const FavoritesPage = () => {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const favProducts = products.filter(p => favorites.includes(p.id));

  if (favProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-6">Save products you love</p>
          <Link to="/shop"><Button className="rounded-full px-8 font-body">Browse Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-8">Favorites</h1>
        </motion.div>
        <div className="space-y-4">
          {favProducts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex gap-4 p-4 bg-card rounded-xl border border-border"
            >
              <Link to={`/product/${p.id}`}>
                <img src={p.images[0]} alt={p.name} className="w-20 h-20 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${p.id}`}><h3 className="font-display text-sm font-semibold truncate hover:text-gold transition-colors">{p.name}</h3></Link>
                <p className="text-sm font-bold text-gold mt-1">₹{p.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" className="rounded-full text-xs font-body" onClick={() => addToCart(p, p.sizes[0])}>
                  <ShoppingBag className="w-3 h-3 mr-1" /> Add to Cart
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => toggleFavorite(p.id)}>
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
