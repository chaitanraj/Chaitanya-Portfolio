"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="experience" className="relative">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{ delay: 0.1 }}
                        className="text-heading font-bold heading-font text-gradient mb-8 sm:mb-12"
                    >
                        Experience
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline Line - Orange to Pink to Purple gradient */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] h-full origin-top"
                            style={{
                                background: "linear-gradient(to bottom, #ff7a18, #ff4d6d, #c918ff)"
                            }}
                        />

                        <div className="space-y-8 sm:space-y-12">
                            {experience.map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    transition={{ delay: 0.2 + index * 0.15, duration: 0.45, ease: "easeOut" }}
                                    className={`relative flex flex-col md:flex-row items-start gap-4 sm:gap-6 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Timeline Dot - Orange glow */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                                        <div className="w-4 h-4 rounded-full bg-[#ff7a18] shadow-[0_0_20px_rgba(255,122,24,0.5)]" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="ml-8 md:ml-0 md:w-[calc(50%-30px)] flex-1">
                                        <div className="glass-card p-4 sm:p-6 hover:border-[#ff7a18]/30 transition-colors">
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                <div className="p-2.5 sm:p-3 rounded-lg bg-[#ff7a18]/10 border border-[#ff7a18]/20">
                                                    <Briefcase size={20} className="text-[#ff7a18] sm:h-6 sm:w-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-base sm:text-lg font-bold heading-font theme-text-primary">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-[#ff9a3d] font-medium text-sm sm:text-base">
                                                        {exp.company}
                                                    </p>
                                                    <div className="flex items-center gap-2 theme-text-muted mt-1">
                                                        <Calendar size={13} className="sm:h-[14px] sm:w-[14px]" />
                                                        <span className="text-xs sm:text-sm text-[#ff7a18]">{exp.duration}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bullet Points */}
                                            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                                                {exp.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex items-start gap-2 theme-text-muted text-xs sm:text-sm">
                                                        <span className="text-[#ff7a18] mt-1">▸</span>
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block md:w-[calc(50%-30px)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


