import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Camera, Pause, Scan } from 'lucide-react';
import { verifyCredential } from '../../lib/api.js';

const COOLDOWN_MS = 2500;

export default function QRScanner() {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const lastScanRef = useRef('');
  const lastScanTimeRef = useRef(0);
  const [active, setActive] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [manualRef, setManualRef] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleVerify = useCallback(async (payload) => {
    setVerifying(true);
    setError('');
    try {
      const res = await verifyCredential(payload);
      setResult(res);
    } catch (err) {
      setError(err.message ?? 'Verification failed');
      setResult(null);
    } finally {
      setVerifying(false);
    }
  }, []);

  const onDecode = useCallback((text) => {
    const now = Date.now();
    if (text === lastScanRef.current && now - lastScanTimeRef.current < COOLDOWN_MS) return;
    lastScanRef.current = text;
    lastScanTimeRef.current = now;
    handleVerify({ token: text.trim() });
  }, [handleVerify]);

  useEffect(() => {
    if (!active) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;
    let cancelled = false;

    (async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCam = devices.find((d) => /back|rear|environment/i.test(d.label));
        const deviceId = backCam?.deviceId ?? devices[0]?.deviceId;

        await reader.decodeFromVideoDevice(deviceId, videoRef.current, (res, _err) => {
          if (cancelled) return;
          if (res) onDecode(res.getText());
        });
      } catch (err) {
        setError(err.message ?? 'Camera access denied. Use manual entry or enable HTTPS.');
        setActive(false);
      }
    })();

    return () => {
      cancelled = true;
      reader.reset();
    };
  }, [active, onDecode]);

  function resultClass() {
    if (!result) return '';
    if (result.result === 'valid_checked_in' || result.result === 'active_member') return 'valid';
    if (result.result === 'already_checked_in') return 'duplicate';
    return 'error';
  }

  return (
    <div className="paper-card" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Scan Tickets & Memberships</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Point the camera at a guest QR pass, or enter a reference ID manually.
      </p>

      <div className="admin-toolbar">
        <button
          type="button"
          className={active ? 'btn-secondary' : 'btn-primary'}
          onClick={() => setActive((v) => !v)}
        >
          {active ? <><Pause size={16} /> Pause camera</> : <><Camera size={16} /> Start camera</>}
        </button>
      </div>

      <div className="scanner-viewport">
        <video ref={videoRef} muted playsInline />
        {!active && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ccc', fontFamily: 'var(--font-typewriter)', fontSize: '0.85rem'
          }}>
            <Scan size={48} style={{ opacity: 0.4 }} />
          </div>
        )}
      </div>

      <div className="admin-form-grid" style={{ marginTop: '1rem' }}>
        <div className="admin-form-field full">
          <label className="admin-form-label" htmlFor="manual-ref">Reference ID (HPV-TKT-… or HPV-MEM-…)</label>
          <input
            id="manual-ref"
            className="admin-form-input"
            value={manualRef}
            onChange={(e) => setManualRef(e.target.value)}
            placeholder="HPV-TKT-123456"
          />
        </div>
        <div className="admin-form-field full">
          <label className="admin-form-label" htmlFor="manual-token">Or raw QR token</label>
          <input
            id="manual-token"
            className="admin-form-input"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            placeholder="Paste scanned token"
          />
        </div>
      </div>

      <button
        type="button"
        className="btn-primary"
        style={{ marginTop: '0.75rem' }}
        disabled={verifying || (!manualRef && !manualToken)}
        onClick={() => handleVerify({
          ...(manualToken ? { token: manualToken } : {}),
          ...(manualRef ? { referenceId: manualRef } : {}),
        })}
      >
        {verifying ? 'Verifying…' : 'Verify manually'}
      </button>

      {error && <p role="alert" style={{ color: 'var(--tin-rust)', marginTop: '1rem' }}>{error}</p>}

      {result && (
        <div className={`scanner-result ${resultClass()}`}>
          <strong>{result.message}</strong>
          {result.details && (
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.85rem' }}>
              {Object.entries(result.details).map(([k, v]) => (
                <li key={k}><span style={{ textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>: {String(v)}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
