"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutText, timeline } from "@/lib/data";

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative">
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
                        className="text-heading font-bold heading-font text-gradient mb-8"
                    >
                        About Me
                    </motion.h2>

                    {/* About Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 mb-12"
                    >
                        <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                            {aboutText}
                        </p>
                    </motion.div>

                    {/* Developer Journey Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-xl font-semibold heading-font text-text-primary mb-6">
                            Developer Journey
                        </h3>
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink" />

                            {/* Timeline Items */}
                            <div className="space-y-6">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={item.year}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-start gap-6 group"
                                    >
                                        {/* Dot */}
                                        <div className="relative z-10 w-4 h-4 rounded-full bg-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-125 transition-transform" />

                                        {/* Content */}
                                        <div className="flex-1 pb-2">
                                            <span className="text-accent-cyan font-semibold text-sm">
                                                {item.year}
                                            </span>
                                            <p className="text-text-secondary mt-1">
                                                {item.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
