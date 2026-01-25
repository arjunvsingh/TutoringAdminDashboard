"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    PieChart,
    FileText,
    LayoutDashboard,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Live Ops", href: "/", icon: LayoutDashboard },
    { name: "Student Roster", href: "/roster", icon: Users },
    { name: "Budget", href: "/budget", icon: PieChart },
    { name: "Impact Reports", href: "/reports", icon: FileText },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <div className={cn("flex min-h-screen w-64 flex-col border-r px-4 py-6 text-white", className)}>
            <div className="flex items-center gap-3 px-2 mb-10">
                {/* Enhanced Logo */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold shadow-lg shadow-emerald-500/20">
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                    V
                </div>
                <div>
                    <span className="block text-lg font-bold tracking-tight text-white">Varsity</span>
                    <span className="block text-[10px] font-medium text-white/50 uppercase tracking-widest">Live Operations</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col space-y-1.5">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 overflow-hidden",
                                isActive
                                    ? "text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {/* Active State Background & Glow */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500" />
                            )}

                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors relative z-10",
                                    isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
                                )}
                                aria-hidden="true"
                            />
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Profile Section */}
            <div className="border-t border-white/5 pt-6 space-y-2">
                <div className="px-2 pb-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-zinc-400">
                        JD
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Jane Doe</p>
                        <p className="text-xs text-zinc-500 truncate">District Admin</p>
                    </div>
                </div>

                <Link
                    href="#"
                    className="group flex items-center rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"
                >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                </Link>
                <Link
                    href="#"
                    className="group flex items-center rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-white/5 hover:text-rose-400 transition-colors"
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                </Link>
            </div>
        </div>
    );
}
