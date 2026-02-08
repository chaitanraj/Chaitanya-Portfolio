"use client";

import { forwardRef, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(({
    children,
    variant = "primary",
    size = "md",
    className,
    asChild = false,
    ...props
}, ref) => {
    const variants = {
        // Primary CTA button with orange → pink → purple gradient
        primary: "bg-gradient-to-r from-[#ff7a18] via-[#ff4d6d] to-[#c918ff] text-white hover:shadow-[0_0_25px_rgba(255,77,109,0.35)] hover:-translate-y-0.5",
        // Secondary glass button
        secondary: "bg-[var(--color-glass-bg)] text-text-primary border border-[var(--color-glass-border)] hover:bg-[var(--color-glass-bg-strong)] hover:border-[#ff7a18]/50 hover:shadow-[0_0_20px_rgba(255,122,24,0.1)]",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-[var(--color-glass-bg)]",
        icon: "p-2 text-text-muted hover:text-[#ff7a18] hover:bg-[var(--color-glass-bg)] rounded-lg",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
    };

    const buttonClassName = cn(
        "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff7a18]/50 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        variant !== "icon" && "rounded-xl",
        className
    );

    // If asChild is true, render the child element with button styles
    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            className: cn(buttonClassName, children.props.className),
            ...props,
        });
    }

    return (
        <button
            ref={ref}
            className={buttonClassName}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
