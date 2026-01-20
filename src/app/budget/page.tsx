"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ActivityTicker } from "@/components/dashboard/ActivityTicker";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const monthlySpendData = [
    { name: 'Jan', actual: 4000, projected: 2400 },
    { name: 'Feb', actual: 3000, projected: 1398 },
    { name: 'Mar', actual: 2000, projected: 9800 },
    { name: 'Apr', actual: 2780, projected: 3908 },
    { name: 'May', actual: 1890, projected: 4800 },
    { name: 'Jun', actual: 2390, projected: 3800 },
    { name: 'Jul', actual: 3490, projected: 4300 },
];

const burnRateData = [
    { name: 'Burn', value: 72, fill: 'var(--primary)' }
];

export default function BudgetPage() {
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
                                <h1 className="text-3xl font-bold tracking-tight">Budget Control</h1>
                                <p className="text-muted-foreground mt-1">FY2025 Financial Overview & Projections.</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-md text-sm font-medium transition-colors border border-transparent hover:border-border">
                                <Download className="w-4 h-4" /> Export CSV
                            </button>
                        </motion.div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SpotlightCard className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                                        <h3 className="text-3xl font-bold mt-1">$1.2M</h3>
                                    </div>
                                    <div className="p-3 bg-secondary/30 rounded-full">
                                        <DollarSign className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500 font-medium">
                                    <TrendingUp className="w-3 h-3" />
                                    +2.5% vs last year
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Spend to Date</p>
                                        <h3 className="text-3xl font-bold mt-1">$482k</h3>
                                    </div>
                                    <div className="p-3 bg-secondary/30 rounded-full">
                                        <CreditCard className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                                    40% of total budget
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Monthly Burn</p>
                                        <h3 className="text-3xl font-bold mt-1">$52k</h3>
                                    </div>
                                    <div className="h-16 w-16 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadialBarChart
                                                innerRadius="80%"
                                                outerRadius="100%"
                                                barSize={6}
                                                data={burnRateData}
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                <RadialBar
                                                    background
                                                    dataKey="value"
                                                    cornerRadius={30}
                                                />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                                            72%
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-rose-500 font-medium">
                                    <TrendingUp className="w-3 h-3" />
                                    +5% vs projected
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Main Chart */}
                        <SpotlightCard className="p-6 min-h-[400px]">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold">Spend Projection Analysis</h3>
                                <p className="text-sm text-muted-foreground">Tracking actual spend against fiscal year projections.</p>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlySpendData}>
                                        <defs>
                                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="var(--muted-foreground)"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="var(--muted-foreground)"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--popover)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                            labelStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="var(--primary)"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorActual)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="projected"
                                            stroke="var(--muted-foreground)"
                                            strokeDasharray="4 4"
                                            strokeWidth={2}
                                            fill="transparent"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </SpotlightCard>

                    </div>
                </div>
            </main>
        </div>
    );
}
