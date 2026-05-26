import { useEffect, useRef, useState } from "react";

const TRAIL = 14;
const SIGIL_GLYPHS = ["ᚦ", "ᚱ", "ᚷ", "ᚠ", "ॐ", "𓂀", "𒀭", "Δ", "Ψ", "龍"];

export function MagicCursor() {
  const [hovering, setHovering] = useState(false);
  const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef(Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 })));
  const raf = useRef<number | undefined>(undefined);
  const pulseId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Touch devices: skip
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("magic-cursor-on");

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest("a,button,[role='button'],input,select,textarea,label,summary");
      setHovering(interactive);
    };

    const onDown = (e: MouseEvent) => {
      const id = ++pulseId.current;
      setPulses((p) => [...p, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setPulses((p) => p.filter((x) => x.id !== id)), 700);
    };

    const tick = () => {
      // Lerp trail
      let prevX = pos.current.x;
      let prevY = pos.current.y;
      for (let i = 0; i < TRAIL; i++) {
        const t = trail.current[i];
        t.x += (prevX - t.x) * 0.35;
        t.y += (prevY - t.y) * 0.35;
        const node = trailRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
        }
        prevX = t.x;
        prevY = t.y;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("magic-cursor-on");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {/* Trail */}
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="mc-trail"
          style={{
            opacity: (1 - i / TRAIL) * 0.55,
            width: 6 + (TRAIL - i) * 0.4,
            height: 6 + (TRAIL - i) * 0.4,
          }}
        />
      ))}

      {/* Main cursor */}
      <div ref={cursorRef} className={`mc-core ${hovering ? "mc-core--hover" : ""}`}>
        {!hovering && <span className="mc-rune">ᚦ</span>}
        {hovering && (
          <span className="mc-sigil">
            {SIGIL_GLYPHS.map((g, i) => (
              <span
                key={i}
                className="mc-sigil-glyph"
                style={{
                  transform: `rotate(${(i * 360) / SIGIL_GLYPHS.length}deg) translateY(-22px)`,
                }}
              >{g}</span>
            ))}
          </span>
        )}
      </div>

      {/* Click pulses */}
      {pulses.map((p) => (
        <div
          key={p.id}
          className="mc-pulse"
          style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}
        />
      ))}
    </div>
  );
}
