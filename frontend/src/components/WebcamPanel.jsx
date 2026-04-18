import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const constraints = { video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } };

export default function WebcamPanel({
  title = 'Camera',
  onCapture,
  primaryLabel = 'Capture photo',
  busy = false,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [permission, setPermission] = useState('prompt'); // prompt | granted | denied | unsupported
  const [error, setError] = useState('');

  const stop = useCallback(() => {
    const s = streamRef.current;
    if (s) {
      s.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const start = useCallback(async () => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission('unsupported');
      setError('Camera is not supported in this browser.');
      return;
    }
    try {
      stop();
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPermission('granted');
    } catch (e) {
      stop();
      if (e?.name === 'NotAllowedError' || e?.name === 'PermissionDeniedError') {
        setPermission('denied');
        setError('Camera permission was denied. Allow camera access in your browser settings.');
      } else if (e?.name === 'NotFoundError') {
        setPermission('unsupported');
        setError('No camera was found on this device.');
      } else {
        setPermission('denied');
        setError(e?.message || 'Could not start the camera.');
      }
    }
  }, [stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const capture = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      setError('Wait for the preview to load, then try again.');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    if (!blob) {
      setError('Could not capture image.');
      return;
    }
    if (onCapture) await onCapture(blob);
  }, [onCapture]);

  return (
    <div
      style={{
        borderRadius: 'var(--radius)',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass)',
        backdropFilter: 'blur(16px)',
        padding: 16,
        display: 'grid',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-ghost" onClick={start} disabled={busy}>
            Open camera
          </button>
          <button type="button" className="btn btn-ghost" onClick={stop} disabled={busy}>
            Stop
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
          aspectRatio: '4 / 3',
          maxHeight: 420,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
        />
        <AnimatePresence>
          {permission !== 'granted' && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                padding: 16,
                textAlign: 'center',
                color: 'var(--muted)',
                background: 'linear-gradient(180deg, rgba(10,12,20,0.55), rgba(10,12,20,0.85))',
              }}
            >
              <div style={{ maxWidth: 420 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Live preview</div>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                  Click <b>Open camera</b> to see your live feed here before capturing a photo.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error ? (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      ) : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-primary" onClick={capture} disabled={busy || permission !== 'granted'}>
          {primaryLabel}
        </button>
      </div>
    </div>
  );
}
