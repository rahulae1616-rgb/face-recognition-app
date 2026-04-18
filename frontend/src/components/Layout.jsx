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
              backgroundColor: 'rgba(7, 10, 19, 0.75)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            <div style={{ position: 'relative', textAlign: 'center', overflow: 'visible' }}>
              <svg 
                viewBox="0 0 1200 300" 
                style={{ 
                  width: '95vw', 
                  maxWidth: '1000px', 
                  overflow: 'visible',
                }}
              >
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c5cff" />
                    <stop offset="100%" stopColor="#3ad1ff" />
                  </linearGradient>
                </defs>

                {/* The "Drawing" Layer - Stroke & Fill match to remove 'border' look */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '110px',
                    fontWeight: 400,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'none',
                    stroke: 'url(#neonGradient)',
                    strokeWidth: '1.5px',
                    filter: 'drop-shadow(0 0 15px #7c5cff) drop-shadow(0 0 30px #3ad1ff)',
                  }}
                  initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                >
                  Developed By RAHUL
                </motion.text>

                {/* The "Fill" Layer - Fades in to complete the solid look */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '110px',
                    fontWeight: 400,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'url(#neonGradient)',
                    filter: 'drop-shadow(0 0 20px rgba(124, 92, 255, 0.5))',
                    pointerEvents: 'none'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1.2 }}
                >
                  Developed By RAHUL
                </motion.text>

                {/* Pulsing Aura */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '110px',
                    fontWeight: 400,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'url(#neonGradient)',
                    filter: 'blur(30px) opacity(0.3)',
                    zIndex: -1,
                  }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ delay: 3, duration: 3, repeat: Infinity }}
                >
                  Developed By RAHUL
                </motion.text>
              </svg>

              {/* Animated Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 2.5 }}
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, #3ad1ff, #7c5cff, transparent)',
                  width: '65%',
                  margin: '0 auto',
                  marginTop: '-30px',
                  boxShadow: '0 0 30px #7c5cff',
                  transformOrigin: 'center'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
