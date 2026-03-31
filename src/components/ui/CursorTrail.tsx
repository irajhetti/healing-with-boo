"use client";

import { useEffect, useRef, useState } from "react";

const POOL_SIZE = 20;
const COLORS = ["#7c3aed", "#6b21a8", "#15803d", "#166534"];

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinPointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !isFinPointer) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const container = containerRef.current;
        if (!container) return;

        const sparkle = container.children[
          indexRef.current % POOL_SIZE
        ] as HTMLElement;
        if (!sparkle) return;

        const color = COLORS[indexRef.current % COLORS.length];
        const size = 3 + Math.random() * 4;

        sparkle.style.left = `${lastPos.current.x}px`;
        sparkle.style.top = `${lastPos.current.y}px`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.backgroundColor = color;
        sparkle.style.boxShadow = `0 0 6px 2px ${color}80`;

        // Reset animation
        sparkle.classList.remove("cursor-sparkle");
        void sparkle.offsetWidth;
        sparkle.classList.add("cursor-sparkle");

        indexRef.current++;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{ width: 0, height: 0, opacity: 0 }}
        />
      ))}
    </div>
  );
}
