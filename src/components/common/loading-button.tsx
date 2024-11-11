import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export function LoadingButton({ className }: Props) {
  return (
    <Button disabled>
      <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", className)} />
      Please wait
    </Button>
  );
}
