"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { SKILLS_GAP_DATA } from "@/data/mock/StudentOutcomesData";
import { useState } from "react";
import { Filter } from "lucide-react";

export function SkillsGapWidget() {
    const [filter, setFilter] = useState<'All' | 'Math' | 'ELA'>('All');

    const filteredSkills = SKILLS_GAP_DATA.filter(s =>
        filter === 'All' ? true : s.subject === filter
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
        >
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg font-bold">Academic Critical Gaps</CardTitle>
                        <p className="text-sm text-muted-foreground">Topics with lowest mastery district-wide</p>
                    </div>

                    {/* Filter Dropdown (Simplified as tabs for now) */}
                    <div className="flex bg-secondary/50 rounded-lg p-1 text-xs font-medium">
                        {(['All', 'Math', 'ELA'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-2 py-1 rounded-md transition-all ${filter === f
                                        ? 'bg-background shadow-sm text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredSkills.map((skill, i) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="group flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">{skill.name}</span>
                                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 opacity-70">
                                            {skill.grade}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{skill.subject}</span>
                                        <span>•</span>
                                        <span className="text-rose-500 font-medium">{skill.impact} students struggling</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-bold ${skill.masteryRate < 50 ? 'text-rose-500' : 'text-amber-500'
                                        }`}>
                                        {skill.masteryRate}%
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">Mastery</div>
                                </div>
                            </motion.div>
                        ))}

                        {filteredSkills.length === 0 && (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                                No critical gaps found for {filter}.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
