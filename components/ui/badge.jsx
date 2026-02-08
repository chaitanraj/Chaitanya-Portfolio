import { cn } from "@/lib/utils";

const variants = {
    // Orange skill badge (default)
    default: "bg-[rgba(255,122,24,0.08)] text-[#ff9a3d] border border-[rgba(255,122,24,0.35)]",
    // Pink variant
    pink: "bg-[rgba(255,77,109,0.08)] text-[#ff4d6d] border border-[rgba(255,77,109,0.35)]",
    // Purple variant
    purple: "bg-[rgba(201,24,255,0.08)] text-[#c918ff] border border-[rgba(201,24,255,0.35)]",
    // Outline variant
    outline: "bg-transparent text-text-secondary border border-[var(--color-glass-border)] hover:border-[var(--color-divider)]",
};

export function Badge({ children, variant = "default", className, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                "hover:shadow-[0_0_15px_rgba(255,122,24,0.2)]",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
