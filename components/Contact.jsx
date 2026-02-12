"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Download, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const email = "chaitanya21.raj@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/chaitanya-raj-93033528b/";
  const githubUrl = "https://github.com/chaitanraj";

  return (
    <section id="contact" className="py-8 sm:py-12 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center theme-surface-emphasis border border-[var(--color-glass-border)] rounded-[20px] sm:rounded-[24px] backdrop-blur-xl shadow-[0_20px_60px_var(--color-shadow-card)] px-4 py-7 sm:px-8 sm:py-10 md:px-10 md:py-12"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold heading-font mb-4 sm:mb-6 text-gradient"
          >
            Let’s Work Together
          </motion.h2>

          {/* Contact Message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-center theme-text-secondary mb-4 sm:mb-5 leading-relaxed"
          >
            If you’re looking for a developer who does more than just{" "}
            <span className="theme-text-primary font-semibold">“finish tasks” — someone who genuinely cares,</span> obsesses over the details, and{" "}
            <span className="theme-text-primary font-semibold">pushes the project forward</span> — you’re in the right place.
            I enjoy building high-quality products with teams that value ownership. If you&apos;re building something exciting,<br className="hidden sm:block"></br><span className="theme-text-primary font-semibold"> Let&apos;s connect.</span>

          </motion.p>


          <motion.p
            initial={{ opacity: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm theme-text-muted mb-7 sm:mb-10"
          >
            ⚡ Preferred contact: Email or LinkedIn • I usually reply within 24 hours
          </motion.p>

          {/* Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-7 sm:mb-10"
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] theme-text-primary font-medium hover:border-orange-400/40 hover:shadow-[0_0_30px_rgba(255,122,24,0.15)] transition-all hover:scale-105 backdrop-blur-xl"
            >
              <Mail size={16} className="text-orange-400 sm:h-[18px] sm:w-[18px]" />
              Email Me
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] theme-text-primary font-medium hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(255,77,109,0.15)] transition-all hover:scale-105 backdrop-blur-xl"
            >
              <Linkedin size={16} className="text-[#0A66C2] sm:h-[18px] sm:w-[18px]" />
              LinkedIn
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] theme-text-primary font-medium hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(201,24,255,0.15)] transition-all hover:scale-105 backdrop-blur-xl"
            >
              <Github size={16} className="text-purple-400 sm:h-[18px] sm:w-[18px]" />
              GitHub
            </a>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:opacity-90 transition-all shadow-lg shadow-pink-500/20 hover:scale-105"
            >
              <Download size={16} className="sm:h-[18px] sm:w-[18px]" />
              Download Resume
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 theme-text-muted text-xs sm:text-sm"
          >
            <MapPin size={14} className="theme-text-muted sm:h-4 sm:w-4" />
            Greater Noida, India
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



