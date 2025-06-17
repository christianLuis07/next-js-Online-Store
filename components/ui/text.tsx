import { cn } from "@/lib/utils";

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-3xl mb-5 font-bold text-shop_dark_green capitalize tracking-wide font-sans",
        className
      )}
    >
      {children}
    </h2>
  );
};
