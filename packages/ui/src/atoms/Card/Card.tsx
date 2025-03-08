"use client";

import type { CardProps } from "./Card.types.ts";
import { forwardRef } from "react";
import { cn } from "@repo/shared-utils";

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn("h-full w-full rounded-md border p-4", className)}
            {...props}
            ref={ref}
        ></div>
    );
});

Card.displayName = "Card";

export default Card;
