// QR image as data URL for email embedding (server-side minimal PNG via external API fallback)
export async function qrToDataUrl(payload: string): Promise<string> {
  const encoded = encodeURIComponent(payload);
  // Use a lightweight QR API for edge runtime (no native canvas in Deno deploy)
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to generate QR image');
  }
  const buf = await res.arrayBuffer();
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  return `data:image/png;base64,${b64}`;
}
