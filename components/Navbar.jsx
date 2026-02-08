"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, personalInfo } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navLinks.map(link => link.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? "navbar-glass"
                : "bg-transparent"
                }`}
        >
            <div className="w-full px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <Link
                            href="#hero"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("#hero");
                            }}
                            className="text-lg font-bold heading-font text-gradient"
                        >
                            CR
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeSection === link.href.replace("#", "")
                                    ? "text-[#ff7a18] bg-[#ff7a18]/10"
                                    : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-[var(--color-glass-bg)]"
                                    }`}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                        {/* Dark Mode Icon (decorative) */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="ml-1 p-1.5 rounded-lg text-[color:var(--color-text-muted)] hover:text-[#ff7a18] hover:bg-[var(--color-glass-bg)] transition-all"
                            aria-label="Toggle theme"
                        >
                            <Moon size={14} />
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button className="p-2 rounded-lg hover:bg-[var(--color-glass-bg)] transition-colors">
                                    <Menu size={20} className="theme-text-primary" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-3 mt-8">
                                    {navLinks.map((link) => (
                                        <motion.button
                                            key={link.name}
                                            onClick={() => scrollToSection(link.href)}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${activeSection === link.href.replace("#", "")
                                                ? "text-[#ff7a18] bg-[#ff7a18]/10"
                                                : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-[var(--color-glass-bg)]"
                                                }`}
                                        >
                                            {link.name}
                                        </motion.button>
                                    ))}
                                    <div className="pt-4 border-t theme-divider">
                                        <Button variant="primary" className="w-full" size="sm" asChild>
                                            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                Resume
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
