"use client";

import { createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SheetContext = createContext({});

export function Sheet({ children, open, onOpenChange }) {
    return (
        <SheetContext.Provider value={{ open, onOpenChange }}>
            {children}
        </SheetContext.Provider>
    );
}

export function SheetTrigger({ children, asChild, ...props }) {
    const { onOpenChange } = useContext(SheetContext);

    if (asChild) {
        return (
            <div onClick={() => onOpenChange(true)} {...props}>
                {children}
            </div>
        );
    }

    return (
        <button onClick={() => onOpenChange(true)} {...props}>
            {children}
        </button>
    );
}

export function SheetContent({ children, className, side = "right", ...props }) {
    const { open, onOpenChange } = useContext(SheetContext);

    const slideVariants = {
        right: {
            hidden: { x: "100%" },
            visible: { x: 0 },
        },
        left: {
            hidden: { x: "-100%" },
            visible: { x: 0 },
        },
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 theme-overlay z-[100]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={slideVariants[side]}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "fixed top-0 h-full z-[101]",
                            side === "right" ? "right-0" : "left-0",
                            "w-[280px] mobile-menu",
                            className
                        )}
                        {...props}
                    >
                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-[var(--color-glass-bg)] transition-colors"
                        >
                            <X size={20} className="theme-text-muted" />
                        </button>
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export function SheetHeader({ className, ...props }) {
    return <div className={cn("mb-6", className)} {...props} />;
}

export function SheetTitle({ className, ...props }) {
    return (
        <h2
            className={cn("text-xl font-semibold heading-font text-text-primary", className)}
            {...props}
        />
    );
}
