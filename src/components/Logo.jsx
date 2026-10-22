import React, { useId } from 'react';
import { motion } from 'framer-motion';

// ──────────────────────────────────────────────────────────────
// LOGO PROVISIONAL. Cuando tengas el tuyo, sustituye los <motion.path>
// de abajo por los paths de tu SVG (solo trazos, sin relleno).
// ──────────────────────────────────────────────────────────────
const FRAME =
  'M30 8 H70 A22 22 0 0 1 92 30 V70 A22 22 0 0 1 70 92 H30 A22 22 0 0 1 8 70 V30 A22 22 0 0 1 30 8 Z';
const LEFT = 'M41 36 L26 50 L41 64';
const RIGHT = 'M59 36 L74 50 L59 64';
const SLASH = 'M55 33 L45 67';

export const LogoMark = ({ size = 96, animated = true, delay = 0, className = '' }) => {
  const gradId = `logo-grad-${useId().replace(/:/g, '')}`;

  const draw = (i) =>
    animated
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration: 1.1, delay: delay + i * 0.25, ease: 'easeInOut' },
            opacity: { duration: 0.01, delay: delay + i * 0.25 },
          },
        }
      : {};

  const common = {
    fill: 'none',
    stroke: `url(#${gradId})`,
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Logo"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--color-primary-400)' }} />
          <stop offset="55%" style={{ stopColor: 'var(--color-accent-purple)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-accent-cyan)' }} />
        </linearGradient>
      </defs>

      <motion.path d={FRAME} {...common} {...draw(0)} />
      <motion.path d={LEFT} {...common} {...draw(1)} />
      <motion.path d={RIGHT} {...common} {...draw(2)} />
      <motion.path d={SLASH} {...common} {...draw(3)} />
    </svg>
  );
};