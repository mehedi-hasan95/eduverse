import { cn } from "@/lib/utils";

export const TextGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("text-gradient", className)}>{children}</div>;
};
