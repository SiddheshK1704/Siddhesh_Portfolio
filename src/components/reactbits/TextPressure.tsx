"use client";

import React, { useEffect, useRef, useMemo } from 'react';

export interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  textColor?: string;
  accentText?: string;
  accentColor?: string;
  className?: string;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'I like good conversations.',
  fontFamily = 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
  fontUrl,
  width = false,
  weight = true,
  italic = false,
  alpha = false,
  textColor = 'currentColor',
  accentText = 'good conversations.',
  accentColor = 'var(--color-accent, #3355ff)',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<Map<number, HTMLSpanElement>>(new Map());

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  // Split text into words and characters to preserve natural typography & word wrapping
  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        cursorRef.current.x = e.touches[0].clientX;
        cursorRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.12;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = Math.max(titleRect.width * 0.45, 240);

        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          // Variable font attributes tuned for clean readability
          const wght = weight ? Math.round(getAttr(d, maxDist, 400, 850)) : 600;
          const wdth = width ? Math.round(getAttr(d, maxDist, 85, 125)) : 100;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : '0';
          const alphaVal = alpha ? getAttr(d, maxDist, 0.4, 1).toFixed(2) : '1';

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (alpha) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, [weight, width, italic, alpha]);

  let globalCharIndex = 0;

  return (
    <div ref={containerRef} className="relative w-full overflow-visible bg-transparent">
      {fontUrl && (
        <style>{`
          @import url('${fontUrl}');
        `}</style>
      )}

      {/* Accessible static fallback for screen readers */}
      <h3 className="sr-only">{text}</h3>

      <h3
        ref={titleRef}
        aria-hidden="true"
        className={`select-none transition-opacity duration-300 ${className}`}
        style={{
          fontFamily,
          margin: 0,
          color: textColor,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35em',
          lineHeight: 1.05
        }}
      >
        {words.map((word, wordIdx) => {
          const isAccentWord = accentText && text.includes(accentText) && accentText.includes(word);
          const chars = word.split('');

          return (
            <span
              key={wordIdx}
              className="inline-flex whitespace-nowrap"
              style={{ color: isAccentWord ? accentColor : undefined }}
            >
              {chars.map((char) => {
                const idx = globalCharIndex++;
                return (
                  <span
                    key={idx}
                    ref={(el) => {
                      if (el) spansRef.current.set(idx, el);
                      else spansRef.current.delete(idx);
                    }}
                    data-char={char}
                    className="inline-block transition-transform duration-75"
                    style={{
                      fontVariationSettings: "'wght' 600",
                      transform: 'translateZ(0)'
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h3>
    </div>
  );
};

export default TextPressure;
