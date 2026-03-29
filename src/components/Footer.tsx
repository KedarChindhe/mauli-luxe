import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-dark border-t border-dark-border">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold text-gradient-gold mb-4">MAULI</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Custom footwear made just for you. Premium quality, handcrafted with passion.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-gold-light mb-4 uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ to: "/", label: "Home" }, { to: "/shop", label: "Shop" }, { to: "/favorites", label: "Favorites" }, { to: "/contact", label: "Contact" }].map(l => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-gold transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-gold-light mb-4 uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-gold" /> 91122 89149</div>
            <div className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-gold" /> info@maulifootwear.com</div>
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-gold" /> Mauli Footwear Shakha No. 3, Jakat Naka, Dighi, Pune 412105</div>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-dark-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mauli Footwear. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
