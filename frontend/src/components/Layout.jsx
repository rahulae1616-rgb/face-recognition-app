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

      {/* Developed By RAHUL - Cursive Drawing Animation */}
      <AnimatePresence>
        {showCredit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: 'blur(30px) brightness(1.5)',
              transition: { duration: 1.2, ease: 'easeInOut' } 
            }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(7, 10, 19, 0.4)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            <motion.div
              style={{
                position: 'relative',
                textAlign: 'center'
              }}
            >
              <svg viewBox="0 0 1000 200" style={{ width: '90vw', maxWidth: '800px' }}>
                <defs>
                  <linearGradient id="cursiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c5cff" />
                    <stop offset="100%" stopColor="#3ad1ff" />
                  </linearGradient>
                </defs>
                
                {/* Single Consolidated Text Element */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '92px',
                    fontWeight: 400,
                    fontFamily: '"Pacifico", cursive',
                    // Ultimate Neon Glow: Multi-layer bloom
                    filter: `
                      drop-shadow(0 0 10px rgba(124, 92, 255, 0.8)) 
                      drop-shadow(0 0 20px rgba(124, 92, 255, 0.4)) 
                      drop-shadow(0 0 40px rgba(58, 209, 255, 0.3))
                    `,
                  }}
                  initial={{ 
                    stroke: 'url(#cursiveGradient)',
                    strokeWidth: '2px',
                    strokeDasharray: 2000, 
                    strokeDashoffset: 2000,
                    fill: 'rgba(124, 92, 255, 0)'
                  }}
                  animate={{ 
                    strokeDashoffset: 0,
                    fill: 'url(#cursiveGradient)',
                    strokeWidth: ['2px', '0px'],
                  }}
                  transition={{ 
                    strokeDashoffset: { duration: 3, ease: 'easeInOut' },
                    fill: { delay: 2.5, duration: 1 },
                    strokeWidth: { delay: 3, duration: 0.5 }
                  }}
                >
                  Developed By RAHUL
                </motion.text>

                {/* Pulsing Outer Glow Layer for extra depth */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '92px',
                    fontWeight: 400,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'url(#cursiveGradient)',
                    filter: 'blur(15px) opacity(0.4)',
                    zIndex: -1
                  }}
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ 
                    delay: 3,
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Developed By RAHUL
                </motion.text>
              </svg>

              {/* Advanced Neon Underline */}
              <motion.div
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, var(--accent2), var(--accent), transparent)',
                  margin: '0 auto',
                  width: '0%',
                  marginTop: '-30px',
                  boxShadow: '0 0 20px var(--accent2), 0 0 40px var(--accent)',
                }}
                animate={{ 
                  width: '60%',
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  width: { delay: 1, duration: 2.5 },
                  opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
