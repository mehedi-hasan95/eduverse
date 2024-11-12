import { cn } from "@/lib/utils";

export const Radial = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("radial-gradient", className)}>{children}</div>;
};
