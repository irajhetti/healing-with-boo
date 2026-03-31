export function MysticalDivider() {
  return (
    <div className="flex items-center justify-center py-6" aria-hidden="true">
      <svg
        width="320"
        height="32"
        viewBox="0 0 320 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        {/* Vine line */}
        <path
          d="M 10 16 Q 60 8 100 16 T 160 16 T 220 16 T 310 16"
          stroke="#166534"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Star accents along vine */}
        {[
          { cx: 40, delay: "0s" },
          { cx: 80, delay: "1.5s" },
          { cx: 240, delay: "0.8s" },
          { cx: 280, delay: "2.2s" },
        ].map((star) => (
          <circle
            key={star.cx}
            cx={star.cx}
            cy={16 + (star.cx % 3 === 0 ? -2 : 2)}
            r="1.2"
            fill="#7c3aed"
            className="mystical-star"
            style={{ animationDelay: star.delay }}
          />
        ))}

        {/* Moon 1 - New moon (dark) */}
        <circle cx="110" cy="16" r="5" fill="#1a1c19" fillOpacity="0.3" stroke="#6b21a8" strokeWidth="0.6" strokeOpacity="0.4" />

        {/* Moon 2 - Waxing crescent */}
        <g>
          <circle cx="130" cy="16" r="5.5" fill="#6b21a8" fillOpacity="0.2" stroke="#6b21a8" strokeWidth="0.6" strokeOpacity="0.5" />
          <clipPath id="waxing-clip">
            <rect x="130" y="10" width="6" height="12" />
          </clipPath>
          <circle cx="130" cy="16" r="5.5" fill="#7c3aed" fillOpacity="0.5" clipPath="url(#waxing-clip)" />
        </g>

        {/* Moon 3 - Full moon (center, glowing) */}
        <circle
          cx="160"
          cy="16"
          r="7"
          fill="#7c3aed"
          fillOpacity="0.25"
          stroke="#7c3aed"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          className="mystical-moon-glow"
        />
        <circle cx="160" cy="16" r="4" fill="#7c3aed" fillOpacity="0.15" />

        {/* Moon 4 - Waning crescent */}
        <g>
          <circle cx="190" cy="16" r="5.5" fill="#6b21a8" fillOpacity="0.2" stroke="#6b21a8" strokeWidth="0.6" strokeOpacity="0.5" />
          <clipPath id="waning-clip">
            <rect x="184" y="10" width="6" height="12" />
          </clipPath>
          <circle cx="190" cy="16" r="5.5" fill="#7c3aed" fillOpacity="0.5" clipPath="url(#waning-clip)" />
        </g>

        {/* Moon 5 - New moon (dark) */}
        <circle cx="210" cy="16" r="5" fill="#1a1c19" fillOpacity="0.3" stroke="#6b21a8" strokeWidth="0.6" strokeOpacity="0.4" />

        {/* Extra star accents near moons */}
        <circle cx="120" cy="10" r="0.8" fill="#15803d" className="mystical-star" style={{ animationDelay: "1s" }} />
        <circle cx="200" cy="22" r="0.8" fill="#15803d" className="mystical-star" style={{ animationDelay: "2.5s" }} />
        <circle cx="155" cy="8" r="1" fill="#7c3aed" className="mystical-star" style={{ animationDelay: "0.3s" }} />
        <circle cx="165" cy="25" r="0.8" fill="#15803d" className="mystical-star" style={{ animationDelay: "1.8s" }} />
      </svg>
    </div>
  );
}
