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
                
                {/* Outline Drawing Stage */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '92px',
                    fontWeight: 700,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'none',
                    stroke: 'url(#cursiveGradient)',
                    strokeWidth: '2px',
                    filter: 'drop-shadow(0 0 20px rgba(124, 92, 255, 0.8))',
                  }}
                  initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                  animate={{ 
                    strokeDashoffset: 0,
                  }}
                  transition={{ 
                    duration: 3, 
                    ease: "easeInOut"
                  }}
                >
                  Developed By RAHUL
                </motion.text>

                {/* Fill Stage */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: '92px',
                    fontWeight: 700,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'url(#cursiveGradient)',
                    filter: 'drop-shadow(0 0 25px rgba(58, 209, 255, 0.6)) drop-shadow(0 0 45px rgba(124, 92, 255, 0.3))',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1
                  }}
                  transition={{ 
                    delay: 2.2,
                    duration: 1.2,
                    ease: "easeOut"
                  }}
                >
                  Developed By RAHUL
                </motion.text>
              </svg>

              {/* Intense underline flare */}
              <motion.div
                style={{
                  height: '2.5px',
                  background: 'linear-gradient(90deg, transparent, var(--accent2), transparent)',
                  margin: '0 auto',
                  width: '0%',
                  marginTop: '-25px',
                  boxShadow: '0 0 30px var(--accent2), 0 0 50px rgba(58, 209, 255, 0.4)'
                }}
                animate={{ width: '65%' }}
                transition={{ delay: 1, duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
