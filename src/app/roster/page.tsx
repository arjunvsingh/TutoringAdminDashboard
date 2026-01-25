"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ActivityTicker } from "@/components/dashboard/ActivityTicker";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, User, GraduationCap, School, AlertTriangle } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

import { useState, useMemo } from "react";
import { getStudentProfile } from "@/data/mock/StudentOutcomesData";
import { StudentDetailModal } from "@/components/roster/StudentDetailModal";

const students = [
    { id: 1, name: "Alexander Mitchell", grade: "11th", school: "Lincoln High", tutor: "Sarah Jenkins", status: "Active", risk: "Low", lastSession: "2h ago", mastery: 78 },
    { id: 2, name: "Jordan King", grade: "10th", school: "Lincoln High", tutor: "Mike Thompson", status: "Active", risk: "Low", lastSession: "1d ago", mastery: 82 },
    { id: 3, name: "Casey Lee", grade: "8th", school: "Washington Middle", tutor: "Emily Rogers", status: "Review", risk: "High", lastSession: "5h ago", mastery: 45 },
    { id: 4, name: "Taylor Brooks", grade: "5th", school: "Roosevelt Elem", tutor: "Jessica Wong", status: "On Hold", risk: "Medium", lastSession: "3d ago", mastery: 65 },
    { id: 5, name: "Morgan Smith", grade: "12th", school: "Lincoln High", tutor: "David Park", status: "Active", risk: "Low", lastSession: "Just now", mastery: 92 },
    { id: 6, name: "Riley Davis", grade: "9th", school: "Lincoln High", tutor: "Sarah Jenkins", status: "Active", risk: "Medium", lastSession: "6h ago", mastery: 58 },
    { id: 7, name: "Jamie Wilson", grade: "7th", school: "Washington Middle", tutor: "Emily Rogers", status: "Active", risk: "Low", lastSession: "2d ago", mastery: 75 },
    { id: 8, name: "Quinn Anderson", grade: "11th", school: "Lincoln High", tutor: "Mike Thompson", status: "Review", risk: "High", lastSession: "4h ago", mastery: 48 },
    { id: 9, name: "Avery Martinez", grade: "6th", school: "Roosevelt Elem", tutor: "Unknown", status: "Pending", risk: "Low", lastSession: "N/A", mastery: 0 },
    { id: 10, name: "Cameron White", grade: "10th", school: "Lincoln High", tutor: "David Park", status: "Active", risk: "Low", lastSession: "1d ago", mastery: 88 },
];

export default function RosterPage() {
    const [search, setSearch] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("All");
    const [selectedGrade, setSelectedGrade] = useState("All");
    const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);

    // Derived state for unique schools/grades
    const schools = ["All", ...Array.from(new Set(students.map(s => s.school)))];
    const grades = ["All", ...Array.from(new Set(students.map(s => s.grade)))].sort();

    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.school.toLowerCase().includes(search.toLowerCase());
            const matchesSchool = selectedSchool === "All" || student.school === selectedSchool;
            const matchesGrade = selectedGrade === "All" || student.grade === selectedGrade;
            return matchesSearch && matchesSchool && matchesGrade;
        });
    }, [search, selectedSchool, selectedGrade]);

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
                                <p className="text-muted-foreground mt-1">Manage {filteredStudents.length} active students across 3 districts.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-md text-sm font-medium transition-colors border border-transparent hover:border-border">
                                    <Filter className="w-4 h-4" /> Export CSV
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors shadow-lg shadow-primary/20">
                                    <User className="w-4 h-4" /> Add Student
                                </button>
                            </div>
                        </motion.div>

                        {/* Filters & Search */}
                        <div className="flex flex-col md:flex-row gap-4 items-center bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-secondary/20 border border-border/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                                />
                            </div>

                            <select
                                value={selectedSchool}
                                onChange={(e) => setSelectedSchool(e.target.value)}
                                className="w-full md:w-auto bg-secondary/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none"
                            >
                                {schools.map(s => <option key={s} value={s}>{s === 'All' ? 'All Schools' : s}</option>)}
                            </select>

                            <select
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="w-full md:w-auto bg-secondary/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none"
                            >
                                {grades.map(g => <option key={g} value={g}>{g === 'All' ? 'All Grades' : g}</option>)}
                            </select>
                        </div>

                        {/* Roster Grid */}
                        <SpotlightCard className="glass-card border-border/50">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-muted-foreground font-medium bg-muted/20 border-b border-border/50">
                                        <tr>
                                            <th className="px-6 py-4">Student Name</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">School</th>
                                            <th className="px-6 py-4">Mastery</th>
                                            <th className="px-6 py-4">Risk Level</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {filteredStudents.map((student, i) => (
                                            <motion.tr
                                                key={student.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => setSelectedStudent(student)}
                                                className="group hover:bg-muted/30 transition-colors cursor-pointer"
                                            >
                                                <td className="px-6 py-4 font-medium flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                        {student.name.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <div>
                                                        <div className="group-hover:text-primary transition-colors">{student.name}</div>
                                                        <div className="text-[10px] text-muted-foreground">{student.grade}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={student.status === "Active" ? "good" : student.status === "Review" ? "poor" : "secondary"} className="bg-opacity-10 dark:bg-opacity-20 text-[10px] font-normal">
                                                        {student.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    {student.school}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`text-sm font-bold ${student.mastery >= 70 ? 'text-emerald-500' : 'text-rose-500'
                                                            }`}>
                                                            {student.mastery}%
                                                        </div>
                                                        <div className="h-1.5 w-16 bg-secondary rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${student.mastery >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                                style={{ width: `${student.mastery}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
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

                {/* Detail Modal */}
                <StudentDetailModal
                    isOpen={!!selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    student={selectedStudent}
                    academicProfile={selectedStudent ? getStudentProfile(selectedStudent.id) : undefined}
                />
            </main>
        </div>
    );
}
