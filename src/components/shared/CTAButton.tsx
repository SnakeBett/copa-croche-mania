import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "gradient" | "accent" | "gradient-round";
  className?: string;
  block?: boolean;
  socialProof?: boolean;
}

const variantStyles: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  gradient:
    "bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200",
  accent:
    "bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-200",
  "gradient-round":
    "bg-gradient-to-r from-emerald-700 to-blue-700 hover:from-emerald-800 hover:to-blue-800 text-white font-semibold font-body text-sm md:text-base rounded-full px-8 py-3.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl",
};

const CTAButton = ({
  href,
  children,
  variant = "gradient",
  className,
  block = false,
  socialProof = false,
}: CTAButtonProps) => (
  <div className={cn("inline-flex flex-col items-center gap-2", block && "w-full")}>
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        variantStyles[variant],
        block && "block w-full",
        className,
      )}
    >
      {children}
    </a>
    {socialProof && (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
        <Users className="w-3.5 h-3.5 text-accent" />
        <strong className="text-foreground">689+ alunas</strong> já se inscreveram
      </span>
    )}
  </div>
);

export default CTAButton;
