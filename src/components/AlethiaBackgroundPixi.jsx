import React, { useEffect, useRef } from 'react';
import { Application, Container, Graphics, Sprite } from 'pixi.js';

export default function AlethiaBackgroundPixi() {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    let active = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const app = new Application();
    let handleMouseMove;
    let handleTouchMove;
    let handleMouseLeave;
    let handleFocus;
    let handleBlur;

    async function initPixi() {
      if (!containerRef.current) return;

      await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
        resolution: 1,
        antialias: false,
        autoDensity: true,
        preference: 'webgl',
      });

      if (!active) {
        app.destroy(true, { children: true, texture: true, textureSource: true });
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      const particleContainer = new Container();
      app.stage.addChild(particleContainer);

      const colors = [0x0f766e, 0x14b8a6, 0xf59e0b];
      const textures = [];

      colors.forEach((colorHex) => {
        [2, 4, 6].forEach((radius) => {
          const g = new Graphics().circle(0, 0, radius).fill({ color: colorHex, alpha: 0.28 });
          textures.push(app.renderer.generateTexture(g));
          g.destroy();
        });
      });

      const particleCount = reducedMotion ? 12 : Math.min(50, window.innerWidth < 768 ? 22 : 50);
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        const tex = textures[Math.floor(Math.random() * textures.length)];
        const sprite = new Sprite(tex);
        sprite.x = Math.random() * window.innerWidth;
        sprite.y = Math.random() * window.innerHeight;
        sprite.anchor.set(0.5);
        const speedY = reducedMotion ? 0.08 : 0.25 + Math.random() * 0.55;
        const speedX = -0.15 + Math.random() * 0.3;
        sprite.scale.set(0.4 + Math.random() * 0.7);
        sprite.alpha = 0.15 + Math.random() * 0.35;
        particleContainer.addChild(sprite);
        particles.push({
          sprite,
          speedX,
          speedY,
          baseAlpha: sprite.alpha,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: reducedMotion ? 0 : 0.008 + Math.random() * 0.015,
        });
      }

      handleMouseMove = (e) => {
        pointerRef.current = { x: e.clientX, y: e.clientY };
      };
      handleTouchMove = (e) => {
        if (e.touches?.[0]) {
          pointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };
      handleMouseLeave = () => {
        pointerRef.current = { x: -1000, y: -1000 };
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      handleFocus = () => app.start();
      handleBlur = () => app.stop();
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      if (reducedMotion) app.stop();

      app.ticker.add(() => {
        if (reducedMotion) return;

        const mouse = pointerRef.current;
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;

        particles.forEach((p) => {
          const s = p.sprite;
          s.y -= p.speedY;
          p.angle += p.angleSpeed;
          s.x += p.speedX + Math.sin(p.angle) * 0.2;
          s.alpha = p.baseAlpha + Math.sin(p.angle * 2) * 0.1;

          if (mouse.x > -1000) {
            const dx = s.x - mouse.x;
            const dy = s.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              const angle = Math.atan2(dy, dx);
              s.x += Math.cos(angle) * force * 2.5;
              s.y += Math.sin(angle) * force * 2.5;
            }
          }

          if (s.y < -20) {
            s.y = wHeight + 20;
            s.x = Math.random() * wWidth;
          }
          if (s.x < -20) s.x = wWidth + 20;
          else if (s.x > wWidth + 20) s.x = -20;
        });
      });
    }

    initPixi();

    return () => {
      active = false;
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleTouchMove) window.removeEventListener('touchmove', handleTouchMove);
      if (handleMouseLeave) window.removeEventListener('mouseleave', handleMouseLeave);
      if (handleFocus) window.removeEventListener('focus', handleFocus);
      if (handleBlur) window.removeEventListener('blur', handleBlur);

      if (appRef.current) {
        appRef.current.destroy(
          { removeView: true, releaseGlobalResources: true },
          { children: true, texture: true, textureSource: true }
        );
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    />
  );
}
