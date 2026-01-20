"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    angle?: number;
}

export function RetroGrid({ className, angle = 65, ...props }: RetroGridProps) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute h-full w-full overflow-hidden opacity-[0.5] [perspective:200px]",
                className,
            )}
            style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
            {...props}
        >
            {/* Grid Plane */}
            <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
                <div
                    className={cn(
                        "animate-grid",
                        "[background-repeat:repeat] [background-size:60px_60px]",
                        "[height:300%] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600%]",
                        // Light Styles
                        "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",
                        // Dark Styles
                        "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
                    )}
                />
            </div>

            {/* Horizon Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90% pointer-events-none" />
        </div>
    );
}
