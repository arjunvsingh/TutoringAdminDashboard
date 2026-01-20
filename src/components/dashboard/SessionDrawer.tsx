"use client";

import { X, MessageSquare, AlertCircle, CheckCircle2, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button"; // Will create if missing, or use basic
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

interface SessionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    sessionData: any;
}

// Simulated transcript data
const transcriptMock = [
    { speaker: "Tutor", text: "Alright, let's look at the quadratic formula again.", delay: 500 },
    { speaker: "Student", text: "I keep forgetting the negative b part.", delay: 1500 },
    { speaker: "Tutor", text: "Think of it this way: a negative boy couldn't decide...", delay: 3000 },
    { speaker: "Tutor", text: "...whether to go to the radical party.", delay: 5000 },
    { speaker: "Student", text: "Ha! That's actually helpful.", delay: 7000 },
    { speaker: "Tutor", text: "Exactly! Now the square root consists of...", delay: 9000 },
];

const sentimentData = [
    { time: '10:00', score: 65 },
    { time: '10:05', score: 70 },
    { time: '10:10', score: 55 }, // Dip
    { time: '10:15', score: 85 }, // Recovery
    { time: '10:20', score: 92 },
    { time: '10:25', score: 88 },
];

export function SessionDrawer({ isOpen, onClose, sessionData }: SessionDrawerProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Reset simulator when opening
    useEffect(() => {
        if (isOpen) {
            setMessages([]);
            let timeouts: NodeJS.Timeout[] = [];

            transcriptMock.forEach((msg) => {
                const timeout = setTimeout(() => {
                    setMessages(prev => [...prev, msg]);
                }, msg.delay);
                timeouts.push(timeout);
            });

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isOpen]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] border-l bg-card shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    Live Session Inspector
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Monitoring {sessionData?.student} & {sessionData?.tutor}
                                </p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Sentiment Analysis */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Real-time Sentiment</h3>
                                    <Badge variant="good" className="animate-pulse">Positive (88%)</Badge>
                                </div>
                                <div className="h-[120px] w-full bg-secondary/20 rounded-lg p-2 border">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={sentimentData}>
                                            <defs>
                                                <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                                            <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorSentiment)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Live Transcript */}
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-2">
                                    <Mic className="w-4 h-4 text-primary" />
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Transcript</h3>
                                </div>

                                <div className="bg-secondary/30 rounded-xl border p-4 h-[400px] overflow-y-auto space-y-4 font-mono text-sm">
                                    {messages.length === 0 && (
                                        <div className="flex items-center justify-center h-full text-muted-foreground italic">
                                            Connecting to audio stream...
                                        </div>
                                    )}
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex flex-col ${msg.speaker === "Tutor" ? "items-end" : "items-start"}`}
                                        >
                                            <span className="text-xs text-muted-foreground mb-1">{msg.speaker}</span>
                                            <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.speaker === "Tutor"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                        </div>

                        {/* Footer / Actions */}
                        <div className="p-6 border-t bg-muted/20 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors font-medium">
                                    <AlertCircle className="w-4 h-4" />
                                    Flag for Review
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 rounded-md transition-colors font-medium">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Mark as High Quality
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
