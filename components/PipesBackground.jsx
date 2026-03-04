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

const BASE_FRAME_TIME = 1000 / 60;
const LOW_POWER_FRAME_TIME = 1000 / 36;

// Pipe class for managing individual pipes
class Pipe {
    constructor(canvas, gridSize) {
        this.canvas = canvas;
        this.gridSize = gridSize;
        this.reset();
    }

    reset() {
        // Start from edge
        const side = Math.floor(Math.random() * 4);
        const gridCols = Math.floor(this.canvas.width / this.gridSize);
        const gridRows = Math.floor(this.canvas.height / this.gridSize);

        switch (side) {
            case 0: // Top
                this.x = Math.floor(Math.random() * gridCols) * this.gridSize;
                this.y = 0;
                this.direction = 2; // Down
                break;
            case 1: // Right
                this.x = this.canvas.width;
                this.y = Math.floor(Math.random() * gridRows) * this.gridSize;
                this.direction = 3; // Left
                break;
            case 2: // Bottom
                this.x = Math.floor(Math.random() * gridCols) * this.gridSize;
                this.y = this.canvas.height;
                this.direction = 0; // Up
                break;
            case 3: // Left
                this.x = 0;
                this.y = Math.floor(Math.random() * gridRows) * this.gridSize;
                this.direction = 1; // Right
                break;
        }

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.segments = [{ x: this.x, y: this.y }];
        this.segmentSumX = this.x;
        this.segmentSumY = this.y;
        this.totalLength = 1;
        this.maxSegments = 30 + Math.floor(Math.random() * 25);
        this.speed = PIPE_SETTINGS.minSpeed + Math.random() * PIPE_SETTINGS.speedVariance;
        this.opacity = 0;
        this.fadeIn = true;
        this.fadeOut = false;
        this.flowOffset = 0;
        this.lineWidth = 2 + Math.random() * 2;
    }

    addSegment(x, y) {
        const prev = this.segments[this.segments.length - 1];
        this.totalLength += Math.abs(x - prev.x) + Math.abs(y - prev.y);
        this.segments.push({ x, y });
        this.segmentSumX += x;
        this.segmentSumY += y;
    }

    trimSegments() {
        while (this.segments.length > this.maxSegments) {
            if (this.segments.length <= 1) break;
            const oldest = this.segments[0];
            const next = this.segments[1];
            this.totalLength = Math.max(
                1,
                this.totalLength - (Math.abs(next.x - oldest.x) + Math.abs(next.y - oldest.y))
            );
            this.segmentSumX -= oldest.x;
            this.segmentSumY -= oldest.y;
            this.segments.shift();
        }
    }

    update(dtScale = 1) {
        // Fade in/out
        if (this.fadeIn) {
            this.opacity = Math.min(1, this.opacity + 0.04 * dtScale);
            if (this.opacity >= 1) this.fadeIn = false;
        }
        if (this.fadeOut) {
            this.opacity = Math.max(0, this.opacity - 0.04 * dtScale);
            if (this.opacity <= 0) {
                this.reset();
                return;
            }
        }

        // Move pipe
        const dx = [0, 1, 0, -1][this.direction] * this.speed;
        const dy = [-1, 0, 1, 0][this.direction] * this.speed;

        this.x += dx * this.gridSize * 0.035 * dtScale;
        this.y += dy * this.gridSize * 0.035 * dtScale;

        // Add segment at grid points
        const lastSeg = this.segments[this.segments.length - 1];
        const distX = Math.abs(this.x - lastSeg.x);
        const distY = Math.abs(this.y - lastSeg.y);

        if (distX >= this.gridSize || distY >= this.gridSize) {
            // Snap to grid
            this.x = Math.round(this.x / this.gridSize) * this.gridSize;
            this.y = Math.round(this.y / this.gridSize) * this.gridSize;

            this.addSegment(this.x, this.y);

            // Slightly more frequent turns for livelier movement
            if (Math.random() < PIPE_SETTINGS.turnChance) {
                const turns = this.direction % 2 === 0 ? [1, 3] : [0, 2];
                this.direction = turns[Math.floor(Math.random() * 2)];
            }

            this.trimSegments();
        }

        // Check bounds
        if (this.x < -this.gridSize || this.x > this.canvas.width + this.gridSize ||
            this.y < -this.gridSize || this.y > this.canvas.height + this.gridSize) {
            this.fadeOut = true;
        }

        // Update flow animation
        this.flowOffset += PIPE_SETTINGS.flowRate * dtScale;
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
        const avgX = this.segmentSumX / this.segments.length;
        const avgY = this.segmentSumY / this.segments.length;
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
        return this.totalLength || 1;
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
    const ctxRef = useRef(null);
    const pipesRef = useRef([]);
    const animationRef = useRef(null);
    const resizeRafRef = useRef(null);
    const frameStateRef = useRef({
        lastTs: 0,
        frameBudget: BASE_FRAME_TIME,
    });
    const isLightThemeRef = useRef(false);

    const initPipes = useCallback((canvas) => {
        const gridSize = PIPE_SETTINGS.gridSize;
        // More pipes for full page
        const pipeCount = Math.floor((canvas.width * canvas.height) / PIPE_SETTINGS.areaPerPipe);
        pipesRef.current = [];

        const actualCount = Math.max(PIPE_SETTINGS.minPipes, Math.min(pipeCount, PIPE_SETTINGS.maxPipes));
        for (let i = 0; i < actualCount; i++) {
            const pipe = new Pipe(canvas, gridSize);
            pipe.opacity = Math.random(); // Stagger initial opacity
            pipesRef.current.push(pipe);
        }
    }, []);

    const drawGridSlice = useCallback((ctx, width, startY, endY, centerX, centerY, isLight) => {
        const gridSize = 70;
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
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();
        }

        // Horizontal lines
        const firstY = Math.max(0, Math.floor(startY / gridSize) * gridSize);
        for (let y = firstY; y <= endY; y += gridSize) {
            const distFromCenter = Math.abs(y - centerY);
            const opacity = isLight
                ? 0.025 + (distFromCenter / centerY) * 0.035
                : 0.015 + (distFromCenter / centerY) * 0.025;
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(0, Math.round(y) + 0.5);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }, []);

    const getVisibleSlice = useCallback((canvas) => {
        const rect = canvas.getBoundingClientRect();

        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
            return null;
        }

        const startY = Math.max(0, -rect.top);
        const endY = Math.min(canvas.height, startY + window.innerHeight);

        return {
            startY,
            endY,
            height: Math.max(0, endY - startY),
        };
    }, []);

    const updateFrameBudget = useCallback(() => {
        if (typeof window === "undefined") return;
        const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
        const deviceMemory = navigator.deviceMemory ?? 8;
        const cpuCores = navigator.hardwareConcurrency ?? 8;
        const isLowPower = isMobileViewport && (deviceMemory <= 4 || cpuCores <= 4);

        frameStateRef.current.frameBudget = isLowPower ? LOW_POWER_FRAME_TIME : BASE_FRAME_TIME;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
        if (!ctx) return;
        ctxRef.current = ctx;

        const applyCanvasSize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const nextWidth = Math.max(1, Math.floor(parent.offsetWidth));
                // Use scrollHeight to capture the full content height, not just viewport
                const nextHeight = Math.max(
                    1,
                    Math.floor(Math.max(parent.offsetHeight, parent.scrollHeight, document.documentElement.scrollHeight))
                );

                if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
                    canvas.width = nextWidth;
                    canvas.height = nextHeight;
                    initPipes(canvas);
                    frameStateRef.current.lastTs = 0;
                }
            }
            updateFrameBudget();
        };

        const scheduleResize = () => {
            if (resizeRafRef.current) return;
            resizeRafRef.current = requestAnimationFrame(() => {
                resizeRafRef.current = null;
                applyCanvasSize();
            });
        };

        isLightThemeRef.current = document.documentElement.classList.contains("theme-light");

        applyCanvasSize();
        window.addEventListener("resize", scheduleResize, { passive: true });

        const themeObserver = new MutationObserver(() => {
            isLightThemeRef.current = document.documentElement.classList.contains("theme-light");
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme"],
        });

        // Use ResizeObserver to detect content height changes (e.g., when all sections render)
        const resizeObserver = new ResizeObserver(() => {
            scheduleResize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        // Start animation
        const render = (timestamp) => {
            const currentCtx = ctxRef.current;
            if (!currentCtx) return;

            const frameState = frameStateRef.current;

            if (!frameState.lastTs) {
                frameState.lastTs = timestamp;
            }

            const elapsed = timestamp - frameState.lastTs;
            if (elapsed < frameState.frameBudget) {
                animationRef.current = requestAnimationFrame(render);
                return;
            }

            frameState.lastTs = timestamp;
            const dtScale = Math.min(2, elapsed / BASE_FRAME_TIME);

            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const visibleSlice = getVisibleSlice(canvas);

            const pipes = pipesRef.current;
            for (let i = 0; i < pipes.length; i++) {
                pipes[i].update(dtScale);
            }

            if (visibleSlice && visibleSlice.height > 0) {
                const { startY, endY, height: visibleHeight } = visibleSlice;

                currentCtx.save();
                currentCtx.beginPath();
                currentCtx.rect(0, startY, width, visibleHeight);
                currentCtx.clip();

                currentCtx.clearRect(0, startY, width, visibleHeight);
                drawGridSlice(currentCtx, width, startY, endY, centerX, centerY, isLightThemeRef.current);

                for (let i = 0; i < pipes.length; i++) {
                    pipes[i].draw(currentCtx, centerX, centerY);
                }

                currentCtx.restore();
            }

            animationRef.current = requestAnimationFrame(render);
        };

        animationRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", scheduleResize);
            resizeObserver.disconnect();
            themeObserver.disconnect();
            if (resizeRafRef.current) {
                cancelAnimationFrame(resizeRafRef.current);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [drawGridSlice, getVisibleSlice, initPipes, updateFrameBudget]);

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
