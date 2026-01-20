"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Signal, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SessionDrawer } from "./SessionDrawer";

const sessions = [
    {
        id: "sess_1",
        student: "Alex M.",
        school: "Lincoln High",
        subject: "Algebra II",
        tutor: "Sarah J.",
        duration: "45m / 60m",
        quality: "Good",
    },
    {
        id: "sess_2",
        student: "Jordan K.",
        school: "Lincoln High",
        subject: "Chemistry",
        tutor: "Mike T.",
        duration: "12m / 60m",
        quality: "Good",
    },
    {
        id: "sess_3",
        student: "Casey L.",
        school: "Washington Middle",
        subject: "Physics",
        tutor: "Emily R.",
        duration: "05m / 60m",
        quality: "Poor",
    },
    {
        id: "sess_4",
        student: "Taylor B.",
        school: "Roosevelt Elem",
        subject: "Reading Comp",
        tutor: "Jessica W.",
        duration: "30m / 45m",
        quality: "Good",
    },
    {
        id: "sess_5",
        student: "Morgan S.",
        school: "Lincoln High",
        subject: "Calculus",
        tutor: "David P.",
        duration: "55m / 60m",
        quality: "Good",
    },
];

function ConnectionQuality({ quality }: { quality: string }) {
    if (quality === "Good") {
        return <div className="flex items-center text-emerald-500 gap-1"><SignalHigh className="w-4 h-4" /><span className="text-xs">Strong</span></div>;
    }
    if (quality === "Poor") {
        return <div className="flex items-center text-rose-500 gap-1"><SignalLow className="w-4 h-4" /><span className="text-xs">Weak</span></div>;
    }
    return <div className="flex items-center text-amber-500 gap-1"><SignalMedium className="w-4 h-4" /><span className="text-xs">Fair</span></div>;
}

function AudioWaveform() {
    return (
        <div className="flex items-center gap-0.5 h-4">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-primary/80 rounded-full"
                    animate={{
                        height: [4, Math.random() * 12 + 4, 4]
                    }}
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

export function LiveFeed() {
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (session: any) => {
        setSelectedSession(session);
        setIsDrawerOpen(true);
    };

    return (
        <>
            <motion.div
                className="col-span-1 lg:col-span-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="h-full overflow-hidden border-border/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Live Feed</CardTitle>
                                <CardDescription>Real-time view of currently active tutoring sessions.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                <Signal className="w-3 h-3 animate-pulse" />
                                Live Updating
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Student</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Subject</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Tutor</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Activity</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Connection</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {sessions.map((session, i) => (
                                            <motion.tr
                                                key={session.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i + 0.5 }}
                                                onClick={() => handleRowClick(session)}
                                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group cursor-pointer"
                                            >
                                                <td className="p-4 align-middle font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="group-hover:text-primary transition-colors">{session.student}</span>
                                                        <span className="text-xs text-muted-foreground font-normal">{session.school}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">{session.subject}</td>
                                                <td className="p-4 align-middle">{session.tutor}</td>
                                                <td className="p-4 align-middle font-mono text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-3">
                                                        <AudioWaveform />
                                                        <span className="text-[10px] uppercase tracking-wider opacity-70">Speaking</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end">
                                                        <ConnectionQuality quality={session.quality} />
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <SessionDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                sessionData={selectedSession}
            />
        </>
    );
}
