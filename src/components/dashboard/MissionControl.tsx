"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Battery, Users, Zap, Maximize, ArrowLeft, Grid, Map as MapIcon, Layers, Play, Pause, Rewind, FastForward, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Static definitions
const sectors = [
    { id: "lincoln", name: "Lincoln High", x: 25, y: 35, baseColor: "emerald" },
    { id: "washington", name: "Washington Middle", x: 65, y: 55, baseColor: "amber" },
    { id: "roosevelt", name: "Roosevelt Elem", x: 80, y: 20, baseColor: "emerald" },
    { id: "eastside", name: "Eastside Prep", x: 35, y: 75, baseColor: "blue" },
];

const sparkData = [
    { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }
];

const classrooms = Array.from({ length: 12 }, (_, i) => ({
    id: `room-${i}`,
    name: `Room ${101 + i}`,
    activity: Math.floor(Math.random() * 100),
    status: Math.random() > 0.8 ? "quiet" : "active",
    subject: ["Math", "Science", "History", "English"][Math.floor(Math.random() * 4)]
}));

export function MissionControl() {
    const [viewMode, setViewMode] = useState<"ORBIT" | "SURFACE">("ORBIT");
    const [selectedSector, setSelectedSector] = useState<typeof sectors[0] | null>(null);
    const [hoveredSector, setHoveredSector] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Time Travel State
    const [sliderValue, setSliderValue] = useState(100); // 100 = Live (Now)
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Playback Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setSliderValue(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 100;
                    }
                    return prev + 0.5;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Derived Time Logic (0% = 8AM, 100% = 4PM)
    const formatTime = (val: number) => {
        if (val === 100) return "LIVE NOW";
        const hour = 8 + Math.floor((val / 100) * 8);
        const minutes = Math.floor(((val / 100) * 8 * 60) % 60);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };

    // Simulated "Historical" Data based on sliderValue
    const getSectorState = (sector: typeof sectors[0]) => {
        const time = sliderValue;

        // Scenario 1: Lincoln High Incident (30% - 50%)
        if (sector.id === "lincoln" && time > 30 && time < 50) {
            return { status: "warning", signal: 45, sessions: 38, color: "amber" };
        }
        // Scenario 2: Washington Network Drop (70% - 80%)
        if (sector.id === "washington" && time > 70 && time < 80) {
            return { status: "critical", signal: 12, sessions: 5, color: "red" };
        }

        // Default / Live State
        // Add some noise based on time
        const noise = Math.sin(time + sector.x) * 10;
        return {
            status: "active",
            signal: Math.min(100, Math.floor(85 + noise)),
            sessions: Math.floor(40 + noise),
            color: "emerald" // Default to good
        };
    };

    const handleSectorClick = (sector: typeof sectors[0]) => {
        setSelectedSector(sector);
        setViewMode("SURFACE");
    };

    const handleReturnToOrbit = () => {
        setViewMode("ORBIT");
        setTimeout(() => setSelectedSector(null), 800);
    };

    const isLive = sliderValue === 100;


    return (
        <SpotlightCard className="glass-card relative overflow-hidden h-[600px] w-full p-0 border border-border/50 group/card bg-black/40">

            {/* HUD Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between z-30 pointer-events-none">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Mission Control
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${viewMode === 'ORBIT' ? (isLive ? 'bg-emerald-400' : 'bg-amber-400') : 'bg-blue-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${viewMode === 'ORBIT' ? (isLive ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-blue-500'}`}></span>
                        </span>
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest ">
                                {viewMode === "ORBIT" ? "Orbital Sector Scan" : `Surface: ${selectedSector?.name}`}
                            </p>
                            {!isLive && (
                                <Badge variant="warning" className="animate-pulse">DVR REPLAY: {formatTime(sliderValue)}</Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pointer-events-auto flex items-center gap-2">
                    {viewMode === "SURFACE" && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={handleReturnToOrbit}
                            className="flex items-center gap-2 px-4 py-2 bg-background/50 hover:bg-background/80 backdrop-blur border border-border/50 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                        >
                            <ArrowLeft className="w-3 h-3" /> Return to Orbit
                        </motion.button>
                    )}
                </div>
            </div>

            {/* 3D SCENE CONTAINER */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ perspective: "1000px" }}
            >
                {/* Visual Artifacts for Replay Mode */}
                {!isLive && (
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-20 mix-blend-screen bg-repeat opacity-[0.1]" style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)`
                    }} />
                )}

                {/* ORBIT VIEW LAYER (Holographic Map) */}
                <motion.div
                    className="relative w-full h-full"
                    initial={false}
                    animate={{
                        rotateX: viewMode === "SURFACE" ? 0 : 45,
                        scale: viewMode === "SURFACE" ? 3 : 0.85,
                        opacity: viewMode === "SURFACE" ? 0 : 1,
                        filter: viewMode === "SURFACE" ? "blur(20px)" : (isLive ? "blur(0px)" : "sepia(50%) hue-rotate(-30deg) contrast(1.2)"), // VHS Effect on Map
                        y: viewMode === "SURFACE" ? 100 : 0
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        transformStyle: "preserve-3d",
                        pointerEvents: viewMode === "SURFACE" ? "none" : "auto",
                        transformOrigin: "center center"
                    }}
                >
                    {/* Holographic Grid Floor */}
                    <div
                        className="absolute inset-[-50%] w-[200%] h-[200%] bg-[size:40px_40px] pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)",
                            transform: "rotateX(0deg) translateZ(0px)"
                        }}
                    />

                    {/* Subtle Radial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* Sectors */}
                    {sectors.map((sector) => {
                        const state = getSectorState(sector);
                        const isWarning = state.status === "warning" || state.status === "critical";

                        return (
                            <motion.div
                                key={sector.id}
                                className="absolute cursor-pointer group"
                                style={{
                                    left: `${sector.x}%`,
                                    top: `${sector.y}%`,
                                    transform: "translateZ(30px)",
                                    transformStyle: "preserve-3d"
                                }}
                                whileHover={{ scale: 1.1, translateZ: "60px" }}
                                onClick={() => handleSectorClick(sector)}
                                onMouseEnter={() => setHoveredSector({ ...sector, ...state })}
                                onMouseLeave={() => setHoveredSector(null)}
                            >
                                {/* Vertical "Pin" Line */}
                                <div
                                    className={`absolute top-1/2 left-1/2 w-[1px] h-[60px] bg-gradient-to-t from-transparent to-current origin-bottom transition-colors duration-300 ${isWarning ? 'text-amber-500' : 'text-primary/60'}`}
                                    style={{
                                        transform: "rotateX(-90deg) translateY(30px) translateZ(-30px)",
                                        transformOrigin: "bottom center"
                                    }}
                                />

                                {/* Ping */}
                                <div className={`absolute -inset-8 rounded-full opacity-20 animate-ping transition-colors duration-300 ${isWarning ? "bg-amber-500" : "bg-emerald-500"
                                    }`} />

                                {/* Core Node */}
                                <div className={`relative w-4 h-4 rounded-full border border-white/50 shadow-[0_0_30px_currentColor] backdrop-blur-sm transition-all duration-300 ${isWarning ? "bg-amber-500/80 shadow-amber-500/50 text-amber-500" : "bg-emerald-500/80 shadow-emerald-500/50 text-emerald-500"
                                    }`} />

                                {/* Floating Label */}
                                <div
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                                    style={{ transform: "translateZ(50px)" }}
                                >
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-bold bg-black/80 text-white px-2 py-1 rounded border border-white/20 shadow-xl backdrop-blur-md">
                                            {sector.name}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Dynamic Connection Lines (SVG) - Rendered flat on the "floor" */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 visible" style={{ transform: "translateZ(1px)" }}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="var(--primary)" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <line x1="25%" y1="35%" x2="65%" y2="55%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                        <line x1="65%" y1="55%" x2="80%" y2="20%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                        <line x1="25%" y1="35%" x2="35%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                    </svg>
                </motion.div>
            </div>


            {/* SURFACE VIEW LAYER (Blueprint) */}
            <motion.div
                className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: viewMode === "SURFACE" ? 1 : 0,
                    scale: viewMode === "SURFACE" ? 1 : 0.95,
                    pointerEvents: viewMode === "SURFACE" ? "auto" : "none"
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {selectedSector && (
                    <div className="h-full w-full p-8 pt-24 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto pb-32">
                        {/* Blueprint Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:20px_20px]"
                            style={{ backgroundImage: "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)" }}
                        />
                        {classrooms.map((room, i) => (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.05) }}
                                className="relative bg-card/20 border border-white/10 hover:border-primary/50 transition-all rounded-sm p-4 flex flex-col justify-between cursor-pointer group hover:bg-white/5 active:scale-95 duration-200"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Sector {selectedSector.id.substring(0, 3).toUpperCase()}</span>
                                        <span className="text-sm font-bold text-foreground">{room.name}</span>
                                    </div>
                                    <Badge variant={room.status === "active" ? "neutral" : "outline"} className="text-[10px] h-5">
                                        {room.subject}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-muted-foreground">
                                        <span>Audio Level</span>
                                        <span>{room.activity}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${room.activity}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className={`h-full rounded-full ${room.activity > 80 ? 'bg-amber-500' : 'bg-primary'}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* DVR Scrubber Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10">
                <div className="p-4 flex items-center gap-4">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
                    >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                            <span>08:00 AM</span>
                            <span className={isLive ? "text-emerald-500 font-bold" : "text-amber-500 font-bold animate-pulse"}>
                                {formatTime(sliderValue)}
                            </span>
                            <span>04:00 PM</span>
                        </div>
                        <div className="relative h-2 bg-secondary/30 rounded-full cursor-pointer group">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderValue}
                                onChange={(e) => setSliderValue(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {/* Progress Fill */}
                            <div
                                className={`absolute top-0 left-0 h-full rounded-full ${isLive ? 'bg-primary' : 'bg-amber-500'}`}
                                style={{ width: `${sliderValue}%` }}
                            />
                            {/* Thumb (Visual only) */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg pointer-events-none transition-transform group-hover:scale-125"
                                style={{ left: `${sliderValue}%`, transform: 'translate(-50%, -50%)' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setSliderValue(100)}
                        className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${isLive
                                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50'
                                : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10'
                            }`}
                    >
                        LIVE
                    </button>
                </div>
            </div>

            {/* Hover Tooltip - Updates with Simulated Data */}
            {hoveredSector && viewMode === "ORBIT" && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute bottom-20 right-6 z-30 w-64 bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-2xl pointer-events-none"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold">{hoveredSector.name}</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                {!isLive && <Clock className="w-3 h-3" />}
                                {isLive ? "Live Metrics" : "Historical State"}
                            </p>
                        </div>
                        <Badge variant={hoveredSector.status === "active" ? "good" : (hoveredSector.status === "critical" ? "destructive" : "warning")}>
                            {hoveredSector.signal}% Sig
                        </Badge>
                    </div>
                </motion.div>
            )}

        </SpotlightCard>
    );
}
