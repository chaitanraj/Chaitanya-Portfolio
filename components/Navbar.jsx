"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, personalInfo } from "@/lib/data";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
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
                            className="text-xl font-bold heading-font text-gradient"
                        >
                            {personalInfo.name.split(" ")[0]}
                            <span className="text-accent-cyan">.</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === link.href.replace("#", "")
                                        ? "text-accent-cyan bg-accent-cyan/10"
                                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                    }`}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Resume Button - Desktop */}
                    <div className="hidden md:block">
                        <Button variant="primary" size="sm" asChild>
                            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                Resume
                            </a>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <Menu size={24} className="text-text-primary" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-4 mt-8">
                                    {navLinks.map((link) => (
                                        <motion.button
                                            key={link.name}
                                            onClick={() => scrollToSection(link.href)}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${activeSection === link.href.replace("#", "")
                                                    ? "text-accent-cyan bg-accent-cyan/10"
                                                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                                }`}
                                        >
                                            {link.name}
                                        </motion.button>
                                    ))}
                                    <div className="pt-4 border-t border-white/10">
                                        <Button variant="primary" className="w-full" asChild>
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
