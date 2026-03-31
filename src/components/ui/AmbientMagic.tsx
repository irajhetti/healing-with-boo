const orbs = [
  { left: "8%", top: "15%", size: 100, color: "#6b21a8", drift: "ambient-orb-1", delay: "0s" },
  { left: "75%", top: "25%", size: 80, color: "#166534", drift: "ambient-orb-2", delay: "4s" },
  { left: "45%", top: "60%", size: 120, color: "#7c3aed", drift: "ambient-orb-3", delay: "8s" },
  { left: "20%", top: "75%", size: 70, color: "#15803d", drift: "ambient-orb-1", delay: "12s" },
  { left: "85%", top: "70%", size: 90, color: "#6b21a8", drift: "ambient-orb-2", delay: "6s" },
  { left: "55%", top: "10%", size: 60, color: "#166534", drift: "ambient-orb-3", delay: "2s" },
];

const constellations = [
  { left: "5%", top: "8%", size: 2, delay: "0s" },
  { left: "18%", top: "42%", size: 1.5, delay: "1.2s" },
  { left: "32%", top: "12%", size: 2, delay: "2.8s" },
  { left: "48%", top: "35%", size: 1, delay: "0.5s" },
  { left: "62%", top: "8%", size: 2, delay: "3.5s" },
  { left: "78%", top: "48%", size: 1.5, delay: "1.8s" },
  { left: "92%", top: "22%", size: 2, delay: "4.2s" },
  { left: "12%", top: "88%", size: 1, delay: "2.2s" },
  { left: "38%", top: "72%", size: 2, delay: "0.8s" },
  { left: "65%", top: "85%", size: 1.5, delay: "3.0s" },
  { left: "88%", top: "92%", size: 1, delay: "1.5s" },
  { left: "25%", top: "55%", size: 2, delay: "4.0s" },
  { left: "72%", top: "62%", size: 1.5, delay: "2.5s" },
  { left: "50%", top: "92%", size: 1, delay: "3.8s" },
];

export function AmbientMagic() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`ambient-orb ${orb.drift} absolute rounded-full`}
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity: 0.07,
            filter: "blur(40px)",
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Constellation dots */}
      {constellations.map((dot, i) => (
        <span
          key={`star-${i}`}
          className="constellation-dot absolute rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            backgroundColor: i % 2 === 0 ? "#7c3aed" : "#15803d",
            boxShadow: `0 0 4px 1px ${i % 2 === 0 ? "#7c3aed" : "#15803d"}60`,
            animationDelay: dot.delay,
          }}
        />
      ))}

      {/* Ground mist */}
      <div
        className="ambient-mist absolute bottom-0 left-0 right-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #6b21a810 0%, #16653408 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
