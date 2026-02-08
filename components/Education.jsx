"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="education" className="relative">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="text-heading font-bold heading-font text-gradient mb-12"
                    >
                        Education
                    </motion.h2>

                    {/* Education Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 relative overflow-hidden group hover:border-[#ff7a18]/30 transition-colors"
                    >
                        {/* Animated Gradient Underline - Orange → Pink → Purple */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                            style={{ background: "linear-gradient(90deg, #ff7a18, #ff4d6d, #c918ff)" }}
                        />

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-2xl border border-[var(--color-glass-border)] flex items-center justify-center group-hover:scale-110 transition-transform"
                                style={{ background: "linear-gradient(135deg, rgba(255,122,24,0.2), rgba(201,24,255,0.2))" }}>
                                <GraduationCap size={40} className="text-[#ff7a18]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold heading-font text-text-primary">
                                    {education.degree}
                                </h3>
                                <p className="text-[#c918ff] font-medium text-lg">
                                    {education.university}
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 mt-6">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-divider)]">
                                        <Award size={18} className="text-[#ff7a18]" />
                                        <div>
                                            <span className="text-text-muted text-xs block">GPA</span>
                                            <span className="text-text-primary font-bold">{education.gpa}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-divider)]">
                                        <Calendar size={18} className="text-[#c918ff]" />
                                        <div>
                                            <span className="text-text-muted text-xs block">Expected</span>
                                            <span className="text-text-primary font-bold">{education.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Glow */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ff7a18]/10 rounded-full blur-3xl group-hover:bg-[#ff7a18]/20 transition-colors" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
