import { cn } from "@repo/shared-utils";
import { forwardRef, HTMLAttributes } from "react";

export const H1 = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <h1 className={cn("text-4xl font-bold", className)} {...props} ref={ref} />
    ),
);

export const H2 = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <h2 className={cn("text-3xl font-bold", className)} {...props} ref={ref} />
    ),
);

export const H3 = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <h3 className={cn("text-xl font-bold", className)} {...props} ref={ref} />
    ),
);

export const H4 = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <h4 className={cn("text-xl font-semibold text-gray-500", className)} {...props} ref={ref} />
    ),
);

export const P = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <p className={cn("text-base", className)} {...props} ref={ref} />
    ),
);
