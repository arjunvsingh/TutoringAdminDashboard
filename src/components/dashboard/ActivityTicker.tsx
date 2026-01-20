"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Zap } from "lucide-react";

const activities = [
    { id: 1, text: "Lincoln High: Attendance at 98%", icon: CheckCircle, color: "text-emerald-500" },
    { id: 2, text: "System Alert: High latency in region US-East", icon: AlertCircle, color: "text-amber-500" },
    { id: 3, text: "New Tutor Onboarding: 12 candidates pending", icon: Zap, color: "text-blue-500" },
    { id: 4, text: "Physics 101: Negative sentiment detected", icon: AlertCircle, color: "text-rose-500" },
    { id: 5, text: "Washington Middle: Budget cap reached", icon: AlertCircle, color: "text-amber-500" },
];

export function ActivityTicker() {
    return (
        <div className="w-full bg-secondary/30 border-y border-border/50 overflow-hidden h-10 flex items-center">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-16 px-4"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                >
                    {[...activities, ...activities, ...activities].map((activity, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            <activity.icon className={`w-4 h-4 ${activity.color}`} />
                            <span>{activity.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
