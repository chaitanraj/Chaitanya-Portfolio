"use client";

import { useEffect, useState } from "react";
import {
    Home,
    Briefcase,
    Mail,
    Github,
    Linkedin,
    Download,
    Sun,
    Moon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";


const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "Resume", href: "/resume.pdf", icon: Download, external: true },
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com/chaitanraj", icon: Github, external: true },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/chaitanya-raj-93033528b/", icon: Linkedin, external: true },
];

export default function FloatingDock() {
    const [active, setActive] = useState("#home");
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const sections = navLinks
            .filter((l) => l.href.startsWith("#"))
            .map((l) => document.querySelector(l.href))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const renderLink = (item) => {
        const Icon = item.icon;
        const isActive = active === item.href;

        return (
            <a
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noreferrer" : undefined}
                className={`group/icon relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200
                ${isActive
                        ? "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white shadow-[0_0_30px_rgba(255,77,109,0.45)]"
                        : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] hover:bg-[var(--color-glass-bg)] hover:shadow-[0_0_25px_rgba(255,122,24,0.18)]"
                    }`}
            >
                <Icon
                    size={15}
                    className="transition-transform duration-200 group-hover/icon:scale-110"
                />

                {/* Tooltip */}
                <span
                    className="
                  pointer-events-none absolute -top-12
                  scale-0 group-hover/icon:scale-100
                  transition-all duration-200
                  text-xs px-3 py-1.5 rounded-lg
                  theme-tooltip
                "
                >
                    <span className="group-hover/icon:bg-gradient-to-r group-hover/icon:from-orange-400 group-hover/icon:via-pink-500 group-hover/icon:to-purple-500 group-hover/icon:bg-clip-text group-hover/icon:text-transparent">
                        {item.name}
                    </span>
                </span>
            </a>
        );
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div
                className="
          group flex items-center gap-2 px-4 py-2.5
          rounded-full bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] backdrop-blur-xl
          shadow-xl shadow-[var(--color-shadow-card)]
          transition-all duration-300
          hover:px-6 hover:py-3.5 hover:gap-3 hover:scale-[1.03]
        "
            >
                {/* Navigation Links */}
                {navLinks.map(renderLink)}

                {/* Separator */}
                <div className="w-px h-5 bg-[var(--color-divider)] mx-1" />

                {/* Social Links */}
                {socialLinks.map(renderLink)}

                {/* Theme Toggle Icon */}
                <div className="w-px h-5 bg-[var(--color-divider)] mx-1" />
                <button
                    onClick={toggleTheme}
                    className="group/icon relative flex items-center justify-center w-9 h-9 rounded-full text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] hover:bg-[var(--color-glass-bg)] hover:shadow-[0_0_25px_rgba(255,122,24,0.18)] transition-all duration-200 cursor-pointer"
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <Sun size={15} className="transition-transform duration-200 group-hover/icon:scale-110" />
                    ) : (
                        <Moon size={15} className="transition-transform duration-200 group-hover/icon:scale-110" />
                    )}
                    <span
                        className="
              pointer-events-none absolute -top-12
              scale-0 group-hover/icon:scale-100
              transition-all duration-200
              text-xs px-3 py-1.5 rounded-lg
              theme-tooltip
            "
                    >
                        <span className="group-hover/icon:bg-gradient-to-r group-hover/icon:from-orange-400 group-hover/icon:via-pink-500 group-hover/icon:to-purple-500 group-hover/icon:bg-clip-text group-hover/icon:text-transparent">
                            {isDark ? "Light" : "Dark"}
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
}
