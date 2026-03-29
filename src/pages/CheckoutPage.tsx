import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", address: "", city: "", state: "", pincode: "", phone: "" });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Order placed successfully! We'll contact you shortly.");
    clearCart();
  };

  const inputClass = "w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
          {/* Left - Form */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <input type="email" value={form.email} onChange={e => update("email", e.target.value)} className={inputClass} placeholder="your@email.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">First Name *</label>
                <input value={form.firstName} onChange={e => update("firstName", e.target.value)} className={inputClass} placeholder="First name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Last Name</label>
                <input value={form.lastName} onChange={e => update("lastName", e.target.value)} className={inputClass} placeholder="Last name" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Address *</label>
              <input value={form.address} onChange={e => update("address", e.target.value)} className={inputClass} placeholder="Full address" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">City</label>
                <input value={form.city} onChange={e => update("city", e.target.value)} className={inputClass} placeholder="City" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">State</label>
                <input value={form.state} onChange={e => update("state", e.target.value)} className={inputClass} placeholder="State" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Pincode</label>
                <input value={form.pincode} onChange={e => update("pincode", e.target.value)} className={inputClass} placeholder="412105" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone *</label>
              <input value={form.phone} onChange={e => update("phone", e.target.value)} className={inputClass} placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          {/* Right - Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-display text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[60%]">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-gold">₹{cartTotal.toLocaleString()}</span>
              </div>
              <Button type="submit" className="w-full mt-6 rounded-full font-body font-semibold" size="lg">
                Place Order
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">Payment will be collected on delivery or via WhatsApp confirmation</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
