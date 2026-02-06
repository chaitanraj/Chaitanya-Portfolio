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
        primary: "bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:shadow-lg hover:shadow-accent-cyan/25 hover:-translate-y-0.5",
        secondary: "bg-white/5 text-text-primary border border-white/10 hover:bg-white/10 hover:border-accent-cyan/50",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
        icon: "p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
    };

    const buttonClassName = cn(
        "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        variant !== "icon" && "rounded-xl",
        className
    );

    // If asChild is true, render the child element with button styles
    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            ref,
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
