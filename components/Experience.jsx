"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="relative">
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
                        Experience
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink origin-top"
                        />

                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
                                    className={`relative flex flex-col md:flex-row items-start gap-6 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                                        <div className="w-4 h-4 rounded-full bg-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="ml-8 md:ml-0 md:w-[calc(50%-30px)] flex-1">
                                        <div className="glass-card p-6 hover:border-accent-cyan/30 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
                                                    <Briefcase size={24} className="text-accent-cyan" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold heading-font text-text-primary">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-accent-purple font-medium">
                                                        {exp.company}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-text-muted mt-1">
                                                        <Calendar size={14} />
                                                        <span className="text-sm">{exp.duration}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bullet Points */}
                                            <ul className="mt-4 space-y-2">
                                                {exp.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                                                        <span className="text-accent-cyan mt-1">▸</span>
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
