"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="border-t border-white/5">
            <div className="section-container py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Made with love */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-text-muted"
                    >
                        <span>Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart size={16} className="text-accent-pink fill-accent-pink" />
                        </motion.div>
                        <span>by</span>
                        <span className="text-gradient font-semibold">{personalInfo.name}</span>
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-text-muted text-sm"
                    >
                        © {new Date().getFullYear()} All rights reserved.
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
