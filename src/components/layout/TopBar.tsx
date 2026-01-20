"use client";

import { motion } from "framer-motion";
import { Search, Bell, Users, Wifi, Activity, AlertCircle } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
    totalSessions?: number;
    totalTutors?: number;
    avgConnection?: number;
    criticalCount?: number;
    warningCount?: number;
    onSearchClick?: () => void;
}

export function TopBar({
    totalSessions = 71,
    totalTutors = 49,
    avgConnection = 87,
    criticalCount = 1,
    warningCount = 2,
    onSearchClick
}: TopBarProps) {
    const [notifications] = useState([
        { id: 1, text: "Central Alternative HS: Connection critical", type: "critical" },
        { id: 2, text: "Washington Middle: 2 alerts pending", type: "warning" },
        { id: 3, text: "New tutor onboarding: 3 candidates ready", type: "info" }
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-30"
        >
            {/* Left: Quick Stats */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-500">{totalSessions}</span>
                    <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{totalTutors}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{avgConnection}%</span>
                </div>
            </div>

            {/* Center: Search */}
            <button
                onClick={onSearchClick}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary transition-all group min-w-[300px]"
            >
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm text-muted-foreground flex-1 text-left">Search schools, tutors, students...</span>
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-background/80 border border-border rounded text-muted-foreground">
                    ⌘K
                </kbd>
            </button>

            {/* Right: Alerts + Notifications */}
            <div className="flex items-center gap-3">
                {/* Alert badges */}
                {criticalCount > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {criticalCount} Critical
                    </div>
                )}
                {warningCount > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {warningCount} Attention
                    </div>
                )}

                {/* Notification Bell */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                        >
                            <div className="px-4 py-3 border-b border-border">
                                <h3 className="font-semibold text-sm">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/30 cursor-pointer transition-colors ${notif.type === "critical" ? "bg-rose-500/5" :
                                                notif.type === "warning" ? "bg-amber-500/5" : ""
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.type === "critical" ? "bg-rose-500" :
                                                    notif.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                                                }`} />
                                            <span className="text-sm">{notif.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-border bg-secondary/30">
                                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center">
                                    View all notifications
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
