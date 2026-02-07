"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const email = "chaitanya21.raj@gmail.com";
    const linkedinUrl = "https://www.linkedin.com/in/chaitanya-raj-93033528b/";

    return (
        <section id="contact" className="py-20 relative">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Section Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold heading-font text-white mb-8"
                    >
                        Get in Touch
                    </motion.h2>

                    {/* Contact Message */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-[rgba(255,255,255,0.7)] mb-8 flex flex-wrap items-center justify-center gap-2"
                    >
                        <span>Want to chat? Just shoot me a dm via</span>
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-800 font-medium hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <Mail size={18} className="text-red-500" />
                            Gmail
                        </a>
                        <span>or</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-[rgba(255,255,255,0.7)] flex flex-wrap items-center justify-center gap-2"
                    >
                        <span>reach out on</span>
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-800 font-medium hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <Linkedin size={18} className="text-[#0A66C2]" />
                            LinkedIn
                        </a>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
