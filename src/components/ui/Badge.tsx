import { cn } from "@/lib/utils";
import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "good" | "poor" | "warning" | "neutral";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default:
            "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
            "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        good: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25",
        poor: "border-transparent bg-rose-500/15 text-rose-700 dark:text-rose-400 hover:bg-rose-500/25",
        warning: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25",
        neutral: "border-transparent bg-gray-500/15 text-gray-700 dark:text-gray-400 hover:bg-gray-500/25",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
