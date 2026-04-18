import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import WebcamPanel from '../components/WebcamPanel.jsx';
import { recognizeUser } from '../api/client.js';

export default function Recognize() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!photoBlob) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(photoBlob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoBlob]);

  async function onCapture(blob) {
    setPhotoBlob(blob);
    setMatchResult(null);
    
    // Auto-submit for recognition
    const fd = new FormData();
    fd.append('photo', blob, 'recognition.jpg');

    setSubmitting(true);
    const t = toast.loading('Analyzing face...');
    try {
      const data = await recognizeUser(fd);
      if (!data?.ok) throw new Error(data?.message || 'Recognition failed');

      setMatchResult(data);
      if (data.matched) {
        toast.success(`Welcome back, ${data.user.name}!`, { id: t });
        // Optionally save to session and navigate to dashboard
        sessionStorage.setItem('fr_user', JSON.stringify(data.user));
      } else {
        toast.error('Face not recognized. Please register first.', { id: t });
      }
    } catch (err) {
      toast.error(err?.message || 'Failed to analyze face', { id: t });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 28, maxWidth: 800, marginInline: 'auto' }}>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Identity Verification
        </div>
        <h1 style={{ margin: '12px 0 8px' }}>Already Registered?</h1>
        <p style={{ color: 'var(--muted)', margin: 0 }}>
          Scan your face to quickly access your profile.
        </p>
      </motion.header>

      <div style={{ display: 'grid', gap: 20 }}>
        <AnimatePresence mode="wait">
          {matchResult && matchResult.matched ? (
            <motion.div
              key="match"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass"
              style={{
                padding: 24,
                textAlign: 'center',
                border: '1px solid var(--accent)',
                backgroundColor: 'rgba(57, 115, 237, 0.05)',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
              <h2 style={{ margin: '0 0 4px' }}>Welcome back, {matchResult.user.name}</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
                {matchResult.user.email} • {matchResult.user.country}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </button>
                <button className="btn btn-ghost" onClick={() => setMatchResult(null)}>
                  Scan Again
                </button>
              </div>
            </motion.div>
          ) : matchResult && !matchResult.matched ? (
            <motion.div
              key="no-match"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass"
              style={{ padding: 20, textAlign: 'center', border: '1px solid rgba(255, 100, 100, 0.2)' }}
            >
              <h3 style={{ margin: '0 0 8px', color: '#ff6b6b' }}>Face Not Recognized</h3>
              <p style={{ margin: '0 0 16px', color: 'var(--muted)' }}>
                We couldn't find a matching profile. Please make sure you are registered.
              </p>
              <Link to="/" className="btn btn-primary">
                Register Now
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WebcamPanel
                title="Face Verification"
                onCapture={onCapture}
                primaryLabel="Verify My Face"
                busy={submitting}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--muted)', fontSize: 14, textDecoration: 'none' }}>
            ← Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
