"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

// Project Card Component
function ProjectCard({ project, index, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={cn(
                "scroll-card w-[350px] sm:w-[400px] md:w-[450px] flex-shrink-0",
                "glass-card overflow-hidden cursor-pointer group"
            )}
            whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: -2,
            }}
            style={{ transformPerspective: 1000 }}
        >
            {/* Project Image Placeholder */}
            <div className="relative h-48 overflow-hidden">
                <div
                    className={cn(
                        "absolute inset-0 transition-all duration-500",
                        "bg-gradient-to-br from-accent-cyan/20 via-accent-purple/20 to-accent-cyan/10"
                    )}
                />
                <motion.div
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-br from-accent-cyan/30 to-accent-purple/30 opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold heading-font text-white/20">
                        {project.title.substring(0, 2)}
                    </span>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-accent-cyan/20 to-transparent"
                />
            </div>

            {/* Card Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold heading-font text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                </h3>
                <p className="text-text-muted text-sm line-clamp-3 mb-4">
                    {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="default" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                    {project.tech.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                            +{project.tech.length - 4}
                        </Badge>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button variant="secondary" size="sm" className="flex-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <Github size={16} className="mr-2" />
                            Code
                        </a>
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink size={16} className="mr-2" />
                            Live
                        </a>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

// Project Modal
function ProjectModal({ project, open, onOpenChange }) {
    if (!project) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-gradient">{project.title}</DialogTitle>
                    <DialogDescription className="text-base mt-2">
                        {project.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Key Features */}
                    <div>
                        <h4 className="text-sm font-semibold text-accent-cyan mb-3">Key Features</h4>
                        <ul className="space-y-2">
                            {project.bullets.map((bullet, index) => (
                                <li key={index} className="flex items-start gap-2 text-text-muted">
                                    <span className="text-accent-cyan mt-1">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-sm font-semibold text-accent-cyan mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                                <Badge key={tech} variant="default">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4 border-t border-white/10">
                        <Button variant="secondary" asChild className="flex-1">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github size={18} className="mr-2" />
                                View Source
                            </a>
                        </Button>
                        <Button variant="primary" asChild className="flex-1">
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={18} className="mr-2" />
                                Live Demo
                            </a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    return (
        <section id="projects" className="relative overflow-hidden">
            <div className="section-container">
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 }}
                            className="text-heading font-bold heading-font text-gradient"
                        >
                            Featured Projects
                        </motion.h2>

                        {/* Navigation Arrows - Desktop */}
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={scrollLeft}
                                className="p-2 rounded-lg glass-card hover:border-accent-cyan transition-all"
                            >
                                <ChevronLeft size={24} className="text-text-muted" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="p-2 rounded-lg glass-card hover:border-accent-cyan transition-all"
                            >
                                <ChevronRight size={24} className="text-text-muted" />
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="relative">
                        <div
                            ref={scrollRef}
                            className="horizontal-scroll-container pb-4"
                        >
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project.title}
                                    project={project}
                                    index={index}
                                    onClick={() => handleProjectClick(project)}
                                />
                            ))}
                        </div>

                        {/* Gradient Fade Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                    </div>

                    {/* Scroll Hint - Mobile */}
                    <div className="flex md:hidden justify-center mt-4">
                        <span className="text-xs text-text-muted">← Swipe to explore →</span>
                    </div>
                </motion.div>
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </section>
    );
}
