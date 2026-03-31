"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "rise" | "shimmer" | "glow";
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "rise",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.setAttribute("data-revealed", "true"), delay);
          } else {
            el.setAttribute("data-revealed", "true");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ position: "relative", overflow: "hidden", transitionDelay: `${delay}ms` }}
    >
      {children}
      {animation === "shimmer" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 38%, #7c3aed25 46%, #4ade8018 54%, transparent 62%)",
          }}
          data-shimmer=""
        />
      )}
      {animation === "glow" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 rounded-xl"
          style={{
            boxShadow: "inset 0 0 30px 5px #7c3aed20, inset 0 0 60px 10px #15803d15",
          }}
          data-glow=""
        />
      )}

      <style>{`
        .scroll-reveal[data-revealed="true"] [data-shimmer] {
          opacity: 1;
          animation: shimmer-sweep 1.2s ease-out 0.3s forwards;
        }
        .scroll-reveal[data-revealed="true"] [data-glow] {
          opacity: 1;
          transition: opacity 1s ease-out 0.2s;
        }
      `}</style>
    </div>
  );
}
