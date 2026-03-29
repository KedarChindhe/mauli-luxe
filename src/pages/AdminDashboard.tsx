import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Package, ShoppingCart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products as initialProducts, Product } from "@/data/products";

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [productList] = useState<Product[]>(initialProducts);

  const inputClass = "w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-xl p-8 w-full max-w-sm"
        >
          <div className="text-center mb-6">
            <LogIn className="w-10 h-10 text-gold mx-auto mb-3" />
            <h1 className="font-display text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="admin@maulifootwear.com" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} placeholder="Password" required />
            <Button type="submit" className="w-full rounded-full font-body font-semibold">Sign In</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" className="rounded-full font-body text-sm" onClick={() => setLoggedIn(false)}>Logout</Button>
        </div>

        <div className="flex gap-2 mb-6">
          <Button variant={tab === "products" ? "default" : "outline"} className="rounded-full font-body text-sm gap-2" onClick={() => setTab("products")}>
            <Package className="w-4 h-4" /> Products
          </Button>
          <Button variant={tab === "orders" ? "default" : "outline"} className="rounded-full font-body text-sm gap-2" onClick={() => setTab("orders")}>
            <ShoppingCart className="w-4 h-4" /> Orders
          </Button>
        </div>

        {tab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg font-semibold">Products ({productList.length})</h2>
              <Button className="rounded-full font-body text-sm gap-2"><Plus className="w-4 h-4" /> Add Product</Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Product</th>
                      <th className="text-left px-4 py-3 font-medium">Category</th>
                      <th className="text-left px-4 py-3 font-medium">Price</th>
                      <th className="text-left px-4 py-3 font-medium">Sizes</th>
                      <th className="text-right px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(p => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover" />
                          <span className="font-medium">{p.name}</span>
                        </td>
                        <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                        <td className="px-4 py-3 text-gold font-medium">₹{p.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.sizes.join(", ")}</td>
                        <td className="px-4 py-3 text-right">
                          <button className="p-1.5 hover:bg-secondary rounded-md transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                          <button className="p-1.5 hover:bg-secondary rounded-md transition-colors ml-1"><Trash2 className="w-4 h-4 text-destructive" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground">Orders will appear here once customers start ordering.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
