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
        <div className={cn("flex min-h-screen w-64 flex-col border-r bg-card px-4 py-6", className)}>
            <div className="flex items-center px-2 mb-8">
                {/* Visual Placeholder Logo */}
                <div className="h-8 w-8 rounded bg-primary mr-3 flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
                    V
                </div>
                <span className="text-lg font-semibold tracking-tight">Varsity Tutors</span>
            </div>

            <div className="flex-1 flex flex-col space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-1">
                <Link
                    href="#"
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                >
                    <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                    Settings
                </Link>
                <Link
                    href="#"
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                    Sign out
                </Link>
            </div>
        </div>
    );
}
