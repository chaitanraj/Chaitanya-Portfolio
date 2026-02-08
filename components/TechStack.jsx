"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Skills data organized by category
const skillsData = {
    languages: ["Java", "JavaScript", "Python", "TypeScript", "HTML", "CSS"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Flask", "Tailwind CSS"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Prisma ORM", "Sequelize ORM"],
    aiml: ["Prophet", "pandas", "NumPy", "Isolation Forest", "Time-Series Forecasting", "Anomaly Detection"],
    devops: ["Docker", "Docker Compose", "Git", "GitHub", "Render", "Vercel"],
    others: ["REST APIs", "Async/Await", "Routing", "Chrome Extensions"]
};

// All skills flattened for marquee
const allSkills = Object.values(skillsData).flat();
const row1Skills = allSkills.slice(0, 10);
const row2Skills = allSkills.slice(10, 20);
const row3Skills = allSkills.slice(20).concat(allSkills.slice(0, 6));

// Category labels
const categories = [
    { key: "languages", label: "Languages", icon: "💻" },
    { key: "frameworks", label: "Frameworks", icon: "⚡" },
    { key: "databases", label: "Databases & ORM", icon: "🗄️" },
    { key: "aiml", label: "AI / ML", icon: "🤖" },
    { key: "devops", label: "DevOps & Tools", icon: "🚀" },
    { key: "others", label: "Others", icon: "🔧" }
];

// Skill Chip Component
function SkillChip({ name, variant = "default" }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer
                transition-all duration-300 select-none whitespace-nowrap
                ${variant === "marquee"
                    ? "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,122,24,0.5)] hover:shadow-[0_0_20px_rgba(255,122,24,0.15)]"
                    : "bg-[rgba(255,122,24,0.08)] border border-[rgba(255,122,24,0.35)] hover:border-[rgba(255,122,24,0.6)] hover:shadow-[0_0_15px_rgba(255,122,24,0.2)]"
                }
            `}
        >
            <span className={`text-sm font-medium ${variant === "marquee" ? "text-[rgba(255,255,255,0.8)]" : "text-[#ff7a18]"}`}>
                {name}
            </span>
        </motion.div>
    );
}

// Marquee Row Component
function MarqueeRow({ skills, direction = "left", duration = 25 }) {
    const duplicatedSkills = [...skills, ...skills, ...skills];

    return (
        <div className="relative overflow-hidden py-2 group">
            <motion.div
                className="flex gap-3"
                animate={{
                    x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
                }}
                transition={{
                    x: {
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
                style={{ width: "fit-content" }}
                whileHover={{ animationPlayState: "paused" }}
            >
                {duplicatedSkills.map((skill, index) => (
                    <SkillChip key={`${skill}-${index}`} name={skill} variant="marquee" />
                ))}
            </motion.div>
        </div>
    );
}

// Category Card Component
function CategoryCard({ category, skills, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-5 group"
        >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-base font-semibold text-white heading-font">
                    {category.label}
                </h3>
            </div>

            {/* Skills Grid */}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <SkillChip key={skill} name={skill} variant="card" />
                ))}
            </div>
        </motion.div>
    );
}

export default function TechStack() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="stack" className="relative overflow-hidden">
            <div className="section-container">
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-left mb-10"
                    >
                        <h2 className="text-heading font-bold heading-font text-gradient mb-3">
                            Tech Stack
                        </h2>
                        <h3 className="text-sm text-left text-[rgba(255,255,255,0.6)] max-w-lg">
                            Technologies I use to build scalable full-stack and AI-powered applications.
                        </h3>
                    </motion.div>

                    {/* Marquee Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12 -mx-4 sm:-mx-6"
                    >
                        <div className="space-y-3">
                            <MarqueeRow skills={row1Skills} direction="left" duration={30} />
                            <MarqueeRow skills={row2Skills} direction="right" duration={35} />
                            <MarqueeRow skills={row3Skills} direction="left" duration={28} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
