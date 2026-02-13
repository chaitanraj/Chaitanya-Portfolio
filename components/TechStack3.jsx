"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiSequelize,
  SiDocker,
  SiGit,
  SiGithub,
  SiPandas,
  SiNumpy,
} from "react-icons/si";
import { FaJava, FaChrome } from "react-icons/fa";
import { TbChartLine, TbAlertTriangle } from "react-icons/tb";
import { MdOutlineTimer } from "react-icons/md";

// Skills data with icons
const skills = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "var(--color-text-primary)" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "var(--color-text-primary)" },
  { name: "Flask", icon: SiFlask, color: "var(--color-text-primary)" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },

  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },

  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
  { name: "Sequelize ORM", icon: SiSequelize, color: "#52B0E7" },

  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Docker Compose", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "var(--color-text-primary)" },

  { name: "Prophet", icon: TbChartLine, color: "#ff7a18" },
  { name: "pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#013243" },
  { name: "Isolation Forest", icon: TbAlertTriangle, color: "#ff4d6d" },
  { name: "Time-Series Forecasting", icon: MdOutlineTimer, color: "#c918ff" },
  { name: "Chrome Extensions", icon: FaChrome, color: "#4285F4" },
];

const span = document.getElementById("shaketext");

function handleMotionEvent(event) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;
  const value=Math.abs(x)+Math.abs(y)+Math.abs(z);

  if(value>10){
    span.textContent="Thanks for the shake"
  }
}

window.addEventListener("devicemotion", handleMotionEvent);

// Single Skill Pill Component - Optimized for mobile performance
function SkillPill({ skill, index, isMobile }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      // Faster animation on mobile, reduced stagger
      transition={{
        delay: isMobile ? Math.min(index * 0.01, 0.15) : index * 0.02,
        duration: isMobile ? 0.2 : 0.35,
        ease: "easeOut"
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.15}
      // Simplified hover/tap for better performance
      whileHover={isMobile ? undefined : {
        scale: 1.05,
        boxShadow:
          "0 0 20px rgba(255, 122, 24, 0.25), 0 0 40px rgba(201, 24, 255, 0.15)",
        borderColor: "rgba(255, 122, 24, 0.45)",
      }}
      whileTap={{ scale: 0.96 }}
      className="
        inline-flex items-center justify-center
        gap-1.5 sm:gap-2 rounded-lg
        bg-[var(--color-glass-bg)] border border-dashed border-[var(--color-glass-border)]
        backdrop-blur-none sm:backdrop-blur-md
        cursor-grab active:cursor-grabbing
        shadow-sm sm:shadow-md shadow-[var(--color-shadow-card)] sm:hover:shadow-lg
        transition-transform duration-150
        px-2.5 py-1 text-[11px]
        sm:px-4 sm:py-2 sm:text-sm
        pill-item
      "
      style={{ willChange: 'transform' }}
    >
      <Icon
        className="shrink-0 h-3.5 w-3.5 sm:h-4 sm:w-4"
        style={{ color: skill.color }}
      />
      <span className="font-medium theme-text-primary whitespace-nowrap text-[11px] sm:text-sm">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function TechStack3() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Detect mobile for performance optimizations
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5 sm:mb-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-heading font-bold heading-font text-gradient">
                Tech Stack
              </h2>
            </motion.div>

            {/* Drag me hint */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-gray-300 text-md sm:text-lg italic font-bold mb-1 sm:mb-2 select-none"
            >
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="flex items-center gap-1"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-300 rotate-[135deg]"
                >
                  <path
                    d="M4 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 6L20 12L14 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-400" id="shaketext">Drag the pills</span>
                <span className="text-lg sm:text-xl">🫳</span>
              </motion.div>
            </motion.div>

          </div>

          {/* Skills Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="
              flex flex-wrap justify-start gap-0.5 sm:gap-1
            "
          >
            {skills.map((skill, index) => (
              <SkillPill key={skill.name} skill={skill} index={index} isMobile={isMobile} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
