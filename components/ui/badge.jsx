import { cn } from "@/lib/utils";

const variants = {
    default: "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20",
    purple: "bg-accent-purple/10 text-accent-purple border border-accent-purple/20",
    pink: "bg-accent-pink/10 text-accent-pink border border-accent-pink/20",
    outline: "bg-transparent text-text-secondary border border-white/10 hover:border-white/20",
};

export function Badge({ children, variant = "default", className, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
