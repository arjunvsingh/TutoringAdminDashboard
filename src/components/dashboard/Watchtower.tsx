"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertTriangle, Clock, TrendingUp, ShieldCheck, FileCheck } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { GRANT_COMPLIANCE_DATA } from "@/data/mock/GrantComplianceData";
import { motion } from "framer-motion";

const data = [
    { time: "10am", active: 40 },
    { time: "11am", active: 85 },
    { time: "12pm", active: 120 },
    { time: "1pm", active: 142 }, // Current
    { time: "2pm", active: 130 }, // Forecast
    { time: "3pm", active: 110 },
];

export function Watchtower() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* Active Sessions Card with Sparkline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Sessions Now</CardTitle>
                        <div className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground mb-4">
                            +12% from same time yesterday
                        </p>
                        <div className="h-[80px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--popover)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        itemStyle={{ color: 'var(--popover-foreground)' }}
                                        labelStyle={{ display: 'none' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="active"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorActive)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">No-Shows Today</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-rose-600">8</div>
                        <p className="text-xs text-muted-foreground">
                            2.1% of total scheduled sessions
                        </p>
                        <div className="mt-4 flex items-center space-x-2 text-sm text-rose-600/80">
                            <TrendingUp className="h-4 w-4 rotate-180" />
                            <span>Improving vs last week (12)</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Grant Compliance Card - Replaces Generic Hours */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Grant Compliance (ESSER)</CardTitle>
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${GRANT_COMPLIANCE_DATA.stats.complianceRate >= 80
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-rose-500/10 text-rose-500'
                            }`}>
                            <ShieldCheck className="h-3 w-3" />
                            {GRANT_COMPLIANCE_DATA.stats.complianceRate >= 80 ? 'COMPLIANT' : 'AT RISK'}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">{GRANT_COMPLIANCE_DATA.stats.complianceRate}%</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    of students met dosage (3x30m)
                                </p>
                            </div>

                            {/* Radial Progress Mini-Chart */}
                            <div className="h-[60px] w-[60px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Compliant', value: GRANT_COMPLIANCE_DATA.stats.complianceRate, fill: '#10b981' },
                                                { name: 'Gap', value: 100 - GRANT_COMPLIANCE_DATA.stats.complianceRate, fill: 'var(--secondary)' }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={20}
                                            outerRadius={28}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                            stroke="none"
                                            cornerRadius={10}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <FileCheck className="h-4 w-4 text-emerald-500/50" />
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar Detail */}
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                <span>Mandated Minutes</span>
                                <span>{GRANT_COMPLIANCE_DATA.stats.deliveredMinutes} / {GRANT_COMPLIANCE_DATA.stats.targetMinutes} avg</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(GRANT_COMPLIANCE_DATA.stats.deliveredMinutes / GRANT_COMPLIANCE_DATA.stats.targetMinutes) * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-emerald-500 rounded-full"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
