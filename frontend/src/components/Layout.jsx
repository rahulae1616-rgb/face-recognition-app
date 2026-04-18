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
              backgroundColor: 'rgba(7, 10, 19, 0.7)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              pointerEvents: 'none',
              zIndex: 9999,
              overflow: 'visible'
            }}
          >
            <div style={{ position: 'relative', textAlign: 'center', overflow: 'visible' }}>
              <svg 
                viewBox="0 0 1200 300" 
                style={{ 
                  width: '95vw', 
                  maxWidth: '1000px', 
                  overflow: 'visible',
                  filter: 'drop-shadow(0 0 20px rgba(124, 92, 255, 0.6)) drop-shadow(0 0 40px rgba(58, 209, 255, 0.3))'
                }}
              >
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c5cff" />
                    <stop offset="100%" stopColor="#3ad1ff" />
                  </linearGradient>

                  {/* Mask that reveals the text as it "draws" */}
                  <mask id="drawingMask">
                    <motion.path
                      d="M 50 150 L 1150 150"
                      fill="none"
                      stroke="white"
                      strokeWidth="200"
                      strokeDasharray="1100"
                      initial={{ strokeDashoffset: 1100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </mask>
                </defs>

                {/* Solid Cursive Text (Revealed by Mask) */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  mask="url(#drawingMask)"
                  style={{
                    fontSize: '110px',
                    fontWeight: 400,
                    fontFamily: '"Pacifico", cursive',
                    fill: 'url(#neonGradient)',
                    filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))',
                  }}
                >
                  Developed By RAHUL
                </text>

                {/* Pulsing Glow Aura Layer */}
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
                    filter: 'blur(25px)',
                    zIndex: -1,
                  }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Developed By RAHUL
                </motion.text>
              </svg>

              {/* Neon Underline with animated draw and glow */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 2 }}
                style={{
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, #3ad1ff, #7c5cff, transparent)',
                  width: '70%',
                  margin: '0 auto',
                  marginTop: '-25px',
                  boxShadow: '0 0 30px #7c5cff, 0 0 60px rgba(58, 209, 255, 0.5)',
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
