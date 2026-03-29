import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const fav = isFavorite(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover-lift"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-sm font-semibold truncate hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground capitalize mt-1">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-body font-bold text-gold">₹{product.price.toLocaleString()}</span>
          <div className="flex gap-1">
            <button
              onClick={() => toggleFavorite(product.id)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle favorite"
            >
              <Heart className={`w-4 h-4 ${fav ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </button>
            <button
              onClick={() => addToCart(product, product.sizes[0])}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
