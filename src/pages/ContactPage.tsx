import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass = "w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Mauli Footwear</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-gold mt-0.5" /> <span>91122 89149</span></div>
                <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-gold mt-0.5" /> <span>info@maulifootwear.com</span></div>
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-gold mt-0.5" /> <span>Mauli Footwear Shakha No. 3,<br />Jakat Naka, Dighi,<br />Pune, Maharashtra 412105</span></div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0!2d73.88!3d18.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzEyLjAiTiA3M8KwNTInNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mauli Footwear Location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Your name" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="your@email.com" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={`${inputClass} min-h-[120px] resize-none`} placeholder="Your message..." required />
              </div>
              <Button type="submit" className="w-full rounded-full font-body font-semibold gap-2">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
