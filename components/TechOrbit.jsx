"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { orbitTechs } from "@/lib/data";

// Map icon names to Lucide icons
const iconMap = {
    react: LucideIcons.Atom,
    nodejs: LucideIcons.Server,
    database: LucideIcons.Database,
    container: LucideIcons.Container,
    nextjs: LucideIcons.Globe,
    palette: LucideIcons.Palette,
    code: LucideIcons.Code2,
    braces: LucideIcons.Braces,
};

function TechIcon({ tech, index, total, orbitRadius, isHovered, onHover }) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;

    const Icon = iconMap[tech.icon] || LucideIcons.Code2;
    const isActive = isHovered === tech.name;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: isActive ? 1.2 : 1,
                x: x,
                y: y,
            }}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
                scale: { duration: 0.2 }
            }}
            onHoverStart={() => onHover(tech.name)}
            onHoverEnd={() => onHover(null)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
            <div className={`
                p-4 rounded-2xl glass-card transition-all duration-300
                ${isActive ? 'neon-glow border-accent-cyan/50' : ''}
            `}>
                <Icon
                    size={28}
                    className={`transition-colors ${isActive ? 'text-accent-cyan' : 'text-text-muted'
                        }`}
                />
            </div>

            {/* Tooltip */}
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
                >
                    <div className="px-3 py-1.5 bg-background-secondary rounded-lg border border-white/10 text-sm">
                        <span className="font-semibold text-text-primary">{tech.name}</span>
                        <p className="text-text-muted text-xs mt-0.5">{tech.description}</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

function OrbitRing({ radius, duration, reverse = false }) {
    return (
        <motion.div
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{ width: radius * 2, height: radius * 2 }}
        />
    );
}

export default function TechOrbit() {
    const [hoveredTech, setHoveredTech] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const orbitRadius = 180;

    return (
        <section id="stack" className="relative overflow-hidden">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="text-heading font-bold heading-font text-gradient text-center mb-4"
                    >
                        Tech Stack
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="text-text-secondary text-center mb-16 max-w-xl mx-auto"
                    >
                        Technologies I work with to build scalable, production-ready applications
                    </motion.p>

                    {/* Orbit Container - Desktop */}
                    <div className="hidden md:block">
                        <div className="relative h-[500px] max-w-[500px] mx-auto">
                            {/* Orbit Rings */}
                            <OrbitRing radius={orbitRadius} duration={60} />
                            <OrbitRing radius={orbitRadius * 0.6} duration={45} reverse />

                            {/* Center Sphere */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan via-accent-purple to-accent-pink neon-glow flex items-center justify-center"
                            >
                                <LucideIcons.Zap size={36} className="text-white" />
                            </motion.div>

                            {/* Tech Icons */}
                            {orbitTechs.map((tech, index) => (
                                <TechIcon
                                    key={tech.name}
                                    tech={tech}
                                    index={index}
                                    total={orbitTechs.length}
                                    orbitRadius={orbitRadius}
                                    isHovered={hoveredTech}
                                    onHover={setHoveredTech}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Grid Layout - Mobile */}
                    <div className="md:hidden grid grid-cols-3 gap-4">
                        {orbitTechs.map((tech, index) => {
                            const Icon = iconMap[tech.icon] || LucideIcons.Code2;
                            return (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card p-4 flex flex-col items-center gap-2"
                                >
                                    <Icon size={24} className="text-accent-cyan" />
                                    <span className="text-xs text-text-secondary text-center">{tech.name}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
