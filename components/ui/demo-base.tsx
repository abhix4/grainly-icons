'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface PixelIconProps {
  svgString: string;
  size?: number;
  grid?: number;
}

export interface Dot {
  cx: number;
  cy: number;
}

export function DemoBaseIcon({
  svgString,
  size = 50,
  grid = 25,
}: PixelIconProps) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [hovered, setHovered] = useState(false);
  const [litDots, setLitDots] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function svgToDots(svgString: string, grid : number): Promise<Dot[]> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = grid;
      canvas.height = grid;
      const ctx = canvas.getContext('2d')!;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, grid, grid);
        const { data } = ctx.getImageData(0, 0, grid, grid);
        const step = 40 / grid;
        const dots: Dot[] = [];

        for (let row = 0; row < grid; row++) {
          for (let col = 0; col < grid; col++) {
            const i = (row * grid + col) * 4;
            if (data[i + 3] > 180) {
              dots.push({
                cx: (col + 0.5) * step,
                cy: (row + 0.5) * step,
              });
            }
          }
        }
        resolve(dots);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });
  }

  useEffect(() => {
    svgToDots(svgString, grid).then(setDots);
  }, [svgString, grid]);

  useEffect(() => {
    if (dots.length > 0) {
      intervalRef.current = setInterval(() => {
        const count = Math.floor(Math.random() * 1) + 30;
        const indices = new Set<number>();
        while (indices.size < count) {
          indices.add(Math.floor(Math.random() * dots.length));
        }
        setLitDots(indices);
      }, 300);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLitDots(new Set());
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered, dots]);

  const step = 40 / grid;
  const r = step * 0.1;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      preserveAspectRatio="xMidYMid meet"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ cursor: 'arrow' }}
    >
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={r}
          animate={{
            fill:  litDots.has(i)
                ? '#ffffff'
                : '#5FB0E8'
            
          }}
          transition={{
            fill: { duration: 0.08, ease: 'easeInOut' },
          }}
          style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
        />
      ))}
    </motion.svg>
  );
}