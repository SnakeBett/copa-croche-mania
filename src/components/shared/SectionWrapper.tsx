import { cn } from "@/lib/utils";

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
} as const;

const bgMap = {
  default: "",
  card: "bg-card",
} as const;

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  maxWidth?: keyof typeof maxWidthMap;
  bg?: keyof typeof bgMap;
  className?: string;
  style?: React.CSSProperties;
  center?: boolean;
}

const SectionWrapper = ({
  id,
  children,
  maxWidth = "xl",
  bg = "default",
  className,
  style,
  center = false,
}: SectionWrapperProps) => (
  <section
    id={id}
    className={cn("py-16 md:py-24 px-4", bgMap[bg], className)}
    style={style}
  >
    <div
      className={cn(
        maxWidthMap[maxWidth],
        "mx-auto",
        center && "text-center",
        "space-y-10",
      )}
    >
      {children}
    </div>
  </section>
);

export default SectionWrapper;
