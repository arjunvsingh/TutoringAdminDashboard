"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { Activity, BookOpen, Clock, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { StudentAcademicProfile } from "@/data/mock/StudentOutcomesData";

interface StudentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: {
        id: number;
        name: string;
        grade: string;
        school: string;
        risk: string;
        status: string;
    } | null;
    academicProfile?: StudentAcademicProfile;
}

export function StudentDetailModal({ isOpen, onClose, student, academicProfile }: StudentDetailModalProps) {
    if (!student) return null;

    // Use mock profile if not provided
    const profile = academicProfile || {
        masteryScore: 68,
        assessments: [
            { date: 'Sep', name: 'Diag', score: 55 },
            { date: 'Oct', name: 'Mid', score: 62 },
            { date: 'Nov', name: 'Unit 1', score: 58 },
            { date: 'Dec', name: 'Unit 2', score: 70 },
            { date: 'Jan', name: 'Bench', score: 68 },
        ],
        recentSessions: [
            { date: '2d ago', topic: 'Linear Functions', mastery: 80 },
            { date: '5d ago', topic: 'Slope Intercept', mastery: 45 },
        ]
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                {student.name}
                                <Badge variant="outline" className="ml-2 bg-secondary/50 text-xs font-normal">
                                    {student.grade} • {student.school}
                                </Badge>
                            </DialogTitle>
                            <DialogDescription className="mt-1">
                                Student ID: #{student.id.toString().padStart(6, '0')}
                            </DialogDescription>
                        </div>
                        <div className="flex flex-col items-end">
                            <Badge variant={student.risk === 'High' ? 'destructive' : 'default'} className="mb-1">
                                {student.risk} Risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">{student.status}</span>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Mastery Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-secondary/20 rounded-xl p-4 border border-border/50 flex flex-col items-center justify-center text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Mastery Score</h3>
                        <div className="text-4xl font-bold tracking-tighter text-foreground mb-1">
                            {profile.masteryScore}%
                        </div>
                        <div className="h-10 w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={profile.assessments}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="currentColor"
                                        fill="url(#colorScore)"
                                        strokeWidth={2}
                                        className="text-primary"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2">
                            +6% vs last month
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <div className="bg-secondary/20 rounded-xl p-4 border border-border/50 space-y-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Clock className="w-4 h-4" /> Dosage Compliance
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-xs text-emerald-500 mb-1">On Track</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                            </div>
                        </div>

                        <div className="bg-secondary/20 rounded-xl p-4 border border-border/50 space-y-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <BookOpen className="w-4 h-4" /> Modules Completed
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">12</span>
                                <span className="text-xs text-muted-foreground mb-1">/ 15 assigned</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[80%] rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Intervention */}
                <div className="mt-6 space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-muted-foreground" /> Recent Activity
                    </h3>
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                        {profile.recentSessions.map((session, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 hover:bg-secondary/30 transition-colors border border-border/30"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${session.mastery >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    <div>
                                        <p className="text-sm font-medium">{session.topic}</p>
                                        <p className="text-xs text-muted-foreground">{session.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold ${session.mastery >= 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {session.mastery}%
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-border/50">
                    <div className="flex gap-2">
                        <Button className="text-xs h-8 bg-transparent border border-border text-foreground hover:bg-secondary">
                            <BookOpen className="w-3 h-3 mr-2" /> View Full Profile
                        </Button>
                    </div>
                    <Button className="text-xs h-9 shadow-lg shadow-primary/20">
                        <Zap className="w-3 h-3 mr-2" /> Assign Intervention
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
