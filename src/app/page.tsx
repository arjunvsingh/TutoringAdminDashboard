"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { SchoolStatusGrid } from "@/components/dashboard/SchoolStatusGrid";
import { LiveFeed } from "@/components/dashboard/LiveFeed";
import { GasGauge } from "@/components/dashboard/GasGauge";
import { QualityAssurance } from "@/components/dashboard/QualityAssurance";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ActivityTicker } from "@/components/dashboard/ActivityTicker";
import { Copilot } from "@/components/layout/Copilot";
import { motion } from "framer-motion";
import { RetroGrid } from "@/components/ui/RetroGrid";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative overflow-hidden">

      {/* Background Layer - Simple and clean */}
      <div className="fixed inset-0 z-0">
        <RetroGrid />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
      </div>

      {/* Noise texture */}
      <div className="bg-noise fixed inset-0 pointer-events-none z-[45] opacity-[0.02]" />

      <CommandMenu />
      <Copilot />

      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <Sidebar className="hidden md:flex w-64 border-r fixed left-0 top-0 bottom-0 z-20 glass-sidebar backdrop-blur-md bg-background/60" />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative z-10 flex flex-col h-screen overflow-hidden">

        {/* Ticker at the top */}
        <ActivityTicker />

        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
          <div className="mx-auto max-w-7xl space-y-8 pb-32">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Live Operations</h1>
                <p className="text-muted-foreground mt-1">Real-time supervision for Lincoln High School District.</p>
              </div>
              <div className="flex items-center space-x-2 bg-secondary/50 px-3 py-1 rounded-full w-fit border border-transparent hover:border-border transition-colors cursor-help backdrop-blur-sm" title="All systems go">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-muted-foreground">System Operational</span>
              </div>
            </motion.div>

            {/* School Status Grid (replaces Mission Control) */}
            <section>
              <SchoolStatusGrid />
            </section>

            {/* Main Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Live Feed (Spans 2 columns) */}
              <LiveFeed />

              {/* Right Column (Gas Gauge + QA) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-8 col-span-1"
              >
                <GasGauge />
                <QualityAssurance />
              </motion.div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

