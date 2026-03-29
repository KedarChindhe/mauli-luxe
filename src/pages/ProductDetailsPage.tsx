import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 7);
  const [qty, setQty] = useState(1);
  const [customization, setCustomization] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/shop"><Button variant="outline">Back to Shop</Button></Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, qty, customization || undefined);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="font-display text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-gold mb-4">₹{product.price.toLocaleString()}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-1 block">Size</label>
                <select value={selectedSize} onChange={e => setSelectedSize(Number(e.target.value))}
                  className="bg-card border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-ring">
                  {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary">-</button>
                  <span className="w-10 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary">+</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Customization Notes</label>
                <textarea
                  value={customization}
                  onChange={e => setCustomization(e.target.value)}
                  placeholder="Color preference, design notes, special sizing..."
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-full font-body font-semibold gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </Button>
              <Button onClick={() => toggleFavorite(product.id)} variant="outline" size="lg" className="rounded-full px-4">
                <Heart className={`w-5 h-5 ${fav ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
