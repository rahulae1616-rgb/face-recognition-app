import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import WebcamPanel from '../components/WebcamPanel.jsx';
import { fetchCountries, registerUser } from '../api/client.js';

const GMAIL_RE = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export default function Register() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    country: '',
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchCountries();
        if (!cancelled) setCountries(list);
      } catch {
        if (!cancelled) toast.error('Could not load countries. Is the API running?');
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!photoBlob) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(photoBlob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoBlob]);

  const emailHint = useMemo(() => {
    if (!form.email) return '';
    if (!GMAIL_RE.test(form.email.trim())) return 'Use a valid Gmail address ending with @gmail.com';
    return '';
  }, [form.email]);

  async function onCapture(blob) {
    setPhotoBlob(blob);
    toast.success('Photo captured. Review the preview, then submit.');
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required');
    if (!form.age || Number(form.age) < 1) return toast.error('Age must be a positive number');
    if (!GMAIL_RE.test(form.email.trim())) return toast.error('Only Gmail addresses are allowed');
    if (!form.country) return toast.error('Please select a country');
    if (!photoBlob) return toast.error('Please capture a photo with your webcam');

    const fd = new FormData();
    fd.append('name', form.name.trim());
    fd.append('age', String(Number(form.age)));
    fd.append('email', form.email.trim().toLowerCase());
    fd.append('country', form.country);
    fd.append('photo', photoBlob, 'capture.jpg');

    setSubmitting(true);
    const t = toast.loading('Registering and analyzing your face…');
    try {
      const data = await registerUser(fd);
      if (!data?.ok) throw new Error(data?.message || 'Registration failed');
      sessionStorage.setItem('fr_user', JSON.stringify(data.user));
      toast.success('Welcome! Your profile is ready.', { id: t });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        err?.message ||
        'Registration failed';
      toast.error(msg, { id: t });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 22 }}>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Secure onboarding
        </div>
        <h1 style={{ margin: '10px 0 6px', fontSize: 'clamp(28px, 4vw, 40px)' }}>Create your face profile</h1>
        <p style={{ margin: 0, color: 'var(--muted)', maxWidth: 720, marginInline: 'auto', lineHeight: 1.6 }}>
          Register with Gmail, pick your country, and capture a clear selfie. We extract a numeric face embedding and
          store it with your profile for recognition.
        </p>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate('/recognize')}
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            OLD USER? <span style={{ fontWeight: 700, color: 'var(--accent)', marginLeft: 6 }}>REGISTERED</span>
          </button>
        </div>
      </motion.header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 18,
          alignItems: 'start',
        }}
      >
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="glass"
          style={{ padding: 18, display: 'grid', gap: 12 }}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Alex Rivera"
            />
          </div>

          <div className="field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              min={1}
              max={150}
              value={form.age}
              onChange={(e) => setForm((s) => ({ ...s, age: e.target.value }))}
              placeholder="24"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email (Gmail only)</label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="you@gmail.com"
            />
            {emailHint ? <div className="hint hint-warn">{emailHint}</div> : null}
          </div>

          <div className="field">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={form.country}
              disabled={loadingCountries}
              onChange={(e) => setForm((s) => ({ ...s, country: e.target.value }))}
            >
              <option value="">{loadingCountries ? 'Loading countries…' : 'Select your country'}</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {previewUrl ? (
            <div className="field">
              <label>Captured photo</label>
              <div
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.10)',
                  maxHeight: 220,
                }}
              >
                <img alt="Captured" src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button type="button" className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => setPhotoBlob(null)}>
                Remove photo
              </button>
            </div>
          ) : null}

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Complete registration'}
          </button>
        </motion.form>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
          <WebcamPanel title="Webcam capture" onCapture={onCapture} primaryLabel="Capture registration photo" busy={submitting} />
        </motion.div>
      </div>
    </div>
  );
}
