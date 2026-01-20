"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, X, ChevronRight, MessageSquare, AlertTriangle, Zap } from "lucide-react";

const predictions = [
    { type: "insight", text: "Based on historical data, usage will peak at 214 active sessions in 45 minutes." },
    { type: "warning", text: "3 Tutors are likely to be late due to traffic detected near Lincoln High." },
    { type: "action", text: "Budget utilization is 5% under forecast. Recommend increasing allocation for Math." },
];

export function Copilot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Simulate AI "typing"
            let delay = 0;
            predictions.forEach((pred, i) => {
                delay += 800 + Math.random() * 1000;
                setTimeout(() => {
                    setMessages(prev => [...prev, pred]);
                }, delay);
            });
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-80 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-primary px-4 py-3 flex items-center justify-between text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                                <span className="font-semibold text-sm">Neural Copilot</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
                            {messages.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground text-xs italic">
                                    Analyzing system telemetry...
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-sm bg-secondary/50 p-3 rounded-lg border border-border/50"
                                >
                                    <div className="flex items-start gap-2 mb-1">
                                        {msg.type === "warning" && <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5" />}
                                        {msg.type === "action" && <Zap className="w-3 h-3 text-blue-500 mt-0.5" />}
                                        {msg.type === "insight" && <Sparkles className="w-3 h-3 text-emerald-500 mt-0.5" />}
                                        <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">{msg.type}</span>
                                    </div>
                                    <p className="leading-relaxed">{msg.text}</p>

                                    {msg.type === "action" && (
                                        <button className="mt-2 w-full text-xs bg-primary text-primary-foreground py-1.5 rounded hover:opacity-90 transition-opacity">
                                            Apply Recommendation
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow relative group"
            >
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100" />
                {isOpen ? <ChevronRight className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </motion.button>

        </div>
    );
}
