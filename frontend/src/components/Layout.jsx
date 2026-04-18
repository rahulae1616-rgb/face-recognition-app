import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const [showCredit, setShowCredit] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCredit(false);
    }, 4500); // 3s drawing + 1s stay + 0.5s transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(16px, 4vw, 40px)', position: 'relative', overflowX: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1040, margin: '0 auto' }}
      >
        {children}
      </motion.div>

      {/* Developed By RAHUL - Drawing Animation */}
      <AnimatePresence>
        {showCredit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.2, 
              filter: 'blur(15px) brightness(2)',
              transition: { duration: 1, ease: 'easeInOut' } 
            }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '0',
              right: '0',
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 1000,
            }}
          >
            <svg viewBox="0 0 800 100" style={{ width: '80%', maxWidth: '600px' }}>
              <defs>
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent2)" />
                </linearGradient>
              </defs>
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '0.15em',
                  fill: 'transparent',
                  stroke: 'url(#textGradient)',
                  strokeWidth: '1px',
                }}
                initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                animate={{ 
                  strokeDashoffset: 0,
                  fill: ['rgba(124, 92, 255, 0)', 'rgba(124, 92, 255, 1)'],
                }}
                transition={{ 
                  strokeDashoffset: { duration: 3, ease: 'easeInOut' },
                  fill: { delay: 2.5, duration: 1 }
                }}
              >
                Developed By RAHUL
              </motion.text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
