/**
 * Browser helpers for reading metadata from, and grabbing a still frame out of,
 * a video file. Used by the CMS so an oral-history video can supply its own
 * poster image without the editor having to export a frame by hand.
 */

const DEFAULT_TIMEOUT_MS = 20000;

function createVideoElement(src) {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  // Object URLs are same-origin; remote files need CORS headers to stay untainted.
  if (!src.startsWith('blob:')) video.crossOrigin = 'anonymous';
  return video;
}

function releaseVideo(video) {
  video.removeAttribute('src');
  try {
    video.load();
  } catch {
    // Ignore: some browsers throw when loading an element that is being torn down.
  }
}

/** Resolve the duration of a video in seconds, or null when it cannot be read. */
export function readVideoDuration(src, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const video = createVideoElement(src);
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      releaseVideo(video);
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);

    video.onloadedmetadata = () => {
      const seconds = video.duration;
      finish(Number.isFinite(seconds) && seconds > 0 ? seconds : null);
    };
    video.onerror = () => finish(null);
    video.src = src;
  });
}

/**
 * Grab a still frame from a video as an image Blob.
 * Returns null when the frame cannot be read (unsupported codec, tainted canvas,
 * or a cross-origin file served without CORS headers).
 */
export function captureVideoFrame(src, options = {}) {
  const {
    seekTime = 1,
    maxWidth = 1600,
    mimeType = 'image/jpeg',
    quality = 0.85,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const video = createVideoElement(src);
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      releaseVideo(video);
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);

    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      // Frame 0 is often black; step in a little, but never past the end.
      const target = duration > 0 ? Math.min(seekTime, Math.max(duration / 2, 0)) : seekTime;
      try {
        video.currentTime = target;
      } catch {
        finish(null);
      }
    };

    video.onseeked = () => {
      try {
        const sourceWidth = video.videoWidth;
        const sourceHeight = video.videoHeight;
        if (!sourceWidth || !sourceHeight) {
          finish(null);
          return;
        }
        const scale = sourceWidth > maxWidth ? maxWidth / sourceWidth : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(sourceWidth * scale);
        canvas.height = Math.round(sourceHeight * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          finish(null);
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        if (typeof canvas.toBlob !== 'function') {
          finish(null);
          return;
        }
        canvas.toBlob((blob) => finish(blob ?? null), mimeType, quality);
      } catch {
        // Tainted canvas (cross-origin video without CORS headers).
        finish(null);
      }
    };

    video.onerror = () => finish(null);
    video.src = src;
  });
}

/** Capture a frame and wrap it in a File ready for upload. */
export async function captureVideoFrameFile(src, fileName = 'video-frame.jpg', options = {}) {
  const blob = await captureVideoFrame(src, options);
  if (!blob) return null;
  return new File([blob], fileName, { type: blob.type || 'image/jpeg' });
}
