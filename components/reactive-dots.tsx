"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Dot = {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
};

const totalDots = 240;

function seededValue(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function ReactiveDots() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const dots = useMemo<Dot[]>(
    () =>
      Array.from({ length: totalDots }).map((_, index) => {
        const x = 6 + seededValue(index + 1) * 88;
        const y = 6 + seededValue(index + 101) * 88;

        return {
          id: index,
          x,
          y,
          size: 2 + Math.floor(seededValue(index + 201) * 3),
          baseOpacity: 0.3 + seededValue(index + 301) * 0.22,
        };
      }),
    [],
  );

  useEffect(() => {
    let frame = 0;
    const onMouseMove = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setCursor({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {dots.map((dot) => {
        const dx = dot.x - cursor.x;
        const dy = dot.y - cursor.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 26);
        const activeOpacity = Math.min(0.98, dot.baseOpacity + influence * 0.68);

        return (
          <motion.span
            key={dot.id}
            className="reactive-dot absolute rounded-full"
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              opacity: activeOpacity,
              scale: 1 + influence * 0.75,
            }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
