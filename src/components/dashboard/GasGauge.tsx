"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export function GasGauge() {
    const usedHours = 4500;
    const totalHours = 10000;
    const percentage = (usedHours / totalHours) * 100;

    const data = [
        {
            name: "Utilization",
            value: percentage,
            fill: "var(--primary)",
        }
    ];

    return (
        <Card>
            <CardHeader className="pb-0">
                <CardTitle>Contract Utilization</CardTitle>
                <CardDescription>Hours used vs total allocated.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="80%"
                            outerRadius="100%"
                            barSize={10}
                            data={data}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />
                            <RadialBar
                                background
                                dataKey="value"
                                cornerRadius={30 / 2}
                                fill="var(--primary)"
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="text-4xl font-bold"
                        >
                            {percentage.toFixed(0)}%
                        </motion.span>
                        <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Used</span>
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center text-sm border-b pb-4">
                        <span className="text-muted-foreground">Used</span>
                        <span className="font-mono font-medium">{usedHours.toLocaleString()} hrs</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b pb-4">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-mono font-medium">{totalHours.toLocaleString()} hrs</span>
                    </div>

                    <div className="rounded-lg bg-secondary/50 p-4 border border-border/50">
                        <div className="flex flex-col space-y-1">
                            <span className="text-xs font-semibold uppercase text-muted-foreground">Est. Runway</span>
                            <span className="text-lg font-bold flex items-center gap-2">
                                June 12, 2026
                            </span>
                            <span className="text-xs text-muted-foreground">
                                At current burn rate (280 hrs/wk)
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
