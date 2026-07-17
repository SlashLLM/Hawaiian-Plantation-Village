import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRPass({ token, label = 'Your pass' }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (!token) return;
    QRCode.toDataURL(token, { width: 200, margin: 2, color: { dark: '#1b3823', light: '#ffffff' } })
      .then(setDataUrl)
      .catch(() => setDataUrl(''));
  }, [token]);

  if (!dataUrl) return null;

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={dataUrl} alt={label} className="qr-preview" width={200} height={200} />
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-typewriter)' }}>
        Present this QR code at check-in
      </p>
    </div>
  );
}
