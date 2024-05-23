import { cn } from "@/lib/utils";

interface ErrorComponentProps {
  message: string | any;
  className?: string;
}

export default function Error({ message, className }: ErrorComponentProps) {
  return (
    <>
      {message && (
        <span
          className={cn(
            "mt-0 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block",
            className
          )}
        >
          {message}
        </span>
      )}
    </>
  );
}
