"use client";

import { useEffect, useRef, useCallback } from "react";

// Theme colors
const COLORS = [
    { r: 255, g: 122, b: 24 },   // Orange #ff7a18
    { r: 255, g: 77, b: 109 },   // Pink #ff4d6d
    { r: 201, g: 24, b: 255 },   // Purple #c918ff
];

// Tuned for medium-pace, always-visible pipes across all screen sizes
const PIPE_SETTINGS = {
    gridSize: 68,
    areaPerPipe: 140000,
    maxPipes: 6,
    minPipes: 3,
    turnChance: 0.35,
    minSpeed: 0.6,
    speedVariance: 0.3,
    flowRate: 0.8,
};

// Pipe class for managing individual pipes
class Pipe {
    constructor(canvas, gridSize) {
        this.canvas = canvas;
        this.gridSize = gridSize;
        this.reset();
    }

    reset() {
        const gridCols = Math.floor(this.canvas.width / this.gridSize);
        const gridRows = Math.floor(this.canvas.height / this.gridSize);

        // Start anywhere on the grid instead of only from edges,
        // so pipes appear uniformly across tall mobile scrolling pages
        this.x = Math.floor(Math.random() * gridCols) * this.gridSize;
        this.y = Math.floor(Math.random() * gridRows) * this.gridSize;
        this.direction = Math.floor(Math.random() * 4); // 0: Up, 1: Right, 2: Down, 3: Left

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.segments = [{ x: this.x, y: this.y }];
        this.maxSegments = 30 + Math.floor(Math.random() * 25);
        this.speed = PIPE_SETTINGS.minSpeed + Math.random() * PIPE_SETTINGS.speedVariance;
        this.opacity = 0;
        this.fadeIn = true;
        this.fadeOut = false;
        this.flowOffset = 0;
        this.lineWidth = 2 + Math.random() * 2;
    }

    update() {
        // Fade in/out
        if (this.fadeIn) {
            this.opacity = Math.min(1, this.opacity + 0.04);
            if (this.opacity >= 1) this.fadeIn = false;
        }
        if (this.fadeOut) {
            this.opacity = Math.max(0, this.opacity - 0.04);
            if (this.opacity <= 0) {
                this.reset();
                return;
            }
        }

        // Move pipe
        const dx = [0, 1, 0, -1][this.direction] * this.speed;
        const dy = [-1, 0, 1, 0][this.direction] * this.speed;

        this.x += dx * this.gridSize * 0.035;
        this.y += dy * this.gridSize * 0.035;

        // Add segment at grid points
        const lastSeg = this.segments[this.segments.length - 1];
        const distX = Math.abs(this.x - lastSeg.x);
        const distY = Math.abs(this.y - lastSeg.y);

        if (distX >= this.gridSize || distY >= this.gridSize) {
            // Snap to grid
            this.x = Math.round(this.x / this.gridSize) * this.gridSize;
            this.y = Math.round(this.y / this.gridSize) * this.gridSize;

            this.segments.push({ x: this.x, y: this.y });

            // Slightly more frequent turns for livelier movement
            if (Math.random() < PIPE_SETTINGS.turnChance) {
                const turns = this.direction % 2 === 0 ? [1, 3] : [0, 2];
                this.direction = turns[Math.floor(Math.random() * 2)];
            }

            // Remove old segments
            if (this.segments.length > this.maxSegments) {
                this.segments.shift();
            }
        }

        // Check bounds
        if (this.x < -this.gridSize || this.x > this.canvas.width + this.gridSize ||
            this.y < -this.gridSize || this.y > this.canvas.height + this.gridSize) {
            this.fadeOut = true;
        }

        // Update flow animation
        this.flowOffset += PIPE_SETTINGS.flowRate;
    }

    draw(ctx, centerX, centerY) {
        if (this.segments.length < 2 || this.opacity <= 0) return;

        const { r, g, b } = this.color;

        // Draw pipe segments
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);

        for (let i = 1; i < this.segments.length; i++) {
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.lineTo(this.x, this.y);

        // Calculate opacity based on distance from center (fade in center)
        const avgX = this.segments.reduce((sum, s) => sum + s.x, 0) / this.segments.length;
        const avgY = this.segments.reduce((sum, s) => sum + s.y, 0) / this.segments.length;
        const distFromCenter = Math.sqrt(Math.pow(avgX - centerX, 2) + Math.pow(avgY - centerY, 2));
        const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const centerFade = Math.min(1, distFromCenter / (maxDist * 0.5));
        const finalOpacity = this.opacity * 0.25 * (0.4 + centerFade * 0.6);

        // Pipe glow
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${finalOpacity * 2.5})`;
        ctx.shadowBlur = 18;
        ctx.stroke();

        // Inner flow effect
        ctx.beginPath();
        const flowLength = 30;
        const totalLength = this.getTotalLength();
        const flowPos = (this.flowOffset % totalLength);

        this.drawFlowSegment(ctx, flowPos, flowLength, r, g, b, finalOpacity * 2.5);

        ctx.shadowBlur = 0;
    }

    getTotalLength() {
        let length = 0;
        for (let i = 1; i < this.segments.length; i++) {
            length += Math.abs(this.segments[i].x - this.segments[i - 1].x) +
                Math.abs(this.segments[i].y - this.segments[i - 1].y);
        }
        return length || 1;
    }

    drawFlowSegment(ctx, startPos, length, r, g, b, opacity) {
        let currentPos = 0;
        let drawStart = null;

        for (let i = 1; i < this.segments.length; i++) {
            const segLength = Math.abs(this.segments[i].x - this.segments[i - 1].x) +
                Math.abs(this.segments[i].y - this.segments[i - 1].y);

            if (currentPos + segLength >= startPos && drawStart === null) {
                const ratio = (startPos - currentPos) / segLength;
                drawStart = {
                    x: this.segments[i - 1].x + (this.segments[i].x - this.segments[i - 1].x) * ratio,
                    y: this.segments[i - 1].y + (this.segments[i].y - this.segments[i - 1].y) * ratio
                };
            }

            currentPos += segLength;

            if (currentPos >= startPos + length) break;
        }

        if (drawStart) {
            ctx.beginPath();
            ctx.arc(drawStart.x, drawStart.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.shadowBlur = 12;
            ctx.fill();
        }
    }
}

export default function PipesBackground() {
    const canvasRef = useRef(null);
    const pipesRef = useRef([]);
    const animationRef = useRef(null);

    const initPipes = useCallback((canvas) => {
        const isMobile = window.innerWidth < 768;
        const gridSize = isMobile ? 45 : PIPE_SETTINGS.gridSize;
        const areaPerPipe = isMobile ? 50000 : PIPE_SETTINGS.areaPerPipe;
        const maxPipes = isMobile ? 25 : PIPE_SETTINGS.maxPipes;
        const minPipes = isMobile ? 12 : PIPE_SETTINGS.minPipes;

        // More pipes for full page
        const pipeCount = Math.floor((canvas.width * canvas.height) / areaPerPipe);
        pipesRef.current = [];

        const actualCount = Math.max(minPipes, Math.min(pipeCount, maxPipes));
        for (let i = 0; i < actualCount; i++) {
            const pipe = new Pipe(canvas, gridSize);
            pipe.opacity = Math.random(); // Stagger initial opacity
            pipesRef.current.push(pipe);
        }
    }, []);

    const drawGrid = useCallback((ctx, width, height, centerX, centerY) => {
        const isMobile = window.innerWidth < 768;
        const gridSize = isMobile ? 45 : 70;
        const isLight = document.documentElement.classList.contains('theme-light');
        const baseColor = isLight ? '0, 0, 0' : '255, 255, 255';

        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= width; x += gridSize) {
            const distFromCenter = Math.abs(x - centerX);
            const opacity = isLight
                ? 0.025 + (distFromCenter / centerX) * 0.035
                : 0.015 + (distFromCenter / centerX) * 0.025;
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
            const distFromCenter = Math.abs(y - centerY);
            const opacity = isLight
                ? 0.025 + (distFromCenter / centerY) * 0.035
                : 0.015 + (distFromCenter / centerY) * 0.025;
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                // Use scrollHeight to capture the full content height, not just viewport
                canvas.height = Math.max(parent.offsetHeight, parent.scrollHeight, document.documentElement.scrollHeight);
                initPipes(canvas);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // Use ResizeObserver to detect content height changes (e.g., when all sections render)
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        // Start animation
        const render = () => {
            const ctx = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);
            drawGrid(ctx, width, height, centerX, centerY);

            pipesRef.current.forEach((pipe) => {
                pipe.update();
                pipe.draw(ctx, centerX, centerY);
            });

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initPipes, drawGrid]);

    return (
        <canvas
            ref={canvasRef}
            className="pipes-canvas absolute inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 1,
            }}
        />
    );
}
