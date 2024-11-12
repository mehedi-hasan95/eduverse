import { cn } from "@/lib/utils";

interface Props {
  title: string;
  className?: string;
  message?: string;
  messageClass?: string;
}
export const Headdings = ({
  title,
  messageClass,
  className,
  message,
}: Props) => {
  return (
    <div>
      <h2 className={cn("text-2xl font-bold", className)}>{title}</h2>
      <p className={messageClass}>{message}</p>
    </div>
  );
};
