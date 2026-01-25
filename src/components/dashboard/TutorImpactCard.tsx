"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, UserCheck, Star } from "lucide-react";
import { TUTOR_IMPACT_DATA } from "@/data/mock/TutorImpactData";
import { motion } from "framer-motion";

export function TutorImpactCard() {
    return (
        <Card className="h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="w-24 h-24 text-primary" />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <UserCheck className="w-5 h-5 text-primary" />
                    Tutor Impact Leaderboard
                </CardTitle>
                <p className="text-xs text-muted-foreground">Ranked by Student Growth Percentile (SGP)</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {TUTOR_IMPACT_DATA.slice(0, 4).map((tutor, i) => (
                        <motion.div
                            key={tutor.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                                        i === 1 ? 'bg-zinc-400/20 text-zinc-500' :
                                            'bg-amber-700/10 text-amber-700'
                                    }`}>
                                    {i + 1}
                                </div>
                                <div>
                                    <div className="font-medium text-sm">{tutor.name}</div>
                                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        {tutor.subject} • Top Skill: <span className="text-primary/80">{tutor.topSkill}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end font-bold text-sm">
                                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    {tutor.studentGrowthPercentile}
                                </div>
                                <div className="text-[10px] text-muted-foreground">SGP Score</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
