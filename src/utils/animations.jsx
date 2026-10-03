import { motion } from 'framer-motion';

// ─── Shared viewport config for all scroll-triggered animations ───
// once: false → animations replay every time element enters/exits viewport
const viewport = { once: false, amount: 0.1, margin: '-20px' };

// ─── Exit transition (shared by all variants for smooth reverse) ───
const exitTransition = { duration: 0.4, ease: 'easeIn' };

// ─── Animation Variants ───

/** Profile: Slide in from left (portrait) and right (biodata) */
export const slideInLeft = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)', transition: exitTransition },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60, filter: 'blur(4px)', transition: exitTransition },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/** Experience: Vertical reveal with stagger */
export const fadeUp = {
  hidden: { opacity: 0, y: 40, transition: exitTransition },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Projects: Scale + rotate micro-tilt entrance */
export const scaleTilt = {
  hidden: { opacity: 0, scale: 0.92, rotateX: 4, transition: exitTransition },
  visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } },
};

/** Skills/Tags: Pop-in with elastic bounce */
export const popIn = {
  hidden: { opacity: 0, scale: 0.8, y: 20, transition: exitTransition },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

/** Contact: Soft scale fade */
export const softScale = {
  hidden: { opacity: 0, scale: 0.96, y: 15, transition: exitTransition },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/** Section header: Slide from left */
export const clipFromLeft = {
  hidden: { opacity: 0, x: -40, transition: exitTransition },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/** Stagger container */
export const staggerContainer = (staggerDelay = 0.12) => ({
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } },
});

// ─── Reusable Wrapper Components ───

/** Animated section header (number + title) */
export function AnimatedHeader({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={clipFromLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

/** Generic animated wrapper with configurable variant */
export function AnimatedElement({ children, variants, className = '', delay = 0, style }) {
  const variantsWithDelay = delay > 0
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: { ...variants.visible.transition, delay },
        },
      }
    : variants;

  return (
    <motion.div
      className={className}
      style={style}
      variants={variantsWithDelay}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

/** Stagger parent — children animate one-by-one */
export function StaggerParent({ children, className = '', staggerDelay = 0.12 }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}
