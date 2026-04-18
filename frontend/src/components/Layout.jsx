import { motion, useScroll, useTransform } from 'framer-motion';

export default function Layout({ children }) {
  const { scrollYProgress } = useScroll();
  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 1]);

  return (
    <div style={{ minHeight: '110vh', padding: 'clamp(16px, 4vw, 40px)', paddingBottom: '80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1040, margin: '0 auto' }}
      >
        {children}
      </motion.div>

      {/* Developed By RAHUL - Scroll Animation */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '-40px',
          whiteSpace: 'nowrap',
          opacity,
          x: xTranslate,
          pointerEvents: 'none',
          zIndex: 100,
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          filter: 'drop-shadow(0 0 10px rgba(124, 92, 255, 0.4))',
          padding: '8px 40px',
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        Developed By RAHUL • Developed By RAHUL • Developed By RAHUL
      </motion.div>
    </div>
  );
}
