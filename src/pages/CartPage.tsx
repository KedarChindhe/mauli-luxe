import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link to="/shop"><Button className="rounded-full px-8 font-body">Shop Now</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>
        </motion.div>

        <div className="space-y-4 mb-8">
          {items.map((item, i) => (
            <motion.div key={`${item.product.id}-${item.size}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex gap-4 p-4 bg-card rounded-xl border border-border"
            >
              <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold truncate">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                {item.customization && <p className="text-xs text-muted-foreground truncate">Note: {item.customization}</p>}
                <p className="text-sm font-bold text-gold mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-xs hover:bg-secondary"><Minus className="w-3 h-3" /></button>
                  <span className="w-7 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-xs hover:bg-secondary"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold text-lg">₹{cartTotal.toLocaleString()}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full rounded-full font-body font-semibold" size="lg">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
