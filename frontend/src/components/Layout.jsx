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
                
                {/* Single Consolidated Text Element - No Borders */}
                <motion.div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: '100px',
                      fontWeight: 800,
                      fontFamily: '"Pacifico", cursive',
                      fill: 'url(#cursiveGradient)',
                      // Ultimate Neon Glow
                      filter: `
                        drop-shadow(0 0 15px rgba(124, 92, 255, 0.9)) 
                        drop-shadow(0 0 30px rgba(58, 209, 255, 0.5))
                      `,
                    }}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ 
                      duration: 3, 
                      ease: [0.45, 0, 0.55, 1] 
                    }}
                  >
                    Developed By RAHUL
                  </motion.text>
                </motion.div>
              </svg>

              {/* Pulsing Outer Glow Layer */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: -1
                }}
              >
                <motion.span
                  style={{
                    fontSize: '100px',
                    fontWeight: 800,
                    fontFamily: '"Pacifico", cursive',
                    background: 'url(#cursiveGradient)', // This won't work on span, using color
                    color: 'var(--accent)',
                    filter: 'blur(25px)',
                  }}
                  animate={{ 
                    opacity: [0.1, 0.4, 0.1],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Developed By RAHUL
                </motion.span>
              </motion.div>

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
