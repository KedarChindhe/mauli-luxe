import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const categories = [
  { name: "Chappal", slug: "chappal", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=500&fit=crop" },
  { name: "Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop" },
  { name: "Custom Design", slug: "custom", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop" },
];

const testimonials = [
  { name: "Rahul Sharma", text: "The best custom footwear I've ever owned. Perfect fit and stunning design!", rating: 5 },
  { name: "Priya Deshmukh", text: "Mauli's chappals are incredibly comfortable and look premium. Highly recommended!", rating: 5 },
  { name: "Amit Patil", text: "Got my custom shoes made and they exceeded all expectations. True craftsmanship.", rating: 5 },
];

const HomePage = () => {
  const products = useProducts();
  const featured = products.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-dark-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">Premium Footwear</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: "hsl(0 0% 98%)" }}>
              Custom Footwear<br />
              <span className="text-gradient-gold">Made Just For You</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: "hsl(0 0% 60%)" }}>
              Handcrafted with passion, designed for perfection. Experience the luxury of footwear tailored to your style.
            </p>
            <Link to="/shop">
              <Button size="lg" className="rounded-full px-8 gap-2 font-body font-semibold">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-muted-foreground">Find your perfect pair</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/shop?category=${cat.slug}`} className="group block relative rounded-xl overflow-hidden aspect-[4/5] hover-lift">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-xl font-bold text-primary-foreground">{cat.name}</h3>
                    <p className="text-sm text-primary-foreground/70 flex items-center gap-1 mt-1">
                      Explore <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">Featured Collection</h2>
            <p className="text-muted-foreground">Our most loved styles</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop"><Button variant="outline" className="rounded-full px-8 font-body">View All Products</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-dark-gradient">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gradient-gold mb-3">What Our Customers Say</h2>
            <p style={{ color: "hsl(0 0% 50%)" }}>Real reviews from real people</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 70%)" }}>"{t.text}"</p>
                <p className="text-sm font-semibold text-gold-light">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
