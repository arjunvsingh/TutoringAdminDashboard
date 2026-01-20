"use client";

import { motion } from "framer-motion";
import { Clock, Flag, ChevronRight, Gauge } from "lucide-react";
import { useState } from "react";

interface StatusFooterProps {
    usedHours?: number;
    totalHours?: number;
    flaggedCount?: number;
}

export function StatusFooter({
    usedHours = 4500,
    totalHours = 10000,
    flaggedCount = 3
}: StatusFooterProps) {
    const percentage = Math.round((usedHours / totalHours) * 100);
    const [showFlagged, setShowFlagged] = useState(false);

    const flaggedItems = [
        { id: 1, issue: "Late Start (+10m)", student: "Jordan P.", time: "10:30 AM" },
        { id: 2, issue: "Low Rating (2/5)", student: "Emma W.", time: "Yesterday" },
        { id: 3, issue: "Video Disconnect", student: "Lucas T.", time: "Yesterday" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 md:left-64 border-t border-border/50 bg-background/90 backdrop-blur-md z-30"
        >
            <div className="flex items-center justify-between px-8 py-4">
                {/* Left: Contract Utilization */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 transform -rotate-90">
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    fill="none"
                                    className="text-secondary"
                                />
                                <circle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    fill="none"
                                    strokeDasharray={`${percentage} 100`}
                                    className={`${percentage > 80 ? "text-amber-500" :
                                        percentage > 90 ? "text-rose-500" : "text-primary"
                                        }`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold">{percentage}%</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-semibold">Contract Hours</div>
                            <div className="text-sm text-muted-foreground">
                                {usedHours.toLocaleString()} / {totalHours.toLocaleString()} used
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Runway */}
                <div className="hidden md:flex items-center gap-3 text-base text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>Est. runway: <span className="font-semibold text-foreground">June 12, 2026</span></span>
                </div>

                {/* Right: Flagged Sessions */}
                <div className="relative">
                    <button
                        onClick={() => setShowFlagged(!showFlagged)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${flaggedCount > 0
                            ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                            }`}
                    >
                        <Flag className="w-5 h-5" />
                        <span className="text-base font-medium">{flaggedCount} Flagged</span>
                        <ChevronRight className={`w-5 h-5 transition-transform ${showFlagged ? "rotate-90" : ""}`} />
                    </button>

                    {/* Flagged Dropdown (opens upward) */}
                    {showFlagged && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-0 bottom-full mb-2 w-72 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                        >
                            <div className="px-4 py-3 border-b border-border">
                                <h3 className="font-semibold text-sm">Needs Review</h3>
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                {flaggedItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/30 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-sm font-medium">{item.issue}</div>
                                                <div className="text-xs text-muted-foreground">{item.student}</div>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-border bg-secondary/30">
                                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center">
                                    View all flagged sessions
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
