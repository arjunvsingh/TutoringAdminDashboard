"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Users,
    Signal,
    Clock,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    ChevronRight,
    Activity,
    Wifi,
    WifiOff
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// School data with realistic metrics
const schools = [
    {
        id: "lincoln",
        name: "Lincoln High School",
        type: "High School",
        activeSessions: 12,
        totalTutors: 8,
        avgSessionLength: "45m",
        status: "excellent",
        connectionStrength: 98,
        todayHours: 14.5,
        alerts: 0,
        trending: "+12%",
        subjects: ["Algebra II", "Chemistry", "Physics", "Calculus"],
        recentActivity: "Session started 2m ago"
    },
    {
        id: "washington",
        name: "Washington Middle",
        type: "Middle School",
        activeSessions: 8,
        totalTutors: 5,
        avgSessionLength: "40m",
        status: "warning",
        connectionStrength: 72,
        todayHours: 9.2,
        alerts: 2,
        trending: "+5%",
        subjects: ["Pre-Algebra", "Earth Science", "English"],
        recentActivity: "Connection issue detected"
    },
    {
        id: "roosevelt",
        name: "Roosevelt Elementary",
        type: "Elementary",
        activeSessions: 6,
        totalTutors: 4,
        avgSessionLength: "30m",
        status: "excellent",
        connectionStrength: 95,
        todayHours: 6.8,
        alerts: 0,
        trending: "+18%",
        subjects: ["Math Basics", "Reading", "Science"],
        recentActivity: "All sessions running smoothly"
    },
    {
        id: "eastside",
        name: "Eastside Prep Academy",
        type: "Private",
        activeSessions: 4,
        totalTutors: 3,
        avgSessionLength: "50m",
        status: "excellent",
        connectionStrength: 99,
        todayHours: 5.5,
        alerts: 0,
        trending: "+8%",
        subjects: ["AP Calculus", "AP Physics", "SAT Prep"],
        recentActivity: "Session ending in 5m"
    }
];

function StatusIndicator({ status }: { status: string }) {
    if (status === "excellent") {
        return (
            <div className="flex items-center gap-1.5 text-emerald-500">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium">Excellent</span>
            </div>
        );
    }
    if (status === "warning") {
        return (
            <div className="flex items-center gap-1.5 text-amber-500">
                <span className="relative flex h-2 w-2">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-medium">Attention</span>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1.5 text-rose-500">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-xs font-medium">Critical</span>
        </div>
    );
}

function ConnectionBar({ strength }: { strength: number }) {
    const bars = 5;
    const filledBars = Math.ceil((strength / 100) * bars);
    const getColor = () => {
        if (strength >= 90) return "bg-emerald-500";
        if (strength >= 70) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: bars }).map((_, i) => (
                <div
                    key={i}
                    className={`w-1 rounded-sm transition-all ${i < filledBars ? getColor() : "bg-muted-foreground/20"
                        }`}
                    style={{ height: `${8 + i * 3}px` }}
                />
            ))}
            <span className="ml-1.5 text-xs text-muted-foreground">{strength}%</span>
        </div>
    );
}

function LiveSessionCounter({ count }: { count: number }) {
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        // Animate count up on mount
        let current = 0;
        const step = Math.ceil(count / 20);
        const interval = setInterval(() => {
            current += step;
            if (current >= count) {
                setDisplayCount(count);
                clearInterval(interval);
            } else {
                setDisplayCount(current);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="relative">
            <div className="text-4xl font-bold tabular-nums tracking-tight">
                {displayCount}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                Active Sessions
            </div>
        </div>
    );
}

function SchoolCard({ school, index }: { school: typeof schools[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    const borderColor = school.status === "excellent"
        ? "border-emerald-500/20 hover:border-emerald-500/40"
        : school.status === "warning"
            ? "border-amber-500/20 hover:border-amber-500/40"
            : "border-rose-500/20 hover:border-rose-500/40";

    const glowColor = school.status === "excellent"
        ? "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        : school.status === "warning"
            ? "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
            : "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative bg-card/50 backdrop-blur-sm border rounded-xl p-5 cursor-pointer transition-all duration-300 ${borderColor} ${glowColor}`}
        >
            {/* Animated border glow on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: school.status === "excellent"
                        ? "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 50%)"
                        : school.status === "warning"
                            ? "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, transparent 50%)"
                            : "linear-gradient(135deg, rgba(244,63,94,0.05) 0%, transparent 50%)"
                }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {school.name}
                        </h3>
                        {school.alerts > 0 && (
                            <Badge variant="warning" className="text-[10px] h-5">
                                {school.alerts} Alert{school.alerts > 1 ? "s" : ""}
                            </Badge>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{school.type}</p>
                </div>
                <StatusIndicator status={school.status} />
            </div>

            {/* Main Metrics Row */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <LiveSessionCounter count={school.activeSessions} />
                </div>
                <div>
                    <div className="flex items-center gap-1.5 text-2xl font-bold">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {school.totalTutors}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                        Tutors Online
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-1.5 text-2xl font-bold tabular-nums">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {school.todayHours}h
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                        Hours Today
                    </div>
                </div>
            </div>

            {/* Connection & Trend Row */}
            <div className="flex items-center justify-between py-3 border-t border-border/50">
                <div className="flex items-center gap-3">
                    {school.connectionStrength >= 70 ? (
                        <Wifi className="w-4 h-4 text-muted-foreground" />
                    ) : (
                        <WifiOff className="w-4 h-4 text-amber-500" />
                    )}
                    <ConnectionBar strength={school.connectionStrength} />
                </div>
                <div className="flex items-center gap-1 text-emerald-500">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{school.trending}</span>
                </div>
            </div>

            {/* Subject Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
                {school.subjects.slice(0, 3).map((subject) => (
                    <span
                        key={subject}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50 text-muted-foreground"
                    >
                        {subject}
                    </span>
                ))}
                {school.subjects.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50 text-muted-foreground">
                        +{school.subjects.length - 3} more
                    </span>
                )}
            </div>

            {/* Recent Activity Footer */}
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity className="w-3 h-3" />
                    {school.recentActivity}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Live Activity Pulse (visible on excellent status) */}
            {school.status === "excellent" && school.activeSessions > 0 && (
                <motion.div
                    className="absolute top-3 right-3 w-8 h-8"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-full h-full rounded-full bg-emerald-500/10" />
                </motion.div>
            )}
        </motion.div>
    );
}

export function SchoolStatusGrid() {
    const totalSessions = schools.reduce((sum, s) => sum + s.activeSessions, 0);
    const totalTutors = schools.reduce((sum, s) => sum + s.totalTutors, 0);
    const avgConnection = Math.round(schools.reduce((sum, s) => sum + s.connectionStrength, 0) / schools.length);

    return (
        <div className="space-y-6">
            {/* Header with summary stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Signal className="w-5 h-5 text-primary" />
                        School Status
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Real-time overview of all connected schools
                    </p>
                </div>

                {/* Summary Pills */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium">{totalSessions} Active</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{totalTutors} Tutors</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                        <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{avgConnection}% Avg</span>
                    </div>
                </div>
            </div>

            {/* School Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schools.map((school, index) => (
                    <SchoolCard key={school.id} school={school} index={index} />
                ))}
            </div>
        </div>
    );
}
