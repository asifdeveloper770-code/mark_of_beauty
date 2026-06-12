import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Heart, Leaf, Star, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import communityImg from "@/assets/community.jpg";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import heroPoster from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mark of Beauty Cosmetics — Faith-inspired beauty for her" },
      { name: "description", content: "Luxury cosmetics crafted with grace for the modern woman. Clean formulas, soft pink palettes, made with faith." },
      { property: "og:title", content: "Mark of Beauty Cosmetics" },
      { property: "og:description", content: "Faith-inspired luxury cosmetics for the modern woman." },
    ],
  }),
  component: Home,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current || shown) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [shown]);
  return { ref, shown };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${className} ${
        shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Home() {
  const featured = products.slice(0, 4);
  const [muted, setMuted] = useState(true);

  return (
    <div className="overflow-hidden">
      {/* HERO with video */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            src={heroVideoAsset.url}
            poster={heroPoster}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Floating accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blush/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          {/* Floating petals */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-3 w-3 rounded-full bg-primary/40 animate-float"
              style={{
                top: `${10 + (i * 11) % 80}%`,
                left: `${(i * 17) % 95}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border text-xs uppercase tracking-[0.25em]">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" /> Faith • Beauty • Grace
            </span>
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl leading-[0.92] tracking-tight">
              <span className="block animate-fade-up" style={{ animationDelay: "100ms" }}>Beauty that wears</span>
              <span className="block font-script text-gradient-rose text-6xl md:text-8xl xl:text-9xl my-1 animate-fade-up" style={{ animationDelay: "300ms" }}>
                grace
              </span>
              <span className="block animate-fade-up" style={{ animationDelay: "500ms" }}>like perfume.</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-md leading-relaxed animate-fade-up" style={{ animationDelay: "700ms" }}>
              Cosmetics crafted with faith for the woman who carries her light wherever she goes.
              Clean. Soft. Unapologetically feminine.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 animate-fade-up" style={{ animationDelay: "900ms" }}>
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium shadow-soft hover:shadow-petal transition-all hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop the collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 animate-shimmer opacity-50" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-7 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                Our story
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 animate-fade-up" style={{ animationDelay: "1100ms" }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-background gradient-rose" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Loved by 12,000+ women</p>
              </div>
            </div>
          </div>

          {/* Video card */}
          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: "400ms" }}>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-petal group">
              <video
                src={heroVideoAsset.url}
                poster={heroPoster}
                autoPlay
                muted={muted}
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-5 right-5 h-12 w-12 rounded-full bg-background/90 backdrop-blur text-foreground inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition shadow-soft"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                <Play className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-4 shadow-soft border border-border max-w-[210px] animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                <Heart className="h-3.5 w-3.5 fill-current" /> Bestseller
              </div>
              <p className="font-display text-base mt-1">Rose Bloom Lipstick</p>
              <p className="text-xs text-muted-foreground">Velvet matte • Petal soft</p>
            </div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full gradient-rose shadow-soft flex items-center justify-center text-primary-foreground font-script text-2xl rotate-12 animate-float">
              new
            </div>
          </div>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Leaf, label: "Clean Formulas", sub: "Plant-based goodness" },
            { icon: Heart, label: "Cruelty-Free", sub: "Always & forever" },
            { icon: Sparkles, label: "Faith-Inspired", sub: "Made with intention" },
            { icon: Star, label: "Free shipping", sub: "On orders over $75" },
          ].map(({ icon: Icon, label, sub }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:rotate-6 transition duration-500">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Bestsellers</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                Petal-soft pieces, <span className="font-script text-gradient-rose">loved</span> by her.
              </h2>
            </div>
            <Link to="/shop" className="story-link text-sm font-medium text-primary">View all products →</Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* FAITH STORY */}
      <section className="relative gradient-rose overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-24 w-24 rounded-full bg-background/10 blur-2xl animate-float"
              style={{ top: `${15 * i}%`, left: `${(i * 19) % 90}%`, animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-petal group">
              <img src={communityImg} alt="Diverse women smiling together" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
            </div>
          </Reveal>
          <Reveal delay={150} className="text-primary-foreground space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">Our heart</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Beauty is a quiet act of <span className="font-script">worship</span>.
            </h2>
            <p className="text-base opacity-90 leading-relaxed max-w-md">
              We believe every woman is wonderfully made. Our formulas are crafted with the same
              care a hymn is sung — gently, intentionally, and always pointing back to the light
              already within her.
            </p>
            <blockquote className="font-script text-2xl border-l-2 border-primary-foreground/60 pl-5">
              "She is clothed with strength and dignity, and she laughs without fear of the future."
              <footer className="text-xs uppercase tracking-[0.25em] mt-2 opacity-80 not-italic font-sans">— Proverbs 31:25</footer>
            </blockquote>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:bg-background/90 transition hover:-translate-y-0.5"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Whispers from her</p>
            <h2 className="font-display text-4xl md:text-5xl">Reviews wrapped in <span className="font-script text-gradient-rose">love</span></h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Hannah R.", text: "The Rose Bloom lipstick is unreal — soft, hydrating, and the color stays all day. This brand feels like a love letter to women." },
            { name: "Naomi T.", text: "I cried unboxing my first order. The packaging, the scripture card — it felt like God wrapped beauty just for me." },
            { name: "Sarah M.", text: "Finally, a clean cosmetic line that looks luxurious AND aligns with my faith. The serum is a literal glow-up." },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="rounded-3xl border border-border bg-card p-7 hover-lift h-full">
                <div className="flex text-gold mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-foreground/85 leading-relaxed">"{t.text}"</p>
                <p className="font-script text-primary text-xl mt-5">— {t.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <Reveal>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-foreground text-background p-10 md:p-16 text-center">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary blur-3xl animate-float" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blush blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
            </div>
            <div className="relative">
              <p className="font-script text-3xl text-primary mb-3">Join the sisterhood</p>
              <h3 className="font-display text-3xl md:text-4xl mb-3">First to know. First to glow.</h3>
              <p className="text-background/70 mb-7 max-w-md mx-auto text-sm">
                Get 10% off your first order, plus early access to drops, devotionals, and limited petal editions.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 rounded-full bg-background/10 border border-background/20 px-5 py-3.5 text-sm placeholder:text-background/50 focus:outline-none focus:border-primary focus:bg-background/15 transition"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90 transition hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
