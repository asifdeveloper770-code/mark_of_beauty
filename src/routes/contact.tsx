import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mark of Beauty Cosmetics" },
      { name: "description", content: "Reach out to the Mark of Beauty Cosmetics team. We'd love to hear from you." },
      { property: "og:title", content: "Contact — Mark of Beauty Cosmetics" },
      { property: "og:description", content: "Reach out to the Mark of Beauty team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);
  const handle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent. We'll reply with love soon 💌");
    }, 900);
  };

  return (
    <div>
      <section className="gradient-hero">
        <div className="mx-auto max-w-4xl px-5 py-20 md:py-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Say Hello</p>
          <h1 className="font-display text-5xl md:text-6xl">
            We'd <span className="font-script text-gradient-rose">love</span> to hear from you.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Questions, prayer requests, or shade matches — our door is always open.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {[
            { Icon: Mail, label: "Email", value: "hello@markofbeauty.co" },
            { Icon: Phone, label: "Phone", value: "+1 (800) 555-0199" },
            { Icon: MapPin, label: "Studio", value: "Atlanta, Georgia" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 p-5 rounded-3xl border border-border bg-card hover-lift">
              <div className="h-12 w-12 rounded-full gradient-rose flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
                <p className="font-display text-lg mt-0.5">{value}</p>
              </div>
            </div>
          ))}
          <blockquote className="font-script text-xl text-primary px-5 border-l-2 border-primary">
            "Let your light so shine before others, that they may see your good works." — Matthew 5:16
          </blockquote>
        </div>

        <form onSubmit={handle} className="lg:col-span-3 space-y-5 p-8 rounded-3xl border border-border bg-card">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</span>
              <input required className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</span>
              <input type="email" required className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Subject</span>
            <input className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</span>
            <textarea required rows={6} className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none" />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground text-sm font-medium shadow-soft hover:shadow-petal transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {sending ? "Sending..." : <>Send message <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </section>
    </div>
  );
}
