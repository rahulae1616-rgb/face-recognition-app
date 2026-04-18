import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(16px, 4vw, 40px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1040, margin: '0 auto' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
