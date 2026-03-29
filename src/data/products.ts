export interface Product {
  id: string;
  name: string;
  price: number;
  category: "chappal" | "shoes" | "custom";
  sizes: number[];
  images: string[];
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Royal Gold Chappal",
    price: 1299,
    category: "chappal",
    sizes: [6, 7, 8, 9, 10],
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop"],
    description: "Handcrafted premium chappal with gold-tone accents. Perfect for festive occasions and daily luxury comfort.",
    featured: true,
  },
  {
    id: "p2",
    name: "Urban Street Sneaker",
    price: 2499,
    category: "shoes",
    sizes: [7, 8, 9, 10, 11],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"],
    description: "Modern street-style sneaker with breathable mesh upper and cushioned sole for all-day comfort.",
    featured: true,
  },
  {
    id: "p3",
    name: "Classic Leather Sandal",
    price: 999,
    category: "chappal",
    sizes: [6, 7, 8, 9, 10],
    images: ["https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&h=600&fit=crop"],
    description: "Genuine leather sandal with hand-stitched details. Timeless style meets everyday comfort.",
    featured: true,
  },
  {
    id: "p4",
    name: "Midnight Runner",
    price: 3499,
    category: "shoes",
    sizes: [7, 8, 9, 10, 11, 12],
    images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"],
    description: "High-performance running shoes with advanced cushioning technology and sleek midnight design.",
    featured: true,
  },
  {
    id: "p5",
    name: "Ethnic Kolhapuri",
    price: 899,
    category: "chappal",
    sizes: [6, 7, 8, 9, 10],
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop"],
    description: "Traditional Kolhapuri chappal with modern twist. Handmade with premium materials.",
  },
  {
    id: "p6",
    name: "Executive Oxford",
    price: 4999,
    category: "shoes",
    sizes: [7, 8, 9, 10, 11],
    images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop"],
    description: "Premium formal oxford shoes crafted from finest Italian leather. Perfect for the modern professional.",
  },
  {
    id: "p7",
    name: "Custom Design Special",
    price: 1999,
    category: "custom",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop"],
    description: "Design your dream footwear. Choose colors, materials, and style — we bring your vision to life.",
    featured: true,
  },
  {
    id: "p8",
    name: "Sport Flex Trainer",
    price: 2999,
    category: "shoes",
    sizes: [7, 8, 9, 10, 11],
    images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"],
    description: "Lightweight training shoes with flexible sole and superior grip for intense workouts.",
  },
];
