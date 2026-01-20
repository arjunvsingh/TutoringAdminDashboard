"use client";

import * as React from "react";
import { Command } from "cmdk";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User
} from "lucide-react";
// import { useRouter } from "next/navigation";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    // const router = useRouter(); // router unused for now

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl border bg-popover text-popover-foreground shadow-2xl p-0 overflow-hidden z-50 backdrop-blur-xl bg-opacity-95"
        >
            <div className="flex items-center border-b px-3">
                <Command.Input
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Type a command or search..."
                />
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                <Command.Group heading="Suggestions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    <Command.Item onSelect={() => console.log('Calendar')} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                    </Command.Item>
                    <Command.Item onSelect={() => console.log('Search Emoji')} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Smile className="mr-2 h-4 w-4" />
                        <span>Search Emoji</span>
                    </Command.Item>
                    <Command.Item onSelect={() => console.log('Calculator')} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Calculator</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="Settings" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    <Command.Item onSelect={() => console.log('Profile')} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘P</span>
                    </Command.Item>
                    <Command.Item onSelect={() => console.log('Billing')} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
                    </Command.Item>
                    <Command.Item onSelect={() => console.log('Settings')} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘S</span>
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command.Dialog>
    );
}
