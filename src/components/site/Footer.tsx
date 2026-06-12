import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
            Cosmetics crafted with grace for the woman who carries her light wherever she goes.
            Every formula is a quiet prayer of beauty.
          </p>
          <div className="flex gap-2">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Facebook, href: "#" },
              { Icon: Mail, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="h-10 w-10 rounded-full border border-border inline-flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-foreground mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="story-link hover:text-primary">All Products</Link></li>
            <li><Link to="/shop" className="story-link hover:text-primary">Skin</Link></li>
            <li><Link to="/shop" className="story-link hover:text-primary">Lips</Link></li>
            <li><Link to="/shop" className="story-link hover:text-primary">Fragrance</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-foreground mb-4">House</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="story-link hover:text-primary">Our Faith</Link></li>
            <li><Link to="/contact" className="story-link hover:text-primary">Contact</Link></li>
            <li><a className="story-link hover:text-primary" href="#">Shipping</a></li>
            <li><a className="story-link hover:text-primary" href="#">Returns</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mark of Beauty Cosmetics. Made with grace.</p>
          <p className="font-script text-primary text-base">"She is clothed with strength and dignity." — Proverbs 31:25</p>
        </div>
      </div>
    </footer>
  );
}
