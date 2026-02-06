"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, terminalLines } from "@/lib/data";

// Terminal typing effect component
function TerminalTyping() {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentLine >= terminalLines.length) {
            setIsComplete(true);
            return;
        }

        const line = terminalLines[currentLine];

        if (currentChar < line.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    if (newLines.length <= currentLine) {
                        newLines.push("");
                    }
                    newLines[currentLine] = line.substring(0, currentChar + 1);
                    return newLines;
                });
                setCurrentChar(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
                setCurrentChar(0);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentLine, currentChar]);

    return (
        <div className="terminal max-w-2xl mx-auto">
            <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-4 text-xs text-text-muted">portfolio.sh</span>
            </div>
            <div className="p-4 min-h-[180px]">
                {displayedLines.map((line, index) => (
                    <div key={index} className="font-mono text-sm text-accent-cyan mb-1">
                        {line}
                    </div>
                ))}
                {!isComplete && (
                    <span className="cursor-blink" />
                )}
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-gradient" />
            <div className="absolute inset-0 grid-bg" />

            {/* Animated Gradient Orb */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/4 right-1/4 gradient-orb"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="absolute bottom-1/4 left-1/4 gradient-orb"
                style={{ animationDelay: "2s" }}
            />

            <div className="section-container relative z-10">
                <div className="text-center">
                    {/* Terminal Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <TerminalTyping />
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-display heading-font mb-4"
                    >
                        <span className="text-gradient">{personalInfo.name}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-subheading text-text-secondary mb-2"
                    >
                        {personalInfo.title}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg text-text-muted mb-8"
                    >
                        {personalInfo.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-12"
                    >
                        <Button variant="primary" size="lg" asChild>
                            <a href="#projects">
                                View Projects
                            </a>
                        </Button>
                        <Button variant="secondary" size="lg" asChild>
                            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <Download size={18} className="mr-2" />
                                Resume
                            </a>
                        </Button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <motion.a
                            href={`https://github.com/${personalInfo.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl glass-card text-text-muted hover:text-accent-cyan transition-colors"
                        >
                            <Github size={22} />
                        </motion.a>
                        <motion.a
                            href={`https://linkedin.com/in/${personalInfo.linkedin.toLowerCase().replace(" ", "-")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl glass-card text-text-muted hover:text-accent-cyan transition-colors"
                        >
                            <Linkedin size={22} />
                        </motion.a>
                        <motion.a
                            href={`mailto:${personalInfo.email}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl glass-card text-text-muted hover:text-accent-cyan transition-colors"
                        >
                            <Mail size={22} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-text-muted"
                >
                    <ChevronDown size={28} />
                </motion.div>
            </motion.div>
        </section>
    );
}
