"use client";

/**
 * SideGrid - Reusable side panel grid component
 * 
 * Usage:
 * - Import and add <SideGrid /> to your layout
 * - To disable: simply comment out or remove the <SideGrid /> component
 * - Props:
 *   - enabled: boolean (default: true) - Toggle visibility
 *   - showOrbs: boolean (default: true) - Toggle glow orbs
 *   - showAnimatedLines: boolean (default: true) - Toggle animated lines
 */

export default function SideGrid({
    enabled = true,
    showOrbs = true,
    showAnimatedLines = true
}) {
    if (!enabled) return null;

    return (
        <>
            {/* Left Side Panel */}
            <div className="side-panel side-panel-left">
                <div className="side-grid-base"></div>
                {showAnimatedLines && (
                    <>
                        <div className="side-grid-lines-v"></div>
                        <div className="side-grid-lines-h"></div>
                    </>
                )}
                {showOrbs && (
                    <>
                        <div className="side-orb side-orb-1"></div>
                        <div className="side-orb side-orb-2"></div>
                    </>
                )}
            </div>

            {/* Right Side Panel */}
            <div className="side-panel side-panel-right">
                <div className="side-grid-base"></div>
                {showAnimatedLines && (
                    <>
                        <div className="side-grid-lines-v"></div>
                        <div className="side-grid-lines-h"></div>
                    </>
                )}
                {showOrbs && (
                    <>
                        <div className="side-orb side-orb-3"></div>
                        <div className="side-orb side-orb-4"></div>
                    </>
                )}
            </div>
        </>
    );
}
