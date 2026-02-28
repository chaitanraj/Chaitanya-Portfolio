"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFlask,
  SiTailwindcss, SiJavascript, SiTypescript, SiPython,
  SiHtml5, SiCss3, SiMongodb, SiPostgresql, SiMysql,
  SiPrisma, SiSequelize, SiDocker, SiGit, SiGithub,
  SiPandas, SiNumpy,
} from "react-icons/si";
import { FaJava, FaChrome } from "react-icons/fa";
import { TbChartLine, TbAlertTriangle } from "react-icons/tb";
import { MdOutlineTimer } from "react-icons/md";
import { DatabaseBackup, DatabaseIcon, GitBranch, Vibrate } from "lucide-react";

/* ---------------- SKILLS ---------------- */

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
  { name: "VectorDB", icon: DatabaseBackup, color: "#cd5915ff" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
  { name: "Sequelize ORM", icon: SiSequelize, color: "#52B0E7" },

  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Docker Compose", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "var(--color-text-primary)" },

  { name: "Prophet", icon: TbChartLine, color: "#ff7a18" },
  { name: "LangChain", icon: GitBranch, color: "#4971e6ff" },
  { name: "RAG", icon: DatabaseIcon, color: "#ed6ca4ff" },
  { name: "pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#013243" },
  { name: "Isolation Forest", icon: TbAlertTriangle, color: "#ff4d6d" },
  { name: "Time-Series Forecasting", icon: MdOutlineTimer, color: "#c918ff" },
  { name: "Chrome Extensions", icon: FaChrome, color: "#4285F4" },
];

/* ---------------- SKILL PILL ---------------- */

function SkillPill({ skill, index, isMobile, explode }) {
  const Icon = skill.icon;

  /* ---------- MOBILE EXPLODE ---------- */
  if (isMobile) {
    const total = skills.length;

    // even radial distribution
    const angle = (index / total) * Math.PI * 2;

    // screen-based explosion radius (FULL viewport)
    const radius =
      Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 0.55;

    const explodeX = Math.cos(angle) * radius;
    const explodeY = Math.sin(angle) * radius;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          explode
            ? {
              x: explodeX,
              y: explodeY,
              rotate: angle * 40,
              scale: [1, 1.25, 1.18], 
              opacity: 1,
            }
            : {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
            }
        }
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
          mass: 0.8,
          delay: index * 0.012,
        }}
        whileTap={{ scale: 1.12 }}
        style={{
          position: "relative",
          zIndex: explode ? 999 : 1, 
        }}
        className="
        inline-flex items-center justify-center
        gap-1.5 sm:gap-2 rounded-lg
        bg-[var(--color-glass-bg)]
        border border-dashed border-[var(--color-glass-border)]
        backdrop-blur-none sm:backdrop-blur-md
        shadow-sm sm:shadow-md shadow-[var(--color-shadow-card)]
        transition-transform duration-150
        px-2.5 py-1 text-[11px]
        sm:px-4 sm:py-2 sm:text-sm
        pill-item
      "
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
  /* ---------- DESKTOP (UNCHANGED) ---------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        delay: Math.min(index * 0.01, 0.15),
        duration: 0.3,
        ease: "easeOut",
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.95}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 0 20px rgba(255,122,24,0.25),0 0 40px rgba(201,24,255,0.15)",
        borderColor: "rgba(255,122,24,0.45)",
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
      style={{ willChange: "transform" }}
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

/* ---------------- MAIN COMPONENT ---------------- */

export default function TechStack3() {
  const [shakeText, setShakeText] = useState("Shake your phone");
  const [explode, setExplode] = useState(false);
  const explodingRef = useRef(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [isMobile, setIsMobile] = useState(false);

  /* mobile detection */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* shake detection */
  useEffect(() => {
    function handleMotion(event) {
      const { x = 0, y = 0, z = 0 } =
        event.accelerationIncludingGravity || {};

      const value = Math.abs(x) + Math.abs(y) + Math.abs(z);

      if (value > 30 && !explodingRef.current) {
        explodingRef.current = true;

        setShakeText("Thanks for the shake!");

        setTimeout(() => setExplode(true), 300);

        setTimeout(() => {
          setExplode(false);
          explodingRef.current = false;
          setShakeText("Shake your phone");
        }, 2000);
      }
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-5 sm:mb-7">
            <h2 className="text-heading font-bold heading-font text-gradient">
              Tech Stack
            </h2>

            <div className="flex items-center gap-2 text-gray-300 text-xs italic font-bold select-none">
              {!isMobile ? (
                <>
                  <span className="text-gray-400">Drag the pills</span>
                  <span className="text-lg">🫳</span>
                </>
              ) : (
                <>
                  <span className="text-gray-400">{shakeText}</span>
                  <Vibrate className="w-5 h-5 text-gray-400" />
                </>
              )}
            </div>
          </div>

          {/* SKILLS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex flex-wrap sm:justify-start justify-center gap-0.5 sm:gap-1 overflow-visible"
          >
            {skills.map((skill, i) => (
              <SkillPill
                key={skill.name}
                skill={skill}
                index={i}
                isMobile={isMobile}
                explode={explode}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}