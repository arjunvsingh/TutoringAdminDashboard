"use client";

import { motion } from "framer-motion";

export function LightRays() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-1">
            {/* Primary rotating ray group */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ transformOrigin: "50% 120%" }}
            >
                {/* Ray 1 */}
                <div
                    className="absolute left-1/4 top-0 w-[2px] h-[150%] opacity-[0.03]"
                    style={{
                        background: "linear-gradient(to bottom, transparent, #10b981 30%, #10b981 70%, transparent)",
                        transform: "rotate(-15deg)",
                        transformOrigin: "bottom center"
                    }}
                />
                {/* Ray 2 */}
                <div
                    className="absolute left-1/2 top-0 w-[3px] h-[150%] opacity-[0.04]"
                    style={{
                        background: "linear-gradient(to bottom, transparent, #14b8a6 20%, #14b8a6 80%, transparent)",
                        transform: "rotate(5deg)",
                        transformOrigin: "bottom center"
                    }}
                />
                {/* Ray 3 */}
                <div
                    className="absolute left-3/4 top-0 w-[2px] h-[150%] opacity-[0.03]"
                    style={{
                        background: "linear-gradient(to bottom, transparent, #06b6d4 40%, #06b6d4 60%, transparent)",
                        transform: "rotate(20deg)",
                        transformOrigin: "bottom center"
                    }}
                />
            </motion.div>

            {/* Secondary ray group (slower, opposite direction) */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{
                    duration: 90,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ transformOrigin: "60% 100%" }}
            >
                {/* Ray 4 */}
                <div
                    className="absolute left-[40%] top-0 w-[1px] h-[140%] opacity-[0.02]"
                    style={{
                        background: "linear-gradient(to bottom, transparent, #0ea5e9 30%, #0ea5e9 70%, transparent)",
                        transform: "rotate(-25deg)",
                        transformOrigin: "bottom center"
                    }}
                />
                {/* Ray 5 */}
                <div
                    className="absolute left-[60%] top-0 w-[2px] h-[140%] opacity-[0.025]"
                    style={{
                        background: "linear-gradient(to bottom, transparent, #10b981 25%, #10b981 75%, transparent)",
                        transform: "rotate(15deg)",
                        transformOrigin: "bottom center"
                    }}
                />
            </motion.div>

            {/* Soft radial glow at center-bottom (light source) */}
            <div
                className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[150%] h-[60%] opacity-[0.04]"
                style={{
                    background: "radial-gradient(ellipse at center, #14b8a6 0%, transparent 70%)"
                }}
            />
        </div>
    );
}
