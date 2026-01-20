"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Users,
    Signal,
    Clock,
    TrendingUp,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    Activity,
    Wifi,
    WifiOff,
    BookOpen,
    Video,
    Flag,
    MessageSquare,
    User,
    GraduationCap
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// ============ DATA TYPES ============

interface TimelineEvent {
    time: string;
    event: string;
}

interface Classroom {
    id: string;
    name: string;
    subject: string;
    student: { name: string; grade: string };
    tutor: { name: string; rating: number };
    status: "active" | "quiet" | "ending";
    duration: string;
    totalTime: string;
    activity: "Speaking" | "Listening" | "Writing" | "Idle";
    connectionStrength: number;
    focusTopic: string;
    timeline: TimelineEvent[];
}

interface School {
    id: string;
    name: string;
    type: string;
    activeSessions: number;
    totalTutors: number;
    avgSessionLength: string;
    status: "excellent" | "warning" | "critical";
    connectionStrength: number;
    todayHours: number;
    alerts: number;
    trending: string;
    subjects: string[];
    recentActivity: string;
    classrooms: Classroom[];
}

// ============ MOCK DATA ============

const schools: School[] = [
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
        recentActivity: "Session started 2m ago",
        classrooms: [
            {
                id: "room-101",
                name: "Room 101",
                subject: "Algebra II",
                student: { name: "Alex M.", grade: "11th" },
                tutor: { name: "Sarah J.", rating: 4.9 },
                status: "active",
                duration: "45m",
                totalTime: "60m",
                activity: "Speaking",
                connectionStrength: 98,
                focusTopic: "Quadratic Equations",
                timeline: [
                    { time: "3:00 PM", event: "Session started" },
                    { time: "3:05 PM", event: "Screen share enabled" },
                    { time: "3:22 PM", event: "Practice problems assigned" },
                    { time: "3:45 PM", event: "Active discussion" }
                ]
            },
            {
                id: "room-102",
                name: "Room 102",
                subject: "Chemistry",
                student: { name: "Jordan K.", grade: "10th" },
                tutor: { name: "Mike T.", rating: 4.7 },
                status: "active",
                duration: "12m",
                totalTime: "60m",
                activity: "Listening",
                connectionStrength: 95,
                focusTopic: "Periodic Table Review",
                timeline: [
                    { time: "3:33 PM", event: "Session started" },
                    { time: "3:35 PM", event: "Concept explanation began" }
                ]
            },
            {
                id: "room-105",
                name: "Room 105",
                subject: "Physics",
                student: { name: "Taylor B.", grade: "12th" },
                tutor: { name: "Emily R.", rating: 4.8 },
                status: "ending",
                duration: "55m",
                totalTime: "60m",
                activity: "Writing",
                connectionStrength: 99,
                focusTopic: "Newton's Laws",
                timeline: [
                    { time: "2:50 PM", event: "Session started" },
                    { time: "3:00 PM", event: "Problem set started" },
                    { time: "3:30 PM", event: "Review phase" },
                    { time: "3:45 PM", event: "Wrapping up" }
                ]
            }
        ]
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
        recentActivity: "Connection issue detected",
        classrooms: [
            {
                id: "room-201",
                name: "Room 201",
                subject: "Pre-Algebra",
                student: { name: "Casey L.", grade: "7th" },
                tutor: { name: "David P.", rating: 4.6 },
                status: "active",
                duration: "30m",
                totalTime: "45m",
                activity: "Speaking",
                connectionStrength: 68,
                focusTopic: "Fractions",
                timeline: [
                    { time: "3:15 PM", event: "Session started" },
                    { time: "3:20 PM", event: "Connection unstable" },
                    { time: "3:25 PM", event: "Reconnected" }
                ]
            },
            {
                id: "room-203",
                name: "Room 203",
                subject: "Earth Science",
                student: { name: "Morgan S.", grade: "8th" },
                tutor: { name: "Lisa W.", rating: 4.9 },
                status: "quiet",
                duration: "15m",
                totalTime: "45m",
                activity: "Idle",
                connectionStrength: 75,
                focusTopic: "Plate Tectonics",
                timeline: [
                    { time: "3:30 PM", event: "Session started" },
                    { time: "3:40 PM", event: "Student reading material" }
                ]
            }
        ]
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
        recentActivity: "All sessions running smoothly",
        classrooms: [
            {
                id: "room-301",
                name: "Room 301",
                subject: "Math Basics",
                student: { name: "Riley P.", grade: "3rd" },
                tutor: { name: "Amanda K.", rating: 5.0 },
                status: "active",
                duration: "20m",
                totalTime: "30m",
                activity: "Speaking",
                connectionStrength: 97,
                focusTopic: "Multiplication Tables",
                timeline: [
                    { time: "3:25 PM", event: "Session started" },
                    { time: "3:30 PM", event: "Fun activity started" }
                ]
            }
        ]
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
        recentActivity: "Session ending in 5m",
        classrooms: [
            {
                id: "room-401",
                name: "Room 401",
                subject: "AP Calculus",
                student: { name: "Jamie L.", grade: "12th" },
                tutor: { name: "Dr. Smith", rating: 5.0 },
                status: "active",
                duration: "40m",
                totalTime: "60m",
                activity: "Writing",
                connectionStrength: 99,
                focusTopic: "Integration Techniques",
                timeline: [
                    { time: "3:05 PM", event: "Session started" },
                    { time: "3:15 PM", event: "Practice exam review" },
                    { time: "3:35 PM", event: "Working on problems" }
                ]
            }
        ]
    },
    {
        id: "jefferson",
        name: "Jefferson STEM Academy",
        type: "Magnet School",
        activeSessions: 15,
        totalTutors: 10,
        avgSessionLength: "55m",
        status: "excellent",
        connectionStrength: 97,
        todayHours: 18.2,
        alerts: 0,
        trending: "+22%",
        subjects: ["Robotics", "Computer Science", "Advanced Math"],
        recentActivity: "New session started",
        classrooms: [
            {
                id: "room-501",
                name: "Lab A",
                subject: "Computer Science",
                student: { name: "Skyler T.", grade: "11th" },
                tutor: { name: "Prof. Chen", rating: 4.9 },
                status: "active",
                duration: "35m",
                totalTime: "60m",
                activity: "Speaking",
                connectionStrength: 98,
                focusTopic: "Python Algorithms",
                timeline: [
                    { time: "3:10 PM", event: "Session started" },
                    { time: "3:20 PM", event: "Code review began" }
                ]
            }
        ]
    },
    {
        id: "madison",
        name: "Madison Arts Academy",
        type: "Arts Focused",
        activeSessions: 3,
        totalTutors: 2,
        avgSessionLength: "45m",
        status: "excellent",
        connectionStrength: 94,
        todayHours: 4.1,
        alerts: 0,
        trending: "+15%",
        subjects: ["Art History", "Music Theory", "Creative Writing"],
        recentActivity: "Session in progress",
        classrooms: [
            {
                id: "room-601",
                name: "Studio 1",
                subject: "Creative Writing",
                student: { name: "Harper L.", grade: "9th" },
                tutor: { name: "Ms. Rivera", rating: 4.8 },
                status: "active",
                duration: "25m",
                totalTime: "45m",
                activity: "Writing",
                connectionStrength: 96,
                focusTopic: "Poetry Analysis",
                timeline: [
                    { time: "3:20 PM", event: "Session started" },
                    { time: "3:30 PM", event: "Writing exercise" }
                ]
            }
        ]
    },
    {
        id: "hamilton",
        name: "Hamilton Charter School",
        type: "Charter",
        activeSessions: 7,
        totalTutors: 5,
        avgSessionLength: "40m",
        status: "warning",
        connectionStrength: 78,
        todayHours: 8.5,
        alerts: 1,
        trending: "+3%",
        subjects: ["History", "Government", "Economics"],
        recentActivity: "Low bandwidth warning",
        classrooms: [
            {
                id: "room-701",
                name: "Room 701",
                subject: "US History",
                student: { name: "Quinn M.", grade: "10th" },
                tutor: { name: "Mr. Adams", rating: 4.7 },
                status: "active",
                duration: "18m",
                totalTime: "45m",
                activity: "Listening",
                connectionStrength: 76,
                focusTopic: "Civil War Era",
                timeline: [
                    { time: "3:27 PM", event: "Session started" },
                    { time: "3:35 PM", event: "Document analysis" }
                ]
            }
        ]
    },
    {
        id: "franklin",
        name: "Franklin Technical HS",
        type: "Vocational",
        activeSessions: 9,
        totalTutors: 6,
        avgSessionLength: "50m",
        status: "excellent",
        connectionStrength: 96,
        todayHours: 11.3,
        alerts: 0,
        trending: "+11%",
        subjects: ["Auto Mechanics", "Welding", "Electrical"],
        recentActivity: "All systems operational",
        classrooms: [
            {
                id: "room-801",
                name: "Shop A",
                subject: "Electrical Basics",
                student: { name: "Dakota R.", grade: "11th" },
                tutor: { name: "Coach Miller", rating: 4.9 },
                status: "active",
                duration: "42m",
                totalTime: "60m",
                activity: "Speaking",
                connectionStrength: 97,
                focusTopic: "Circuit Diagrams",
                timeline: [
                    { time: "3:03 PM", event: "Session started" },
                    { time: "3:15 PM", event: "Hands-on demo" }
                ]
            }
        ]
    },
    {
        id: "monroe",
        name: "Monroe Language Academy",
        type: "Language Immersion",
        activeSessions: 5,
        totalTutors: 4,
        avgSessionLength: "35m",
        status: "excellent",
        connectionStrength: 93,
        todayHours: 5.8,
        alerts: 0,
        trending: "+9%",
        subjects: ["Spanish", "French", "Mandarin"],
        recentActivity: "Session completed successfully",
        classrooms: [
            {
                id: "room-901",
                name: "Room 901",
                subject: "Spanish II",
                student: { name: "Avery K.", grade: "9th" },
                tutor: { name: "Señora Garcia", rating: 5.0 },
                status: "active",
                duration: "28m",
                totalTime: "40m",
                activity: "Speaking",
                connectionStrength: 94,
                focusTopic: "Verb Conjugation",
                timeline: [
                    { time: "3:17 PM", event: "Session started" },
                    { time: "3:25 PM", event: "Conversation practice" }
                ]
            }
        ]
    },
    {
        id: "central",
        name: "Central Alternative HS",
        type: "Alternative",
        activeSessions: 2,
        totalTutors: 2,
        avgSessionLength: "60m",
        status: "critical",
        connectionStrength: 45,
        todayHours: 2.1,
        alerts: 3,
        trending: "-5%",
        subjects: ["GED Prep", "Life Skills", "Basic Math"],
        recentActivity: "Multiple disconnections",
        classrooms: [
            {
                id: "room-1001",
                name: "Room 1001",
                subject: "GED Math",
                student: { name: "Jordan S.", grade: "12th" },
                tutor: { name: "Ms. Thompson", rating: 4.6 },
                status: "quiet",
                duration: "8m",
                totalTime: "60m",
                activity: "Idle",
                connectionStrength: 42,
                focusTopic: "Basic Algebra",
                timeline: [
                    { time: "3:37 PM", event: "Session started" },
                    { time: "3:40 PM", event: "Connection lost" },
                    { time: "3:43 PM", event: "Reconnecting..." }
                ]
            }
        ]
    }
];

// ============ NAVIGATION STATE ============

type ViewLevel = "district" | "school" | "classroom";

interface NavigationState {
    level: ViewLevel;
    schoolId: string | null;
    classroomId: string | null;
}

// ============ ANIMATION VARIANTS ============

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 }
    })
};

// ============ HELPER COMPONENTS ============

function StatusIndicator({ status }: { status: string }) {
    const config = {
        excellent: { color: "text-emerald-500", bgColor: "bg-emerald-500", label: "Excellent" },
        warning: { color: "text-amber-500", bgColor: "bg-amber-500", label: "Attention" },
        critical: { color: "text-rose-500", bgColor: "bg-rose-500", label: "Critical" },
        active: { color: "text-emerald-500", bgColor: "bg-emerald-500", label: "Active" },
        quiet: { color: "text-amber-500", bgColor: "bg-amber-500", label: "Quiet" },
        ending: { color: "text-blue-500", bgColor: "bg-blue-500", label: "Ending" }
    }[status] || { color: "text-muted-foreground", bgColor: "bg-muted", label: status };

    return (
        <div className={`flex items-center gap-1.5 ${config.color}`}>
            <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.bgColor} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${config.bgColor}`}></span>
            </span>
            <span className="text-xs font-medium">{config.label}</span>
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
                    className={`w-1 rounded-sm transition-all ${i < filledBars ? getColor() : "bg-muted-foreground/20"}`}
                    style={{ height: `${8 + i * 3}px` }}
                />
            ))}
            <span className="ml-1.5 text-xs text-muted-foreground">{strength}%</span>
        </div>
    );
}

function AudioWaveform({ activity }: { activity: string }) {
    const isActive = activity === "Speaking";
    return (
        <div className="flex items-center gap-0.5 h-4">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`w-1 rounded-full ${isActive ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                    animate={isActive ? {
                        height: [4, Math.random() * 12 + 4, 4]
                    } : { height: 4 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.5 + Math.random() * 0.5,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

function Breadcrumb({
    nav,
    schools,
    onNavigate
}: {
    nav: NavigationState;
    schools: School[];
    onNavigate: (level: ViewLevel, schoolId?: string | null, classroomId?: string | null) => void;
}) {
    const school = schools.find(s => s.id === nav.schoolId);
    const classroom = school?.classrooms.find(c => c.id === nav.classroomId);

    return (
        <div className="flex items-center gap-2 text-sm mb-6">
            <button
                onClick={() => onNavigate("district")}
                className={`flex items-center gap-1 transition-colors ${nav.level === "district"
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
            >
                <Signal className="w-4 h-4" />
                All Schools
            </button>

            {nav.schoolId && (
                <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <button
                        onClick={() => onNavigate("school", nav.schoolId)}
                        className={`transition-colors ${nav.level === "school"
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {school?.name}
                    </button>
                </>
            )}

            {nav.classroomId && classroom && (
                <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                        {classroom.name}
                    </span>
                </>
            )}
        </div>
    );
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 group"
        >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {label}
        </button>
    );
}

// ============ VIEW COMPONENTS ============

function DistrictView({
    schools,
    onSelectSchool
}: {
    schools: School[];
    onSelectSchool: (id: string) => void;
}) {
    const totalSessions = schools.reduce((sum, s) => sum + s.activeSessions, 0);
    const totalTutors = schools.reduce((sum, s) => sum + s.totalTutors, 0);
    const avgConnection = Math.round(schools.reduce((sum, s) => sum + s.connectionStrength, 0) / schools.length);

    const criticalCount = schools.filter(s => s.status === "critical").length;
    const warningCount = schools.filter(s => s.status === "warning").length;

    return (
        <motion.div
            key="district"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            {/* Summary Stats Row */}
            <div className="flex items-center justify-between mb-4">
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
                        <span className="text-sm font-medium">{avgConnection}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {criticalCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-medium">
                            <AlertCircle className="w-3 h-3" />
                            {criticalCount} Critical
                        </div>
                    )}
                    {warningCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
                            <AlertCircle className="w-3 h-3" />
                            {warningCount} Needs Attention
                        </div>
                    )}
                </div>
            </div>

            {/* Compact Table Header */}
            <div className="grid grid-cols-[1fr_80px_80px_80px_100px_120px_40px] gap-4 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/50">
                <div>School</div>
                <div className="text-center">Sessions</div>
                <div className="text-center">Tutors</div>
                <div className="text-center">Hours</div>
                <div className="text-center">Connection</div>
                <div className="text-center">Status</div>
                <div></div>
            </div>

            {/* School Rows */}
            <div className="divide-y divide-border/30">
                {schools.map((school, index) => (
                    <motion.div
                        key={school.id}
                        custom={index}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        onClick={() => onSelectSchool(school.id)}
                        className={`group grid grid-cols-[1fr_80px_80px_80px_100px_120px_40px] gap-4 px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-secondary/30 ${school.status === "critical" ? "bg-rose-500/5" :
                                school.status === "warning" ? "bg-amber-500/5" : ""
                            }`}
                    >
                        {/* School Name & Type */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${school.status === "excellent" ? "bg-emerald-500" :
                                    school.status === "warning" ? "bg-amber-500" : "bg-rose-500"
                                }`} />
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                        {school.name}
                                    </span>
                                    {school.alerts > 0 && (
                                        <Badge variant="warning" className="text-[9px] h-4 px-1.5">
                                            {school.alerts}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-[11px] text-muted-foreground truncate">
                                    {school.type}
                                </div>
                            </div>
                        </div>

                        {/* Sessions */}
                        <div className="flex items-center justify-center">
                            <span className="text-lg font-bold tabular-nums">{school.activeSessions}</span>
                        </div>

                        {/* Tutors */}
                        <div className="flex items-center justify-center text-sm tabular-nums">
                            {school.totalTutors}
                        </div>

                        {/* Hours */}
                        <div className="flex items-center justify-center text-sm tabular-nums">
                            {school.todayHours}h
                        </div>

                        {/* Connection */}
                        <div className="flex items-center justify-center">
                            <ConnectionBar strength={school.connectionStrength} />
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-center">
                            <StatusIndicator status={school.status} />
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function SchoolView({
    school,
    onSelectClassroom,
    onBack
}: {
    school: School;
    onSelectClassroom: (id: string) => void;
    onBack: () => void;
}) {
    return (
        <motion.div
            key="school"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            <BackButton onClick={onBack} label="All Schools" />

            {/* School Header Card */}
            <div className={`bg-card/50 backdrop-blur-sm border rounded-xl p-6 mb-6 ${school.status === "excellent" ? "border-emerald-500/30" :
                school.status === "warning" ? "border-amber-500/30" : "border-rose-500/30"
                }`}>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">{school.name}</h2>
                        <p className="text-sm text-muted-foreground">{school.type}</p>
                    </div>
                    <StatusIndicator status={school.status} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold tabular-nums">{school.activeSessions}</div>
                        <div className="text-xs text-muted-foreground mt-1">Active Sessions</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold tabular-nums">{school.totalTutors}</div>
                        <div className="text-xs text-muted-foreground mt-1">Tutors Online</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold tabular-nums">{school.todayHours}h</div>
                        <div className="text-xs text-muted-foreground mt-1">Hours Today</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold tabular-nums">{school.connectionStrength}%</div>
                        <div className="text-xs text-muted-foreground mt-1">Connection</div>
                    </div>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Active Sessions</h3>
                <span className="text-sm text-muted-foreground">{school.classrooms.length} live</span>
            </div>

            <div className="space-y-2">
                {school.classrooms.map((classroom, index) => (
                    <motion.div
                        key={classroom.id}
                        custom={index}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        onClick={() => onSelectClassroom(classroom.id)}
                        className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 text-center">
                                    <div className="text-sm font-medium">{classroom.name}</div>
                                </div>
                                <div className="w-24">
                                    <div className="text-sm font-medium">{classroom.subject}</div>
                                    <div className="text-[10px] text-muted-foreground">{classroom.focusTopic}</div>
                                </div>
                                <div className="w-40">
                                    <div className="text-sm">
                                        {classroom.student.name} ↔ {classroom.tutor.name}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">
                                        {classroom.student.grade} • ★ {classroom.tutor.rating}
                                    </div>
                                </div>
                                <div className="w-24 flex items-center gap-2">
                                    <AudioWaveform activity={classroom.activity} />
                                    <span className="text-[10px] text-muted-foreground">{classroom.activity}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm font-mono tabular-nums">{classroom.duration} / {classroom.totalTime}</div>
                                    <ConnectionBar strength={classroom.connectionStrength} />
                                </div>
                                <StatusIndicator status={classroom.status} />
                                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function ClassroomView({
    school,
    classroom,
    onBack
}: {
    school: School;
    classroom: Classroom;
    onBack: () => void;
}) {
    return (
        <motion.div
            key="classroom"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            <BackButton onClick={onBack} label={school.name} />

            {/* Session Header */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold">{classroom.name}</h2>
                            <Badge variant="secondary">{classroom.subject}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{classroom.focusTopic}</p>
                    </div>
                    <StatusIndicator status={classroom.status} />
                </div>

                {/* Participants */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center gap-4 bg-secondary/30 rounded-lg p-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Student</div>
                            <div className="font-semibold">{classroom.student.name}</div>
                            <div className="text-xs text-muted-foreground">{classroom.student.grade} Grade</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-secondary/30 rounded-lg p-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Tutor</div>
                            <div className="font-semibold">{classroom.tutor.name}</div>
                            <div className="text-xs text-muted-foreground">★ {classroom.tutor.rating} rating</div>
                        </div>
                    </div>
                </div>

                {/* Session Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <div className="font-bold tabular-nums">{classroom.duration}</div>
                        <div className="text-[10px] text-muted-foreground">of {classroom.totalTime}</div>
                    </div>
                    <div className="text-center">
                        <Wifi className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <div className="font-bold">{classroom.connectionStrength}%</div>
                        <div className="text-[10px] text-muted-foreground">Connection</div>
                    </div>
                    <div className="text-center">
                        <Activity className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <div className="font-bold">{classroom.activity}</div>
                        <div className="text-[10px] text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center">
                        <BookOpen className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <div className="font-bold">{classroom.subject}</div>
                        <div className="text-[10px] text-muted-foreground">Subject</div>
                    </div>
                </div>
            </div>

            {/* Live Audio */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Live Audio
                </h3>
                <div className="flex items-center justify-center gap-1 h-16 bg-secondary/30 rounded-lg">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-emerald-500 rounded-full"
                            animate={{
                                height: classroom.activity === "Speaking"
                                    ? [8, Math.random() * 48 + 8, 8]
                                    : 8
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.3 + Math.random() * 0.3,
                                delay: i * 0.02
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Session Timeline
                </h3>
                <div className="space-y-3">
                    {classroom.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="w-16 text-xs text-muted-foreground font-mono">{event.time}</div>
                            <div className="relative">
                                <div className={`w-2 h-2 rounded-full mt-1.5 ${index === classroom.timeline.length - 1
                                    ? "bg-emerald-500"
                                    : "bg-muted-foreground/30"
                                    }`} />
                                {index < classroom.timeline.length - 1 && (
                                    <div className="absolute top-3 left-[3px] w-0.5 h-6 bg-border" />
                                )}
                            </div>
                            <div className="text-sm">{event.event}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    <Video className="w-4 h-4" />
                    Join Session
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/10 text-amber-500 rounded-lg font-medium hover:bg-amber-500/20 transition-colors">
                    <Flag className="w-4 h-4" />
                    Flag for Review
                </button>
            </div>
        </motion.div>
    );
}

// ============ MAIN COMPONENT ============

export function SchoolStatusGrid() {
    const [nav, setNav] = useState<NavigationState>({
        level: "district",
        schoolId: null,
        classroomId: null
    });

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (nav.level === "classroom") {
                    setNav(prev => ({ ...prev, level: "school", classroomId: null }));
                } else if (nav.level === "school") {
                    setNav({ level: "district", schoolId: null, classroomId: null });
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nav.level]);

    const handleNavigate = (level: ViewLevel, schoolId?: string | null, classroomId?: string | null) => {
        setNav({
            level,
            schoolId: schoolId ?? null,
            classroomId: classroomId ?? null
        });
    };

    const selectedSchool = schools.find(s => s.id === nav.schoolId);
    const selectedClassroom = selectedSchool?.classrooms.find(c => c.id === nav.classroomId);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Signal className="w-5 h-5 text-primary" />
                        School Status
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Real-time overview of all connected schools
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <Breadcrumb nav={nav} schools={schools} onNavigate={handleNavigate} />

            {/* Views */}
            <AnimatePresence mode="wait">
                {nav.level === "district" && (
                    <DistrictView
                        schools={schools}
                        onSelectSchool={(id) => handleNavigate("school", id)}
                    />
                )}
                {nav.level === "school" && selectedSchool && (
                    <SchoolView
                        school={selectedSchool}
                        onSelectClassroom={(id) => handleNavigate("classroom", nav.schoolId, id)}
                        onBack={() => handleNavigate("district")}
                    />
                )}
                {nav.level === "classroom" && selectedSchool && selectedClassroom && (
                    <ClassroomView
                        school={selectedSchool}
                        classroom={selectedClassroom}
                        onBack={() => handleNavigate("school", nav.schoolId)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
