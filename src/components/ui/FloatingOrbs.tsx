"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    color: string;
    label: string;
    value: string;
}

const generateOrbs = (): Orb[] => {
    const colors = ["#10b981", "#14b8a6", "#06b6d4", "#0ea5e9"];
    const labels = ["Sessions", "Active", "Quality", "Uptime", "Regions", "Tutors"];
    const values = ["42", "98%", "A+", "99.9%", "4", "28"];

    return Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 40 + 60,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 5,
        color: colors[i % colors.length],
        label: labels[i],
        value: values[i]
    }));
};

export function FloatingOrbs() {
    const [orbs, setOrbs] = useState<Orb[]>([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setOrbs(generateOrbs());

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className="absolute"
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        transform: `translateY(${scrollY * 0.1 * (orb.id % 3 - 1)}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.1, 1],
                        x: [0, 30, -20, 0],
                        y: [0, -20, 30, 0],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        delay: orb.delay,
                        ease: "easeInOut",
                    }}
                >
                    <div
                        className="relative rounded-full backdrop-blur-sm flex items-center justify-center"
                        style={{
                            width: orb.size,
                            height: orb.size,
                            background: `radial-gradient(circle at 30% 30%, ${orb.color}15, ${orb.color}05)`,
                            border: `1px solid ${orb.color}30`,
                            boxShadow: `0 0 ${orb.size / 2}px ${orb.color}20, inset 0 0 ${orb.size / 4}px ${orb.color}10`,
                        }}
                    >
                        <div className="text-center">
                            <div
                                className="text-[10px] font-mono uppercase tracking-wider opacity-60"
                                style={{ color: orb.color }}
                            >
                                {orb.label}
                            </div>
                            <div
                                className="text-sm font-bold"
                                style={{ color: orb.color }}
                            >
                                {orb.value}
                            </div>
                        </div>
                    </div>

                    {/* Orbiting ring */}
                    <motion.div
                        className="absolute inset-[-10px] rounded-full border opacity-20"
                        style={{ borderColor: orb.color }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: orb.duration * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <div
                            className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
                            style={{ backgroundColor: orb.color }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
