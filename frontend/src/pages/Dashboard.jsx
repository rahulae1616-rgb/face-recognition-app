import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import WebcamPanel from '../components/WebcamPanel.jsx';
import { recognizeUser } from '../api/client.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recognizing, setRecognizing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('fr_user');
    if (!raw) {
      navigate('/', { replace: true });
      return;
    }
    try {
      setUser(JSON.parse(raw));
    } catch {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const greeting = useMemo(() => {
    if (!user?.name) return '';
    return `Hi, ${user.name}`;
  }, [user]);

  async function onRecognizeCapture(blob) {
    const fd = new FormData();
    fd.append('photo', blob, 'probe.jpg');
    setRecognizing(true);
    setResult(null);
    const t = toast.loading('Matching your face…');
    try {
      const data = await recognizeUser(fd);
      if (!data?.ok) throw new Error(data?.message || 'Recognition failed');
      setResult(data);
      if (data.matched) toast.success('Identity verified', { id: t });
      else toast(data.message || 'Please Register First', { id: t, icon: 'ℹ️' });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Recognition failed';
      toast.error(msg, { id: t });
      setResult({ ok: false, matched: false, message: msg });
    } finally {
      setRecognizing(false);
    }
  }

  if (!user) return null;

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{
          padding: '16px 18px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Dashboard</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{greeting}</div>
          <div style={{ color: 'var(--muted)', marginTop: 4 }}>You are registered. Try live recognition below.</div>
        </div>
        <Link className="btn btn-ghost" to="/">
          New registration
        </Link>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 18,
          alignItems: 'start',
        }}
      >
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <WebcamPanel
            title="Recognition camera"
            onCapture={onRecognizeCapture}
            primaryLabel="Recognize"
            busy={recognizing}
          />
          <p style={{ marginTop: 12, color: 'var(--muted)', fontSize: 14, lineHeight: 1.55 }}>
            Tip: use similar lighting to registration for best accuracy. The server compares embeddings using a
            configurable distance threshold.
          </p>
        </motion.div>

        <div style={{ position: 'relative', minHeight: 220 }}>
          <AnimatePresence mode="wait">
            {recognizing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass"
                style={{
                  padding: 18,
                  display: 'grid',
                  gap: 12,
                  alignContent: 'start',
                  border: '1px solid rgba(124,92,255,0.35)',
                }}
              >
                <div style={{ fontWeight: 700 }}>Analyzing…</div>
                <div className="skeleton" style={{ height: 10, borderRadius: 999 }} />
                <div className="skeleton" style={{ height: 10, width: '78%', borderRadius: 999 }} />
                <div className="skeleton" style={{ height: 10, width: '62%', borderRadius: 999 }} />
              </motion.div>
            ) : result?.matched ? (
              <motion.div
                key="match"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="glass glow"
                style={{ padding: 18, display: 'grid', gap: 10 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>Matched profile</div>
                  <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                    distance {typeof result.distance === 'number' ? result.distance.toFixed(3) : '—'}
                  </div>
                </div>
                <div className="kv">
                  <span>Name</span>
                  <b>{result.user?.name}</b>
                </div>
                <div className="kv">
                  <span>Age</span>
                  <b>{result.user?.age}</b>
                </div>
                <div className="kv">
                  <span>Email</span>
                  <b>{result.user?.email}</b>
                </div>
                <div className="kv">
                  <span>Country</span>
                  <b>{result.user?.country}</b>
                </div>
              </motion.div>
            ) : result && !result.matched ? (
              <motion.div
                key="nomatch"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass"
                style={{
                  padding: 18,
                  border: '1px solid rgba(255,92,122,0.35)',
                  color: 'var(--text)',
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 8 }}>No match</div>
                <div style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  {result.message || 'Please Register First'}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass"
                style={{ padding: 18, color: 'var(--muted)' }}
              >
                Capture a frame with <b style={{ color: 'var(--text)' }}>Recognize</b> to compare against stored
                embeddings.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
