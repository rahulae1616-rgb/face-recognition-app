import { motion, useScroll, useTransform } from 'framer-motion';

export default function Layout({ children }) {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress into various "liquid" properties
  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0.7, 1], [0, 20]);
  const turbulenceScale = useTransform(scrollYProgress, [0.5, 1], [0, 60]);

  return (
    <div style={{ minHeight: '120vh', padding: 'clamp(16px, 4vw, 40px)', paddingBottom: '100px' }}>
      {/* SVG Filter for Liquid Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.08"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1040, margin: '0 auto' }}
      >
        {children}
      </motion.div>

      {/* Developed By RAHUL - Liquid Dissolve Animation */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '40px',
          whiteSpace: 'nowrap',
          opacity,
          x: xTranslate,
          pointerEvents: 'none',
          zIndex: 100,
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '14px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          fontFamily: 'Outfit, sans-serif',
          // Applying the liquid filter and blur
          filter: `blur(${blur.get()}px) url(#liquid-filter)`,
        }}
        // Using motion to tie the scale of displacement to scroll
        animate={{
          filter: [
            `blur(0px) url(#liquid-filter)`,
            `blur(${blur.get()}px) url(#liquid-filter)`
          ]
        }}
      >
        Developed By RAHUL
      </motion.div>
    </div>
  );
}
