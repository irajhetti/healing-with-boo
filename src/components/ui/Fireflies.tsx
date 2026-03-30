const fireflies = [
  { left: "10%", top: "20%", size: 4, color: "#7c3aed", delay: "0s" },
  { left: "25%", top: "65%", size: 3, color: "#166534", delay: "2.5s" },
  { left: "40%", top: "15%", size: 5, color: "#6b21a8", delay: "1.2s" },
  { left: "55%", top: "75%", size: 3, color: "#15803d", delay: "3.8s" },
  { left: "70%", top: "30%", size: 4, color: "#7c3aed", delay: "0.8s" },
  { left: "85%", top: "55%", size: 5, color: "#166534", delay: "2.0s" },
  { left: "15%", top: "80%", size: 3, color: "#6b21a8", delay: "4.5s" },
  { left: "60%", top: "40%", size: 4, color: "#15803d", delay: "1.5s" },
  { left: "90%", top: "15%", size: 3, color: "#7c3aed", delay: "3.2s" },
  { left: "35%", top: "85%", size: 5, color: "#166534", delay: "0.5s" },
];

export function Fireflies() {
  return (
    <div
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {fireflies.map((f, i) => (
        <span
          key={i}
          className="firefly absolute rounded-full"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            backgroundColor: f.color,
            boxShadow: `0 0 6px 2px ${f.color}80`,
            animationDelay: f.delay,
          }}
        />
      ))}
    </div>
  );
}
