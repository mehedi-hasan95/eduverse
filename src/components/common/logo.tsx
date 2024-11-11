import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  className?: string;
};
export const Logo = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={cn("text-xl md:text-2xl font-bold dark:text-white", className)}
    >
      Logo
    </Link>
  );
};
