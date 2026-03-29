import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { cartCount, favorites } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-gradient-gold tracking-wide">
          MAULI
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === l.to ? "text-gold" : "text-muted-foreground hover:text-gold-light"
              }`}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/favorites" className="relative p-2 text-muted-foreground hover:text-gold transition-colors">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/admin" className="p-2 text-muted-foreground hover:text-gold transition-colors hidden md:block">
            <User className="w-5 h-5" />
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-dark border-t border-dark-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-gold py-2">
                  {l.label.toUpperCase()}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-gold py-2">
                ADMIN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
