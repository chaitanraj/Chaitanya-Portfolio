"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutText, timeline } from "@/lib/data";
import { Code2, Cpu, Rocket, MapPin } from "lucide-react";

// Spotlight Text Component
function SpotlightText({ text, containerClassName = "", textClassName = "" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      className={`relative group cursor-default ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Layer - Grey */}
      <p className={`theme-text-secondary leading-relaxed whitespace-pre-line ${textClassName}`}>
        {text}
      </p>

      {/* Reveal Layer - Gradient with Mask */}
      <p
        className={`absolute inset-0 select-none pointer-events-none leading-relaxed whitespace-pre-line bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent transition-opacity duration-300 ${textClassName}`}
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          maskImage: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
        aria-hidden="true"
      >
        {text}
      </p>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold heading-font mb-5 sm:mb-6 text-gradient"
          >
            About Me
          </motion.h2>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg mb-8 sm:mb-12"
          >
            <SpotlightText
              text="A quick overview of who I am, what I build, and what I’m currently focused on."
              textClassName="text-base sm:text-lg max-w-3xl"
            />
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-14">
            {/* About Text Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass-card p-5 sm:p-7 md:p-8"
            >
              <SpotlightText
                text={aboutText}
                textClassName="text-[15px] sm:text-base md:text-lg"
              />
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-5 sm:p-7 md:p-8"
            >
              <h3 className="text-lg sm:text-xl font-semibold theme-text-primary mb-4 sm:mb-6">
                Quick Snapshot
              </h3>

              <div className="space-y-4 sm:space-y-5">
                {/* Role */}
                <div className="flex items-start gap-3">
                  <Code2 className="text-orange-400 mt-1 shrink-0" size={18} />
                  <div className="w-full">
                    <p className="font-semibold theme-text-primary text-sm sm:text-base">Full Stack Developer</p>
                    <SpotlightText
                      text="MERN • PERN • AI/ML"
                      textClassName="text-xs sm:text-sm"
                      containerClassName="-mt-1"
                    />
                  </div>
                </div>

                {/* Focus */}
                <div className="flex items-start gap-3">
                  <Cpu className="text-pink-500 mt-1 shrink-0" size={18} />
                  <div className="w-full">
                    <p className="font-semibold theme-text-primary text-sm sm:text-base">Focus</p>
                    <SpotlightText
                      text="Scalable APIs, system design, performance"
                      textClassName="text-xs sm:text-sm"
                      containerClassName="-mt-1"
                    />
                  </div>
                </div>

                {/* Currently Building */}
                <div className="flex items-start gap-3">
                  <Rocket className="text-purple-400 mt-1 shrink-0" size={18} />
                  <div className="w-full">
                    <p className="font-semibold theme-text-primary text-sm sm:text-base">Currently Building</p>
                    <SpotlightText
                      text="Real-world apps + AI-integrated products"
                      textClassName="text-xs sm:text-sm"
                      containerClassName="-mt-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

