"use client";

import { createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogContext = createContext({});

export function Dialog({ children, open, onOpenChange }) {
    return (
        <DialogContext.Provider value={{ open, onOpenChange }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, asChild, ...props }) {
    const { onOpenChange } = useContext(DialogContext);

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

export function DialogContent({ children, className, fullscreen = false, ...props }) {
    const { open, onOpenChange } = useContext(DialogContext);

    // Scroll lock when modal is open
    useEffect(() => {
        if (!open) return undefined;

        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevBodyOverflow = document.body.style.overflow;
        const prevBodyPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.body.style.overflow = prevBodyOverflow;
            document.body.style.paddingRight = prevBodyPaddingRight;
        };
    }, [open]);

    if (typeof document === "undefined") return null;

    const dialogAnimation = fullscreen
        ? {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 12 },
        }
        : {
            initial: { opacity: 0, scale: 0.95, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 20 },
        };

    return createPortal(
        <AnimatePresence mode="wait">
            {open && (
                <div 
                    data-dialog-open 
                    style={{ 
                        position: 'fixed',
                        inset: 0,
                        zIndex: 999999,
                        isolation: 'isolate'
                    }}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/55 backdrop-blur-sm"
                        style={{ zIndex: 1 }}
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={dialogAnimation.initial}
                        animate={dialogAnimation.animate}
                        exit={dialogAnimation.exit}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            fullscreen 
                                ? "fixed inset-0 w-screen h-screen max-w-none max-h-none overflow-y-auto bg-[var(--color-background)] border-0 rounded-none shadow-2xl p-4 sm:p-6"
                                : "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-background)] border border-[var(--color-glass-border)] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8",
                            className
                        )}
                        style={{ zIndex: 2 }}
                        {...props}
                    >
                        <button
                            onClick={() => onOpenChange(false)}
                            type="button"
                            className="cursor-pointer absolute right-3 top-3 sm:right-4 sm:top-4 p-1 rounded-lg hover:bg-[var(--color-glass-bg)] transition-colors"
                        >
                            <X size={20} className="theme-text-muted" />
                        </button>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

export function DialogHeader({ className, ...props }) {
    return <div className={cn("mb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
    return (
        <h2
            className={cn("text-xl sm:text-2xl font-bold heading-font theme-text-primary", className)}
            {...props}
        />
    );
}

export function DialogDescription({ className, ...props }) {
    return (
        <p className={cn("theme-text-muted text-sm sm:text-base mt-2", className)} {...props} />
    );
}