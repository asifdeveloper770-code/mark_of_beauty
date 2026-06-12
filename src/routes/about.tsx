import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Leaf, Sparkles } from "lucide-react";
import communityImg from "@/assets/community.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Faith — Mark of Beauty Cosmetics" },
      { name: "description", content: "The story behind Mark of Beauty Cosmetics — faith-inspired beauty, made with grace for the modern woman." },
      { property: "og:title", content: "Our Faith — Mark of Beauty Cosmetics" },
      { property: "og:description", content: "The story behind our faith-inspired cosmetics." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="gradient-hero">
        <div className="mx-auto max-w-4xl px-5 py-20 md:py-28 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Our Faith</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">
            Beauty is a <span className="font-script text-gradient-rose">love letter</span> from the Maker.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mark of Beauty Cosmetics began with a single quiet conviction — that the woman in the
            mirror is already beloved. Our products are not meant to add to her; they are meant to
            celebrate her.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-petal">
          <img src={communityImg} alt="Community of women" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="space-y-6">
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            For her, with <span className="font-script text-gradient-rose">intention</span>.
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            We are a small house of formulators, mothers, daughters and sisters who believe that
            faith and femininity are not opposites — they are sisters. Every product is hand-tested,
            cruelty-free, and crafted from clean ingredients you can read aloud without flinching.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            From our morning prayer over the lab bench to the little scripture card tucked inside
            every package, beauty is our quiet ministry.
          </p>
          <blockquote className="font-script text-2xl text-primary border-l-2 border-primary pl-5">
            "You are altogether beautiful, my darling; there is no flaw in you." — Song of Songs 4:7
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl">Our <span className="font-script text-gradient-rose">promises</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { Icon: Leaf, title: "Clean & honest", text: "Plant-based, dermatologist-tested, never anything you can't pronounce." },
            { Icon: Heart, title: "Cruelty-free, always", text: "Never tested on animals. Only on us and the women we love." },
            { Icon: Sparkles, title: "Faith-inspired", text: "Every formula is prayed over, every package sealed with grace." },
          ].map(({ Icon, title, text }, i) => (
            <div key={title} className="rounded-3xl border border-border p-8 bg-card hover-lift animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="h-14 w-14 rounded-full gradient-rose flex items-center justify-center mb-5">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="font-script text-3xl text-primary mb-4">Join the sisterhood</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">Beauty looks better, together.</h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium shadow-soft hover:shadow-petal transition hover:-translate-y-0.5"
        >
          Shop the collection
        </Link>
      </section>
    </div>
  );
}
