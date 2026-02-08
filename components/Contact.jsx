"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Download, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const email = "chaitanya21.raj@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/chaitanya-raj-93033528b/";
  const githubUrl = "https://github.com/chaitanraj";

  return (
    <section id="contact" className="py-12 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold heading-font mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
          >
            Let’s Work Together
          </motion.h2>

          {/* Contact Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-center text-text-secondary mb-5 leading-relaxed"
          >
            If you’re looking for a developer who does more than just{" "}
            <span className="text-text-primary font-semibold">“finish tasks” — someone who genuinely cares,</span> obsesses over the details, and{" "}
            <span className="text-text-primary font-semibold">pushes the project forward</span> — you’re in the right place.
            I enjoy building high-quality products with teams that value ownership. If you&apos;re building something exciting,<br></br><span className="text-text-primary font-semibold"> Let&apos;s connect.</span>

          </motion.p>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-text-muted mb-10"
          >
            ⚡ Preferred contact: Email or LinkedIn • I usually reply within 24 hours
          </motion.p>

          {/* Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-text-primary font-medium hover:border-orange-400/40 hover:shadow-[0_0_30px_rgba(255,122,24,0.15)] transition-all hover:scale-105 backdrop-blur-xl"
            >
              <Mail size={18} className="text-orange-400" />
              Email Me
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-text-primary font-medium hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(255,77,109,0.15)] transition-all hover:scale-105 backdrop-blur-xl"
            >
              <Linkedin size={18} className="text-[#0A66C2]" />
              LinkedIn
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-text-primary font-medium hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(201,24,255,0.15)] transition-all hover:scale-105 backdrop-blur-xl"
            >
              <Github size={18} className="text-purple-400" />
              GitHub
            </a>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:opacity-90 transition-all shadow-lg shadow-pink-500/20 hover:scale-105"
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-text-muted text-sm"
          >
            <MapPin size={16} className="text-text-muted" />
            Greater Noida, India
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

