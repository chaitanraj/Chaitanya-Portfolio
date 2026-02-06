"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn("input-neon min-h-[120px] resize-none", className)}
        {...props}
    />
));
Textarea.displayName = "Textarea";

export { Textarea };
