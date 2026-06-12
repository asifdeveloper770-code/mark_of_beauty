import logoAsset from "@/assets/mark_logo.png";

export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? "h-16 md:h-20" : size === "sm" ? "h-10" : "h-12 md:h-14";
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoAsset}
        alt="Mark of Beauty Cosmetics"
        className={`${h} w-auto object-contain mix-blend-multiply select-none`}
        draggable={false}
      />
    </div>
  );
}
