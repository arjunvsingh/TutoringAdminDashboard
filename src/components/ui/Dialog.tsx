"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    return (
        <AnimatePresence>
            {open && (
                <div className="relative z-50">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                    />
                    {/* Content Wrapper */}
                    <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
                        {children}
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto bg-card text-card-foreground shadow-xl rounded-xl border border-border w-full max-h-[90vh] overflow-y-auto ${className}`}
        >
            {children}
        </motion.div>
    );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={`p-6 pb-2 space-y-1.5 ${className}`}>
            {children}
        </div>
    );
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
            {children}
        </h2>
    );
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <p className={`text-sm text-muted-foreground ${className}`}>
            {children}
        </p>
    );
}
