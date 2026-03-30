import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Package, ShoppingCart, LogIn, X, Eye } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { getProducts, saveProducts as persistProducts } from "@/lib/productStore";
import { toast } from "sonner";

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: { productName: string; size: number; quantity: number; price: number; customization?: string }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
}

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  category: "shoes",
  sizes: [],
  images: [""],
  description: "",
  featured: false,
};

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [productList, setProductList] = useState<Product[]>(getProducts);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("mauli-orders");
    return saved ? JSON.parse(saved) : sampleOrders;
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(emptyProduct);
  const [sizeInput, setSizeInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Order detail modal
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const ADMIN_EMAIL = "admin@maulifootwear.com";
  const ADMIN_PASSWORD = "mauli@2024";
  const [loginError, setLoginError] = useState("");

  const inputClass = "w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring";

  const saveProductList = (list: Product[]) => {
    setProductList(list);
    persistProducts(list);
  };

  const saveOrders = (list: Order[]) => {
    setOrders(list);
    localStorage.setItem("mauli-orders", JSON.stringify(list));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setSizeInput("");
    setUploadedImages([]);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      images: product.images,
      description: product.description,
      featured: product.featured,
    });
    setSizeInput(product.sizes.join(", "));
    setUploadedImages(product.images);
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price) {
      toast.error("Name and price are required");
      return;
    }

    const sizes = sizeInput.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    const images = uploadedImages;

    if (sizes.length === 0) {
      toast.error("Add at least one size");
      return;
    }

    const productData = {
      ...formData,
      sizes,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"],
    };

    if (editingProduct) {
      const updated = productList.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p);
      saveProductList(updated);
      toast.success("Product updated successfully");
    } else {
      const newProduct: Product = {
        ...productData,
        id: `p${Date.now()}`,
      };
      saveProductList([...productList, newProduct]);
      toast.success("Product added successfully");
    }
    setShowModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      saveProductList(productList.filter(p => p.id !== id));
      toast.success("Product deleted");
    }
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrders(updated);
    toast.success(`Order status updated to ${status}`);
  };

  const statusColors: Record<Order["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  // LOGIN SCREEN
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
            {loginError && <p className="text-destructive text-xs text-center">{loginError}</p>}
            <Button type="submit" className="w-full rounded-full font-body font-semibold">Sign In</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your store</p>
          </div>
          <Button variant="outline" className="rounded-full font-body text-sm" onClick={() => setLoggedIn(false)}>Logout</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: productList.length, icon: Package },
            { label: "Total Orders", value: orders.length, icon: ShoppingCart },
            { label: "Pending Orders", value: orders.filter(o => o.status === "pending").length, icon: ShoppingCart },
            { label: "Revenue", value: `₹${orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: ShoppingCart },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <stat.icon className="w-5 h-5 text-gold mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button variant={tab === "products" ? "default" : "outline"} className="rounded-full font-body text-sm gap-2" onClick={() => setTab("products")}>
            <Package className="w-4 h-4" /> Products
          </Button>
          <Button variant={tab === "orders" ? "default" : "outline"} className="rounded-full font-body text-sm gap-2" onClick={() => setTab("orders")}>
            <ShoppingCart className="w-4 h-4" /> Orders ({orders.length})
          </Button>
        </div>

        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg font-semibold">Products ({productList.length})</h2>
              <Button className="rounded-full font-body text-sm gap-2" onClick={openAddModal}>
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Product</th>
                      <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Category</th>
                      <th className="text-left px-4 py-3 font-medium">Price</th>
                      <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Sizes</th>
                      <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Featured</th>
                      <th className="text-right px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(p => (
                      <tr key={p.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover" />
                            <div>
                              <span className="font-medium block">{p.name}</span>
                              <span className="text-xs text-muted-foreground md:hidden capitalize">{p.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 capitalize text-muted-foreground hidden md:table-cell">{p.category}</td>
                        <td className="px-4 py-3 text-gold font-medium">₹{p.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.sizes.join(", ")}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {p.featured && <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">Featured</span>}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => openEditModal(p)} className="p-1.5 hover:bg-secondary rounded-md transition-colors">
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 hover:bg-secondary rounded-md transition-colors ml-1">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground">Orders will appear here once customers start ordering.</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">Order ID</th>
                        <th className="text-left px-4 py-3 font-medium">Customer</th>
                        <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Date</th>
                        <th className="text-left px-4 py-3 font-medium">Total</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-right px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs">#{order.id.slice(-6)}</td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-xs text-muted-foreground">{order.phone}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{order.date}</td>
                          <td className="px-4 py-3 font-medium text-gold">₹{order.total.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <select
                              value={order.status}
                              onChange={e => updateOrderStatus(order.id, e.target.value as Order["status"])}
                              className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[order.status]}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => setViewingOrder(order)} className="p-1.5 hover:bg-secondary rounded-md transition-colors">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ADD/EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-secondary rounded-md"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Product Name *</label>
                  <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="e.g. Royal Gold Chappal" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Price (₹) *</label>
                    <input type="number" value={formData.price || ""} onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))} className={inputClass} placeholder="1299" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category *</label>
                    <select value={formData.category} onChange={e => setFormData(f => ({ ...f, category: e.target.value as Product["category"] }))} className={inputClass}>
                      <option value="chappal">Chappal</option>
                      <option value="shoes">Shoes</option>
                      <option value="custom">Custom Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Sizes (comma separated) *</label>
                  <input value={sizeInput} onChange={e => setSizeInput(e.target.value)} className={inputClass} placeholder="6, 7, 8, 9, 10" />
                </div>

                <ImageUploader images={uploadedImages} onChange={setUploadedImages} />

                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} className={`${inputClass} min-h-[80px] resize-none`}
                    placeholder="Product description..." />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" checked={formData.featured || false} onChange={e => setFormData(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-border" />
                  <label htmlFor="featured" className="text-sm font-medium">Featured product</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 rounded-full font-body" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button className="flex-1 rounded-full font-body font-semibold" onClick={handleSaveProduct}>
                    {editingProduct ? "Save Changes" : "Add Product"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ORDER DETAIL MODAL */}
      <AnimatePresence>
        {viewingOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setViewingOrder(null)}
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Order #{viewingOrder.id.slice(-6)}</h2>
                <button onClick={() => setViewingOrder(null)} className="p-1 hover:bg-secondary rounded-md"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-sm">Customer Details</h3>
                  <p className="text-sm">{viewingOrder.customerName}</p>
                  <p className="text-xs text-muted-foreground">{viewingOrder.email}</p>
                  <p className="text-xs text-muted-foreground">{viewingOrder.phone}</p>
                  <p className="text-xs text-muted-foreground">{viewingOrder.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-2">Items</h3>
                  {viewingOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size} • Qty: {item.quantity}</p>
                        {item.customization && <p className="text-xs text-muted-foreground">Note: {item.customization}</p>}
                      </div>
                      <p className="font-medium text-gold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold">₹{viewingOrder.total.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm font-medium">Status:</span>
                  <select
                    value={viewingOrder.status}
                    onChange={e => {
                      updateOrderStatus(viewingOrder.id, e.target.value as Order["status"]);
                      setViewingOrder({ ...viewingOrder, status: e.target.value as Order["status"] });
                    }}
                    className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[viewingOrder.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sample orders for demo
const sampleOrders: Order[] = [
  {
    id: "ord-001-abc123",
    customerName: "Rahul Sharma",
    email: "rahul@email.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Pune, Maharashtra 411001",
    items: [
      { productName: "Royal Gold Chappal", size: 9, quantity: 1, price: 1299 },
      { productName: "Urban Street Sneaker", size: 10, quantity: 1, price: 2499 },
    ],
    total: 3798,
    status: "pending",
    date: "2024-03-28",
  },
  {
    id: "ord-002-def456",
    customerName: "Priya Deshmukh",
    email: "priya@email.com",
    phone: "+91 87654 32109",
    address: "45 FC Road, Pune, Maharashtra 411005",
    items: [
      { productName: "Custom Design Special", size: 7, quantity: 1, price: 1999, customization: "Red and gold color, traditional design" },
    ],
    total: 1999,
    status: "confirmed",
    date: "2024-03-27",
  },
  {
    id: "ord-003-ghi789",
    customerName: "Amit Patil",
    email: "amit@email.com",
    phone: "+91 76543 21098",
    address: "78 JM Road, Pune, Maharashtra 411004",
    items: [
      { productName: "Midnight Runner", size: 10, quantity: 2, price: 3499 },
    ],
    total: 6998,
    status: "shipped",
    date: "2024-03-25",
  },
];

export default AdminDashboard;
