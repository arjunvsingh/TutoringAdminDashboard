"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ActivityTicker } from "@/components/dashboard/ActivityTicker";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { motion } from "framer-motion";
import { FileText, Download, Share2, Star, TrendingUp, Users } from "lucide-react";

const reports = [
    { id: 1, title: "Q4 2024 Impact Analysis", type: "Quarterly Review", date: "Jan 10, 2025", size: "2.4 MB" },
    { id: 2, title: "Student Efficacy Study", type: "Research", date: "Dec 15, 2024", size: "4.1 MB" },
    { id: 3, title: "Lincoln High Monthly", type: "Monthly Update", date: "Jan 01, 2025", size: "1.2 MB" },
    { id: 4, title: "Tutor Performance Audit", type: "Internal", date: "Nov 30, 2024", size: "3.5 MB" },
    { id: 5, title: "Budget Reconciliation", type: "Financial", date: "Dec 31, 2024", size: "1.1 MB" },
    { id: 6, title: "Parent Satisfaction Survey", type: "Survey Data", date: "Oct 20, 2024", size: "5.8 MB" },
];

export default function ReportsPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="bg-noise" />

            <CommandMenu />
            <Sidebar className="hidden md:flex w-64 border-r fixed left-0 top-0 bottom-0 z-20 glass-sidebar backdrop-blur-md bg-background/80" />

            <main className="flex-1 md:ml-64 relative z-10 flex flex-col h-screen overflow-hidden">
                <ActivityTicker />

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-7xl space-y-8 pb-20">

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Impact Reports</h1>
                                <p className="text-muted-foreground mt-1">Generated insights and efficacy studies.</p>
                            </div>
                        </motion.div>

                        {/* Impact Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SpotlightCard className="p-6 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Students Served</p>
                                        <h3 className="text-3xl font-bold mt-1">2,450</h3>
                                        <p className="text-xs text-emerald-600 mt-1 font-medium">+15% vs Q3</p>
                                    </div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6 bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-lg text-amber-600">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Grade Improvement</p>
                                        <h3 className="text-3xl font-bold mt-1">1.2 GPA</h3>
                                        <p className="text-xs text-amber-600 mt-1 font-medium">Avg. increase per student</p>
                                    </div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600">
                                        <Star className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Satisfaction Score</p>
                                        <h3 className="text-3xl font-bold mt-1">4.8/5</h3>
                                        <p className="text-xs text-blue-600 mt-1 font-medium">Based on 500+ surveys</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Document Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map((report, i) => (
                                <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                >
                                    <SpotlightCard className="group cursor-pointer hover:border-primary/50 transition-colors">
                                        <div className="p-6 h-full flex flex-col">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <Badge variant="neutral" className="bg-secondary/50">{report.type}</Badge>
                                            </div>

                                            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{report.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-6">Generated on {report.date}</p>

                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                                                <span className="text-xs font-mono text-muted-foreground">{report.size}</span>
                                                <div className="flex gap-2">
                                                    <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground">
                                                        <Share2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

function Badge({ variant, className, children }: { variant: string, className?: string, children: React.ReactNode }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </span>
    );
}
