"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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
function ProjectCard({ project, index, onClick, reduceMotion }) {
  const cardHoverAnimation = reduceMotion ? undefined : { scale: 1.01, y: -2 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      className={cn(
        "scroll-card flex-shrink-0 flex flex-col",
        "w-[248px] sm:w-[340px] lg:w-[420px]",
        "h-[396px] sm:h-[500px] lg:h-[540px]",
        "glass-card overflow-hidden cursor-pointer group rounded-2xl"
      )}
      whileHover={cardHoverAnimation}
    >
      {/* Project Cover Image */}
      <div className="relative h-36 sm:h-42 lg:h-56 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 264px, (max-width: 1024px) 340px, 420px"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
          />
        ) : (
          <>
            <div
              className={cn(
                "absolute inset-0 transition-all duration-500",
                "bg-gradient-to-br from-[#ff7a18]/20 via-[#ff4d6d]/20 to-[#c918ff]/10"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a18]/30 to-[#c918ff]/30 opacity-50 transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold heading-font text-[color:var(--color-text-muted)] opacity-30">
                {project.title.substring(0, 2)}
              </span>
            </div>
          </>
        )}

        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-5 flex flex-1 flex-col min-h-0">
        <h3 className="text-[15px] sm:text-lg font-bold heading-font theme-text-primary mb-1.5 sm:mb-2 group-hover:text-[#ff7a18] transition-colors">
          {project.title}
        </h3>

        <p className="theme-text-secondary text-[11px] sm:text-sm leading-relaxed mb-3.5 sm:mb-4">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-5 min-h-[48px] sm:min-h-[56px] content-start">
          {project.tech.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="default"
              className="text-[9px] sm:text-[11px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
            >
              {tech}
            </Badge>
          ))}

          {project.tech.length > 3 && (
            <Badge
              variant="outline"
              className="text-[9px] sm:text-[11px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
            >
              +{project.tech.length - 3}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 mt-auto">
          {/* Code */}
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-[11px] sm:text-sm py-2 sm:py-3 rounded-xl"
            asChild
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} className="mr-1.5 sm:mr-2 sm:h-4 sm:w-4" />
              Code
            </a>
          </Button>

          {/* Live (Disabled if no link) */}
          <Button
            variant="primary"
            size="sm"
            className={cn(
              "flex-1 text-[11px] sm:text-sm py-2 sm:py-3 rounded-xl",
              !project.live && "opacity-50 cursor-not-allowed"
            )}
            asChild={!!project.live}
          >
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} className="mr-1.5 sm:mr-2 sm:h-4 sm:w-4" />
                Live
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2 cursor-not-allowed">
                <ExternalLink size={14} className="opacity-70 sm:h-4 sm:w-4" />
                Live
              </span>
            )}
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
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base mt-3 leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Key Features */}
          <div>
            <h4 className="text-xs font-semibold text-[#ff7a18] mb-2">
              Key Features
            </h4>
            <ul className="space-y-1.5">
              {project.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 theme-text-secondary text-sm"
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

            <Button
              variant="primary"
              size="sm"
              className={cn(
                "flex-1",
                !project.live && "opacity-50 cursor-not-allowed"
              )}
              asChild={!!project.live}
            >
              {project.live ? (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={15} className="mr-2" />
                  Live Demo
                </a>
              ) : (
                <span className="flex items-center justify-center gap-2 cursor-not-allowed">
                  <ExternalLink size={15} className="opacity-70" />
                  Live Demo
                </span>
              )}
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
  const shouldReduceMotion = useReducedMotion();

  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getCards = useCallback(() => {
    if (!scrollRef.current) return [];
    return Array.from(scrollRef.current.querySelectorAll(".scroll-card"));
  }, []);

  const getNearestCardIndex = useCallback(() => {
    const container = scrollRef.current;
    const cards = getCards();

    if (!container || cards.length === 0) return 0;

    let nearestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }, [getCards]);

  const scrollToCard = useCallback(
    (index) => {
      const container = scrollRef.current;
      const cards = getCards();

      if (!container || cards.length === 0) return;

      const boundedIndex = Math.max(0, Math.min(index, cards.length - 1));
      const card = cards[boundedIndex];
      const targetLeft =
        card.offsetLeft - (container.clientWidth / 2 - card.offsetWidth / 2);
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      container.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxScrollLeft)),
        behavior: "smooth",
      });
    },
    [getCards]
  );

  const scrollLeft = useCallback(() => {
    const currentIndex = getNearestCardIndex();
    scrollToCard(currentIndex - 1);
  }, [getNearestCardIndex, scrollToCard]);

  const scrollRight = useCallback(() => {
    const currentIndex = getNearestCardIndex();
    scrollToCard(currentIndex + 1);
  }, [getNearestCardIndex, scrollToCard]);

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
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="text-heading font-bold heading-font text-gradient"
            >
              Projects
            </motion.h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                className="p-1.5 sm:p-2 rounded-xl cursor-pointer glass-card hover:border-[#ff7a18]/50 transition-all"
                aria-label="Scroll projects left"
              >
                <ChevronLeft size={16} className="theme-text-secondary sm:h-[18px] sm:w-[18px]" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                className="p-1.5 sm:p-2 rounded-xl cursor-pointer glass-card hover:border-[#ff7a18]/50 transition-all"
                aria-label="Scroll projects right"
              >
                <ChevronRight size={16} className="theme-text-secondary sm:h-[18px] sm:w-[18px]" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="horizontal-scroll-container ml-2 pb-3 sm:pb-5 px-[calc(50%_-_124px)] sm:px-[calc(50%_-_170px)] lg:px-[calc(50%_-_210px)]"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  reduceMotion={shouldReduceMotion}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none" />
          </div>

          {/* Scroll Hint - Mobile */}
          <div className="flex md:hidden justify-center">
            <span className="flex items-center gap-2 text-md sm:text-sm theme-text-muted">

              {/* <ChevronLeft size={16} className="opacity-60" /> */}
              Swipe to Browse projects
              {/* <ChevronRight size={16} className="opacity-60" /> */}
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
