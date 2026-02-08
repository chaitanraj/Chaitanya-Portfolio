"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, terminalLines } from "@/lib/data";

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const isTyping = currentLineIndex < terminalLines.length;

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      return;
    }

    const currentLine = terminalLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];

          if (newLines[currentLineIndex]) {
            newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          } else {
            newLines.push(currentLine.substring(0, currentCharIndex + 1));
          }

          return newLines;
        });

        setCurrentCharIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
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
    <section id="home" className="relative overflow-hidden">
      {/* Left Orange Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/3 left-0 w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] rounded-full bg-[rgba(255,122,24,0.22)] blur-[110px] sm:blur-[120px]"
        style={{ zIndex: 1 }}
      />

      {/* Right Purple Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 right-0 w-[190px] h-[190px] sm:w-[280px] sm:h-[280px] rounded-full bg-[rgba(201,24,255,0.22)] blur-[110px] sm:blur-[120px]"
        style={{ zIndex: 1 }}
      />

      <div className="section-container relative z-10 py-10 sm:py-16">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:items-center">
          {/* Left Column */}
          <div className="flex-1 text-left">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#ff7a18] text-base sm:text-lg font-semibold mb-2.5 sm:mb-3"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-display font-bold heading-font text-gradient mb-4 leading-tight"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl theme-text-primary font-semibold mb-3 sm:mb-4"
            >
              {personalInfo.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[13px] sm:text-sm md:text-base theme-text-secondary mb-6 sm:mb-7 max-w-md leading-relaxed"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-7"
            >
              <Button variant="primary" size="sm" asChild>
                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </Button>

              <Button variant="secondary" size="sm" asChild>
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-2.5 sm:gap-3"
            >
              {[
                {
                  icon: Github,
                  href: `https://github.com/${personalInfo.github}`,
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: personalInfo.linkedinUrl,
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: `mailto:${personalInfo.email}`,
                  label: "Email",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 sm:p-3 rounded-xl bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] backdrop-blur-xl theme-text-secondary hover:text-[#ff7a18] hover:border-orange-400/40 transition-all shadow-lg shadow-[var(--color-shadow-card)]"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="sm:h-[18px] sm:w-[18px]" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Terminal */}
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
                <span className="ml-2 text-[10px] theme-text-muted">terminal</span>
              </div>

              <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs md:text-sm space-y-1.5 sm:space-y-2">
                {displayedLines.map((line, index) => (
                  <p key={index} className="theme-text-secondary">
                    <span className="text-[#ff7a18]">$</span> {line}
                  </p>
                ))}

                {isTyping && <span className="cursor-blink"></span>}
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
          y: { delay: 1.5, duration: 1.5, repeat: Infinity },
        }}
        className="hidden sm:block absolute bottom-5 left-1/2 -translate-x-1/2 theme-text-muted hover:text-[#ff7a18] transition-colors z-20"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}

