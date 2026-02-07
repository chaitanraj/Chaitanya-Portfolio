"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, terminalLines } from "@/lib/data";

export default function Hero() {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (currentLineIndex >= terminalLines.length) {
            setIsTyping(false);
            return;
        }

        const currentLine = terminalLines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLineIndex]) {
                        newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
                    } else {
                        newLines.push(currentLine.substring(0, currentCharIndex + 1));
                    }
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 30);

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex]);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            className="pt-12 pb-16 relative overflow-hidden"
        >
            {/* Animated Gradient Orb */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/4 right-0 w-[200px] h-[200px] rounded-full bg-[rgba(201,24,255,0.25)] blur-[100px]"
                style={{ filter: "blur(100px)", zIndex: 1 }}
            />

            <div className="section-container relative z-10 py-8">
                {/* Two Column Layout: Name/Title + Terminal */}
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left Column: Name & Info */}
                    <div className="flex-1 text-left">
                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[#ff7a18] text-xs font-medium mb-2"
                        >
                            Hello, I&apos;m
                        </motion.p>

                        {/* Name - Gradient text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-display font-bold heading-font text-gradient mb-2"
                        >
                            {personalInfo.name}
                        </motion.h1>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-sm text-white font-semibold mb-3"
                        >
                            {personalInfo.title}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xs text-[rgba(255,255,255,0.5)] mb-5 max-w-sm"
                        >
                            {personalInfo.subtitle}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-2 mb-5"
                        >
                            <Button variant="primary" size="sm" asChild>
                                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                    View Resume
                                </a>
                            </Button>
                            <Button variant="secondary" size="sm" asChild>
                                <Link href="#contact">
                                    Get in Touch
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            {[
                                { icon: Github, href: `https://github.com/${personalInfo.github}`, label: "GitHub" },
                                { icon: Linkedin, href: `https://linkedin.com/in/${personalInfo.linkedin}`, label: "LinkedIn" },
                                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg glass-card text-[rgba(255,255,255,0.5)] hover:text-[#ff7a18] transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={16} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Terminal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex-1 w-full"
                    >
                        <div className="terminal">
                            <div className="terminal-header">
                                <div className="terminal-dot bg-red-500"></div>
                                <div className="terminal-dot bg-yellow-500"></div>
                                <div className="terminal-dot bg-green-500"></div>
                                <span className="ml-2 text-[9px] text-[rgba(255,255,255,0.3)]">terminal</span>
                            </div>
                            <div className="p-3 font-mono text-[10px] space-y-1">
                                {displayedLines.map((line, index) => (
                                    <p key={index} className="text-[rgba(255,255,255,0.6)]">
                                        <span className="text-[#ff7a18]">$</span> {line}
                                    </p>
                                ))}
                                {isTyping && (
                                    <span className="cursor-blink"></span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 6, 0] }}
                transition={{
                    opacity: { delay: 1.5, duration: 0.5 },
                    y: { delay: 1.5, duration: 1.5, repeat: Infinity }
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[rgba(255,255,255,0.4)] hover:text-[#ff7a18] transition-colors"
            >
                <ChevronDown size={20} />
            </motion.button>
        </section>
    );
}
