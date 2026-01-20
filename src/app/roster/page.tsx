"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ActivityTicker } from "@/components/dashboard/ActivityTicker";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, User, GraduationCap, School, AlertTriangle } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const students = [
    { id: 1, name: "Alexander Mitchell", grade: "11th", school: "Lincoln High", tutor: "Sarah Jenkins", status: "Active", risk: "Low", lastSession: "2h ago" },
    { id: 2, name: "Jordan King", grade: "10th", school: "Lincoln High", tutor: "Mike Thompson", status: "Active", risk: "Low", lastSession: "1d ago" },
    { id: 3, name: "Casey Lee", grade: "8th", school: "Washington Middle", tutor: "Emily Rogers", status: "Review", risk: "High", lastSession: "5h ago" },
    { id: 4, name: "Taylor Brooks", grade: "5th", school: "Roosevelt Elem", tutor: "Jessica Wong", status: "On Hold", risk: "Medium", lastSession: "3d ago" },
    { id: 5, name: "Morgan Smith", grade: "12th", school: "Lincoln High", tutor: "David Park", status: "Active", risk: "Low", lastSession: "Just now" },
    { id: 6, name: "Riley Davis", grade: "9th", school: "Lincoln High", tutor: "Sarah Jenkins", status: "Active", risk: "Medium", lastSession: "6h ago" },
    { id: 7, name: "Jamie Wilson", grade: "7th", school: "Washington Middle", tutor: "Emily Rogers", status: "Active", risk: "Low", lastSession: "2d ago" },
    { id: 8, name: "Quinn Anderson", grade: "11th", school: "Lincoln High", tutor: "Mike Thompson", status: "Review", risk: "High", lastSession: "4h ago" },
    { id: 9, name: "Avery Martinez", grade: "6th", school: "Roosevelt Elem", tutor: "Unknown", status: "Pending", risk: "Low", lastSession: "N/A" },
    { id: 10, name: "Cameron White", grade: "10th", school: "Lincoln High", tutor: "David Park", status: "Active", risk: "Low", lastSession: "1d ago" },
];

export default function RosterPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative overflow-hidden">

            {/* Cinematic Backgrounds */}
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="bg-noise" />

            <CommandMenu />

            <Sidebar className="hidden md:flex w-64 border-r fixed left-0 top-0 bottom-0 z-20 glass-sidebar backdrop-blur-md bg-background/80" />

            <main className="flex-1 md:ml-64 relative z-10 flex flex-col h-screen overflow-hidden">
                <ActivityTicker />

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-7xl space-y-8 pb-20">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Student Roster</h1>
                                <p className="text-muted-foreground mt-1">Manage 2,450 active students across 3 districts.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-md text-sm font-medium transition-colors border border-transparent hover:border-border">
                                    <Filter className="w-4 h-4" /> Filter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors shadow-lg shadow-primary/20">
                                    <User className="w-4 h-4" /> Add Student
                                </button>
                            </div>
                        </motion.div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by name, school, or ID..."
                                className="w-full bg-secondary/20 border border-border/50 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                            />
                        </div>

                        {/* Roster Grid */}
                        <SpotlightCard className="glass-card border-border/50">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-muted-foreground font-medium bg-muted/20 border-b border-border/50">
                                        <tr>
                                            <th className="px-6 py-4">Student Name</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Grade Level</th>
                                            <th className="px-6 py-4">School</th>
                                            <th className="px-6 py-4">Assigned Tutor</th>
                                            <th className="px-6 py-4">Risk Level</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {students.map((student, i) => (
                                            <motion.tr
                                                key={student.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-muted/30 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                        {student.name.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    {student.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={student.status === "Active" ? "good" : student.status === "Review" ? "poor" : "neutral"} className="bg-opacity-10 dark:bg-opacity-20">
                                                        {student.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <GraduationCap className="w-3 h-3" /> {student.grade}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <School className="w-3 h-3" /> {student.school}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{student.tutor}</td>
                                                <td className="px-6 py-4">
                                                    {student.risk === "High" && <span className="text-rose-500 flex items-center gap-1 font-medium text-xs"><AlertTriangle className="w-3 h-3" /> High Risk</span>}
                                                    {student.risk === "Medium" && <span className="text-amber-500 font-medium text-xs">Medium</span>}
                                                    {student.risk === "Low" && <span className="text-emerald-500 text-xs">Low</span>}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </SpotlightCard>

                    </div>
                </div>
            </main>
        </div>
    );
}
