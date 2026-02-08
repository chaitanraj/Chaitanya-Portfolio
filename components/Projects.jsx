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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "scroll-card flex-shrink-0",
        "w-[300px] sm:w-[360px] lg:w-[420px]",
        "glass-card overflow-hidden cursor-pointer group rounded-2xl"
      )}
      whileHover={{ scale: 1.02 }}
    >
      {/* Project Cover Image */}
      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div
              className={cn(
                "absolute inset-0 transition-all duration-500",
                "bg-gradient-to-br from-[#ff7a18]/20 via-[#ff4d6d]/20 to-[#c918ff]/10"
              )}
            />
            <motion.div
              animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-[#ff7a18]/30 to-[#c918ff]/30 opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold heading-font text-[color:var(--color-text-muted)] opacity-30">
                {project.title.substring(0, 2)}
              </span>
            </div>
          </>
        )}

        {/* Glow overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold heading-font text-text-primary mb-2 group-hover:text-[#ff7a18] transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="default"
              className="text-[11px] px-3 py-1 rounded-full"
            >
              {tech}
            </Badge>
          ))}

          {project.tech.length > 3 && (
            <Badge
              variant="outline"
              className="text-[11px] px-3 py-1 rounded-full"
            >
              +{project.tech.length - 3}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-sm py-3 rounded-xl"
            asChild
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} className="mr-2" />
              Code
            </a>
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="flex-1 text-sm py-3 rounded-xl"
            asChild
          >
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-gradient">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          {/* Key Features */}
          <div>
            <h4 className="text-xs font-semibold text-[#ff7a18] mb-2">
              Key Features
            </h4>
            <ul className="space-y-1.5">
              {project.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-text-secondary text-sm"
                >
                  <span className="text-[#ff7a18] mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-[#ff7a18] mb-2">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="default" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-3 border-t theme-divider">
            <Button variant="secondary" size="sm" asChild className="flex-1">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={15} className="mr-2" />
                View Source
              </a>
            </Button>

            <Button variant="primary" size="sm" asChild className="flex-1">
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={15} className="mr-2" />
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
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="text-heading font-bold heading-font text-gradient"
            >
              Projects
            </motion.h2>

            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-xl glass-card hover:border-[#ff7a18]/50 transition-all"
              >
                <ChevronLeft size={18} className="text-text-secondary" />
              </button>

              <button
                onClick={scrollRight}
                className="p-2 rounded-xl glass-card hover:border-[#ff7a18]/50 transition-all"
              >
                <ChevronRight size={18} className="text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            <div ref={scrollRef} className="horizontal-scroll-container pb-5">
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
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none" />
          </div>

          {/* Scroll Hint - Mobile */}
          <div className="flex md:hidden justify-center mt-4">
            <span className="text-xs text-text-muted">
              ← Swipe to explore →
            </span>
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
