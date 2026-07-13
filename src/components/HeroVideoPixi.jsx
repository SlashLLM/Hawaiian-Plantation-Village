import React, { useEffect, useRef, useState } from 'react';
import { Application, Container, Graphics, Sprite, Text, Assets } from 'pixi.js';

export default function HeroVideoPixi({ onExploreClick }) {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    const app = new Application();
    let videoTex = null;
    let resizeHandler = null;

    async function initPixi() {
      if (!containerRef.current) return;

      // 1. Wait for custom web fonts to be fully loaded
      await document.fonts.ready;
      if (!active) return;

      // 2. Initialize Pixi application to match its wrapper size
      await app.init({
        resizeTo: containerRef.current,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        antialias: true,
      });

      if (!active) {
        app.destroy(true, { children: true, texture: true, textureSource: true });
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      // 3. Load the video background texture
      try {
        videoTex = await Assets.load({
          src: '/Plantation_life_documentary_video_202607131034.mp4',
          data: {
            autoPlay: true,
            loop: true,
            muted: true,
            playsinline: true,
            preload: true
          }
        });
      } catch (err) {
        console.error("Failed to load video background, falling back to static presentation", err);
      }

      if (!active) return;

      let videoSprite = null;
      if (videoTex) {
        videoSprite = new Sprite(videoTex);
        videoSprite.anchor.set(0.5);
        app.stage.addChild(videoSprite);
      }

      // 4. Create semi-transparent overlay to ensure text contrast
      const overlay = new Graphics();
      app.stage.addChild(overlay);

      // 5. Create ambient golden dust particles container (behind text)
      const particleContainer = new Container();
      app.stage.addChild(particleContainer);

      // 6. Create text and button container
      const textContainer = new Container();
      app.stage.addChild(textContainer);

      // 7. Add text display objects inside the text container
      const badgeText = new Text({
        text: "EST. 1992",
        style: {
          fontFamily: "'Courier Prime', Monaco, monospace",
          fontSize: 14,
          fontWeight: 'bold',
          fill: 0xd4981e, // Gold
          align: 'center',
          letterSpacing: 2
        }
      });
      badgeText.anchor.set(0.5);
      textContainer.addChild(badgeText);

      const titleText = new Text({
        text: "Experience a Living History",
        style: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 52,
          fontWeight: 'bold',
          fill: 0xfbf9f5, // Off-white
          align: 'center',
          dropShadow: { color: 0x000000, blur: 6, distance: 4, alpha: 0.65 },
          wordWrap: true,
          wordWrapWidth: 800
        }
      });
      titleText.anchor.set(0.5);
      textContainer.addChild(titleText);

      const subText = new Text({
        text: "Walk in the footsteps of the immigrant communities that built modern Hawaiʻi.",
        style: {
          fontFamily: "'Lora', Garamond, serif",
          fontSize: 19,
          fill: 0xebd7bc, // Warm cream
          align: 'center',
          dropShadow: { color: 0x000000, blur: 4, distance: 2, alpha: 0.5 },
          wordWrap: true,
          wordWrapWidth: 650
        }
      });
      subText.anchor.set(0.5);
      textContainer.addChild(subText);

      // 8. Create interactive button
      const buttonContainer = new Container();
      buttonContainer.eventMode = 'static';
      buttonContainer.cursor = 'pointer';
      textContainer.addChild(buttonContainer);

      const buttonWidth = 260;
      const buttonHeight = 52;
      const hW = buttonWidth / 2;
      const hH = buttonHeight / 2;

      // Draw shadow
      const btnShadow = new Graphics()
        .rect(-hW + 3, -hH + 3, buttonWidth, buttonHeight)
        .fill({ color: 0x2e1a0a, alpha: 0.7 });
      buttonContainer.addChild(btnShadow);

      // Draw border & background
      const btnBg = new Graphics()
        .rect(-hW, -hH, buttonWidth, buttonHeight)
        .fill({ color: 0x1b3823 })
        .stroke({ color: 0x4a2c11, width: 1.5 });
      buttonContainer.addChild(btnBg);

      // Draw hover background (overlay)
      const btnHoverBg = new Graphics()
        .rect(-hW, -hH, buttonWidth, buttonHeight)
        .fill({ color: 0x2c5938 })
        .stroke({ color: 0x4a2c11, width: 1.5 });
      btnHoverBg.alpha = 0;
      buttonContainer.addChild(btnHoverBg);

      // Button Text
      const btnText = new Text({
        text: "BEGIN PRE-VISIT JOURNEY",
        style: {
          fontFamily: "'Courier Prime', Monaco, monospace",
          fontSize: 14,
          fontWeight: 'bold',
          fill: 0xfbf9f5,
          letterSpacing: 1
        }
      });
      btnText.anchor.set(0.5);
      buttonContainer.addChild(btnText);

      // Interactivity logic
      let isHovered = false;
      buttonContainer.on('pointerover', () => { isHovered = true; });
      buttonContainer.on('pointerout', () => { isHovered = false; });
      buttonContainer.on('pointertap', () => {
        if (onExploreClick) onExploreClick();
      });

      // 9. Create ambient floating golden particles
      const circleG = new Graphics()
        .circle(0, 0, 5)
        .fill({ color: 0xd4981e, alpha: 0.22 });
      const particleTex = app.renderer.generateTexture(circleG);
      circleG.destroy();

      const particles = [];
      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        const sprite = new Sprite(particleTex);
        sprite.anchor.set(0.5);
        sprite.x = Math.random() * app.screen.width;
        sprite.y = Math.random() * app.screen.height;
        sprite.scale.set(0.3 + Math.random() * 0.7);
        sprite.alpha = 0.1 + Math.random() * 0.3;
        particleContainer.addChild(sprite);

        particles.push({
          sprite,
          speedY: 0.25 + Math.random() * 0.5,
          speedX: -0.15 + Math.random() * 0.3,
          baseAlpha: sprite.alpha,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.008 + Math.random() * 0.012
        });
      }

      // Target layout coordinates
      let targetBadgeY = 0;
      let targetTitleY = 0;
      let targetSubY = 0;
      let targetButtonY = 0;

      // 10. Layout Resize Handler (covers object-fit and text wrap/sizing)
      const layoutAll = () => {
        const w = app.screen.width;
        const h = app.screen.height;
        const isMobile = w < 768;

        // Position background overlay
        overlay.clear()
          .rect(0, 0, w, h)
          .fill({ color: 0x000000, alpha: 0.45 });

        // Cover background video logic
        if (videoTex && videoSprite) {
          const videoSource = videoTex.source;
          const vWidth = videoSource.width || 640;
          const vHeight = videoSource.height || 360;
          const vRatio = vWidth / vHeight;
          const screenRatio = w / h;

          videoSprite.x = w / 2;
          videoSprite.y = h / 2;

          if (screenRatio > vRatio) {
            videoSprite.width = w;
            videoSprite.height = w / vRatio;
          } else {
            videoSprite.height = h;
            videoSprite.width = h * vRatio;
          }
        }

        // Center overlay text container
        textContainer.x = w / 2;
        textContainer.y = h / 2 - 15;

        // Set responsive fonts & wrap widths
        badgeText.style.fontSize = isMobile ? 12 : 14;

        titleText.style.fontSize = isMobile ? 28 : 50;
        titleText.style.wordWrapWidth = isMobile ? w - 40 : 800;

        subText.style.fontSize = isMobile ? 14 : 18;
        subText.style.wordWrapWidth = isMobile ? w - 40 : 650;

        // Calculate staggered positioning based on dynamic heights
        targetBadgeY = isMobile ? -110 : -140;
        targetTitleY = isMobile ? -75 : -90;
        
        // Wait, to calculate layout properly we force text measurement
        const titleH = titleText.height;
        targetSubY = targetTitleY + (titleH / 2) + (isMobile ? 20 : 30);
        
        const subH = subText.height;
        targetButtonY = targetSubY + (subH / 2) + (isMobile ? 35 : 45);
      };

      // Call layout immediately after text creation
      layoutAll();

      // Hook layout on resize
      resizeHandler = () => {
        layoutAll();
      };
      window.addEventListener('resize', resizeHandler);

      // Make canvas visible and fade out fallback background loader
      setIsReady(true);

      // 11. Animation variables
      let introProgress = 0;
      let floatTime = 0;
      let hoverProgress = 0;

      // Ensure video is playing
      if (videoTex && videoTex.source && videoTex.source.resource) {
        videoTex.source.resource.play().catch(() => {
          // Browser blocked auto-play, wait for interaction
          const resumeOnInteraction = () => {
            if (videoTex && videoTex.source && videoTex.source.resource) {
              videoTex.source.resource.play();
            }
            window.removeEventListener('click', resumeOnInteraction);
            window.removeEventListener('touchstart', resumeOnInteraction);
          };
          window.addEventListener('click', resumeOnInteraction);
          window.addEventListener('touchstart', resumeOnInteraction);
        });
      }

      // 12. Main Ticker loop
      app.ticker.add((ticker) => {
        // A. Intro Staggered Entrance Animation
        if (introProgress < 1) {
          introProgress += (ticker.deltaMS / 1400); // 1.4 seconds duration
          if (introProgress > 1) introProgress = 1;
        }

        const t = 1 - introProgress;
        const ease = 1 - t * t * t; // cubic ease out

        badgeText.alpha = ease;
        titleText.alpha = Math.min(1, Math.max(0, (introProgress - 0.15) / 0.85));
        subText.alpha = Math.min(1, Math.max(0, (introProgress - 0.3) / 0.7));
        buttonContainer.alpha = Math.min(1, Math.max(0, (introProgress - 0.45) / 0.55));

        const yOffset = (1 - ease) * 45;
        badgeText.y = targetBadgeY + yOffset;
        titleText.y = targetTitleY + yOffset * 0.85;
        subText.y = targetSubY + (subText.height / 2) + yOffset * 0.7;
        buttonContainer.y = targetButtonY + yOffset * 0.5;

        // B. Idle Micro-animation (slow wave/hover for entire overlay)
        floatTime += ticker.deltaTime * 0.015;
        const floatOffset = Math.sin(floatTime) * 3.5;
        textContainer.y = (app.screen.height / 2 - 15) + floatOffset;

        // C. Ambient Golden Particles Update
        particles.forEach((p) => {
          p.sprite.y -= p.speedY * ticker.deltaTime;
          p.angle += p.angleSpeed * ticker.deltaTime;
          p.sprite.x += (p.speedX + Math.sin(p.angle) * 0.15) * ticker.deltaTime;
          p.sprite.alpha = p.baseAlpha + Math.sin(p.angle * 2) * 0.06;

          if (p.sprite.y < -20) {
            p.sprite.y = app.screen.height + 20;
            p.sprite.x = Math.random() * app.screen.width;
          }
        });

        // D. Button Hover Lerp
        const lerpSpeed = 0.15 * ticker.deltaTime;
        if (isHovered) {
          hoverProgress += (1 - hoverProgress) * lerpSpeed;
        } else {
          hoverProgress += (0 - hoverProgress) * lerpSpeed;
        }
        btnHoverBg.alpha = hoverProgress;
        
        // Button scale zoom-in effect (from 1.0 to 1.04)
        const currentScale = 1 + hoverProgress * 0.04;
        buttonContainer.scale.set(currentScale);
      });
    }

    initPixi();

    return () => {
      active = false;
      setIsReady(false);
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (appRef.current) {
        appRef.current.destroy(
          { removeView: true, releaseGlobalResources: true },
          { children: true, texture: true, textureSource: true }
        );
        appRef.current = null;
      }
    };
  }, [onExploreClick]);

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Fallback CSS gradient background serving as a beautiful skeleton loading state */}
      <div style={{
        ...styles.fallbackBg,
        opacity: isReady ? 0 : 1
      }} />
    </div>
  );
}

const styles = {
  container: {
    height: '92vh',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0a0d0a' // dark base
  },
  fallbackBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, #b24e2c 0%, #ff8c52 40%, #ffb973 80%, #ebd7bc 100%)',
    transition: 'opacity 1.0s ease-in-out',
    pointerEvents: 'none',
    zIndex: 1
  }
};
