import React, { useEffect, useRef } from 'react';
import { Application, Container, Graphics, Sprite } from 'pixi.js';

export default function ExhibitionBackgroundPixi() {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    let active = true;
    const app = new Application();

    async function initPixi() {
      if (!containerRef.current) return;

      await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
        resolution: 1, // High performance / mobile friendly
        antialias: false,
        autoDensity: true,
        preference: 'webgl'
      });

      if (!active) {
        app.destroy(true, { children: true, texture: true, textureSource: true });
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      // Create Particle Container
      const particleContainer = new Container();
      app.stage.addChild(particleContainer);

      // Generate a single shared texture for particles to allow batching
      // We will create three sizes of glowing embers
      const textures = [];
      const colors = [0x2c5938, 0x477652, 0xa3b899]; // Cane green, Moss green, Soft sage
      
      colors.forEach((colorHex) => {
        [3, 5, 8].forEach((radius) => {
          const g = new Graphics()
            .circle(0, 0, radius)
            .fill({ color: colorHex, alpha: 0.22 });
          const text = app.renderer.generateTexture(g);
          textures.push(text);
          g.destroy();
        });
      });

      const particles = [];
      const particleCount = Math.min(60, window.innerWidth < 768 ? 25 : 60);

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        const tex = textures[Math.floor(Math.random() * textures.length)];
        const sprite = new Sprite(tex);
        
        // Random starting positions
        sprite.x = Math.random() * window.innerWidth;
        sprite.y = Math.random() * window.innerHeight;
        sprite.anchor.set(0.5);
        
        // Custom movement properties
        const speedY = 0.4 + Math.random() * 0.8;
        const speedX = -0.3 + Math.random() * 0.6;
        const scaleVal = 0.5 + Math.random() * 0.8;
        sprite.scale.set(scaleVal);
        sprite.alpha = 0.2 + Math.random() * 0.5;

        particleContainer.addChild(sprite);
        particles.push({
          sprite,
          speedX,
          speedY,
          baseAlpha: sprite.alpha,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.01 + Math.random() * 0.02,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }

      // Pointer event listener on window
      const handleMouseMove = (e) => {
        pointerRef.current = { x: e.clientX, y: e.clientY };
      };

      const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) {
          pointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const handleMouseLeave = () => {
        pointerRef.current = { x: -1000, y: -1000 };
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      // Focus/Blur pausing to respect CPU limits
      const handleFocus = () => {
        if (appRef.current && appRef.current.ticker) {
          appRef.current.start();
        }
      };

      const handleBlur = () => {
        if (appRef.current && appRef.current.ticker) {
          appRef.current.stop();
        }
      };

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      // Ticker Render Loop
      app.ticker.add((ticker) => {
        const mouse = pointerRef.current;
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;

        particles.forEach((p) => {
          const s = p.sprite;
          
          // Basic drift upward
          s.y -= p.speedY;
          
          // Sway horizontally
          p.angle += p.angleSpeed;
          s.x += p.speedX + Math.sin(p.angle) * 0.25;

          // Pulse alpha
          s.alpha = p.baseAlpha + Math.sin(p.angle * 2) * 0.15;

          // Pointer interaction: repel particles away from cursor
          if (mouse.x > -1000) {
            const dx = s.x - mouse.x;
            const dy = s.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
              const force = (150 - dist) / 150; // 0 to 1 force
              const angle = Math.atan2(dy, dx);
              
              // Push particle away
              s.x += Math.cos(angle) * force * 3;
              s.y += Math.sin(angle) * force * 3;
            }
          }

          // Reset particle if it drifts off screen
          if (s.y < -20) {
            s.y = wHeight + 20;
            s.x = Math.random() * wWidth;
          }
          if (s.x < -20) {
            s.x = wWidth + 20;
          } else if (s.x > wWidth + 20) {
            s.x = -20;
          }
        });
      });
    }

    initPixi();

    return () => {
      active = false;
      window.removeEventListener('mousemove', pointerRef.current);
      window.removeEventListener('touchmove', pointerRef.current);
      window.removeEventListener('mouseleave', pointerRef.current);
      window.removeEventListener('focus', pointerRef.current);
      window.removeEventListener('blur', pointerRef.current);

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
        zIndex: -1, 
        pointerEvents: 'none',
        overflow: 'hidden'
      }} 
    />
  );
}
