"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TelemetryHUD() {
    const [time, setTime] = useState(new Date());
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [fps, setFps] = useState(60);
    const [showColon, setShowColon] = useState(true);

    useEffect(() => {
        // Time update
        const timeInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Blinking colon
        const colonInterval = setInterval(() => {
            setShowColon(prev => !prev);
        }, 500);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        // Simulated FPS counter
        let frameCount = 0;
        let lastTime = performance.now();
        const measureFps = () => {
            frameCount++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                setFps(Math.round(frameCount * 1000 / (now - lastTime)));
                frameCount = 0;
                lastTime = now;
            }
            requestAnimationFrame(measureFps);
        };
        const fpsFrame = requestAnimationFrame(measureFps);

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearInterval(timeInterval);
            clearInterval(colonInterval);
            cancelAnimationFrame(fpsFrame);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const colon = showColon ? ":" : " ";
        return `${hours}${colon}${minutes}${colon}${seconds}`;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        }).toUpperCase();
    };

    const hudItemClass = "font-mono text-[10px] tracking-widest uppercase text-muted-foreground/70";
    const valueClass = "text-emerald-500/80";

    return (
        <>
            {/* Top Left - Time & Date */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="fixed top-4 left-4 z-40 pointer-events-none md:left-[280px]"
            >
                <div className={hudItemClass}>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className={valueClass}>{formatTime(time)}</span>
                    </div>
                    <div className="mt-0.5 opacity-50">
                        {formatDate(time)}
                    </div>
                </div>
            </motion.div>

            {/* Top Right - System Status */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="fixed top-4 right-4 z-40 pointer-events-none"
            >
                <div className={`${hudItemClass} text-right`}>
                    <div className="flex items-center justify-end gap-2">
                        <span>SYS</span>
                        <span className={valueClass}>ONLINE</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="mt-0.5 opacity-50 flex items-center justify-end gap-2">
                        <span>UPLINK</span>
                        <span className="text-teal-500/80">ACTIVE</span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Left - Coordinates */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="fixed bottom-4 left-4 z-40 pointer-events-none md:left-[280px]"
            >
                <div className={hudItemClass}>
                    <div className="flex items-center gap-3">
                        <span>
                            X:<span className={valueClass}>{mousePos.x.toString().padStart(4, "0")}</span>
                        </span>
                        <span>
                            Y:<span className={valueClass}>{mousePos.y.toString().padStart(4, "0")}</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Right - Performance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="fixed bottom-4 right-4 z-40 pointer-events-none"
            >
                <div className={`${hudItemClass} text-right`}>
                    <div className="flex items-center justify-end gap-3">
                        <span>
                            FPS:<span className={fps >= 50 ? valueClass : "text-amber-500/80"}>{fps}</span>
                        </span>
                        <span>
                            MEM:<span className="text-teal-500/80">128MB</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Corner Brackets (decorative) */}
            <div className="fixed inset-0 pointer-events-none z-30">
                {/* Top-left bracket */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l border-t border-emerald-500/20 md:left-[272px]" />
                {/* Top-right bracket */}
                <div className="absolute top-2 right-2 w-8 h-8 border-r border-t border-emerald-500/20" />
                {/* Bottom-left bracket */}
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l border-b border-emerald-500/20 md:left-[272px]" />
                {/* Bottom-right bracket */}
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r border-b border-emerald-500/20" />
            </div>
        </>
    );
}
