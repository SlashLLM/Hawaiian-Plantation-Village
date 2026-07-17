import React, { useEffect, useRef } from 'react';
import { Application, Container, Graphics, Text } from 'pixi.js';
import {
  DEFAULT_BANGO_PAIRS,
  DEFAULT_BANGO_TITLE,
} from '../../lib/content/gameChallengeDefaults.js';

const CARD_COLORS = {
  default: 0xebd7bc,
  hover: 0xd4c4a8,
  matched: 0x1b3823,
};

export default function BangoMatchPixi({
  onComplete,
  pairs: pairsProp,
  title: titleProp,
}) {
  const pairs = Array.isArray(pairsProp) && pairsProp.length
    ? pairsProp
    : DEFAULT_BANGO_PAIRS;
  const titleText = titleProp || DEFAULT_BANGO_TITLE;
  const pairsKey = JSON.stringify(pairs);
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const pairsData = JSON.parse(pairsKey);
    let active = true;
    const app = new Application();
    const matchedCountRef = { value: 0 };
    const height = Math.max(400, 55 + pairsData.length * 82 + 20);

    async function initPixi() {
      if (!canvasRef.current) return;

      await app.init({
        width: 700,
        height,
        background: '#f2e5d5',
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        antialias: true,
      });

      if (!active) {
        app.destroy(true, { children: true, texture: true, textureSource: true });
        return;
      }

      appRef.current = app;
      canvasRef.current.appendChild(app.canvas);

      const root = new Container();
      app.stage.addChild(root);

      const title = new Text({
        text: titleText,
        style: {
          fontFamily: 'Courier Prime, monospace',
          fontSize: 14,
          fill: '#4a3728',
          fontWeight: 'bold',
        },
      });
      title.x = 20;
      title.y = 12;
      root.addChild(title);

      const dropZones = [];
      const tagStartY = 55;
      const tagSpacing = 82;

      pairsData.forEach((pair, idx) => {
        const zone = new Container();
        zone.x = 380;
        zone.y = tagStartY + idx * tagSpacing;

        const tagBg = new Graphics();
        tagBg.roundRect(0, 0, 280, 68, 6);
        tagBg.fill({ color: 0xf9f7f2 });
        tagBg.stroke({ color: 0x8b7355, width: 2, dash: [6, 4] });
        zone.addChild(tagBg);

        const tagLabel = new Text({
          text: `BANGO #${pair.number}`,
          style: {
            fontFamily: 'Courier Prime, monospace',
            fontSize: 13,
            fill: '#4a3728',
            fontWeight: 'bold',
          },
        });
        tagLabel.x = 12;
        tagLabel.y = 10;
        zone.addChild(tagLabel);

        const slotHint = new Text({
          text: 'Drop name here',
          style: {
            fontFamily: 'Georgia, serif',
            fontSize: 12,
            fill: '#8b7355',
            fontStyle: 'italic',
          },
        });
        slotHint.x = 12;
        slotHint.y = 34;
        slotHint.label = 'hint';
        zone.addChild(slotHint);

        zone.pairId = pair.id;
        zone.matched = false;
        zone.hitArea = { contains: (x, y) => x >= 0 && x <= 280 && y >= 0 && y <= 68 };
        root.addChild(zone);
        dropZones.push(zone);
      });

      const shuffled = [...pairsData].sort(() => Math.random() - 0.5);

      shuffled.forEach((pair, idx) => {
        const card = new Container();
        card.x = 24;
        card.y = tagStartY + idx * tagSpacing;
        card.pairId = pair.id;
        card.matched = false;
        card.eventMode = 'static';
        card.cursor = 'grab';

        const cardBg = new Graphics();
        cardBg.roundRect(0, 0, 320, 68, 6);
        cardBg.fill({ color: CARD_COLORS.default });
        cardBg.stroke({ color: 0x8b7355, width: 2 });
        card.cardBg = cardBg;
        card.addChild(cardBg);

        const nameText = new Text({
          text: pair.name,
          style: {
            fontFamily: 'Georgia, serif',
            fontSize: 16,
            fill: '#4a3728',
            fontWeight: 'bold',
          },
        });
        nameText.x = 14;
        nameText.y = 12;
        card.addChild(nameText);

        const originText = new Text({
          text: pair.origin,
          style: {
            fontFamily: 'Courier Prime, monospace',
            fontSize: 11,
            fill: '#6b5344',
          },
        });
        originText.x = 14;
        originText.y = 38;
        card.addChild(originText);

        card.dragOffset = { x: 0, y: 0 };
        card.homePosition = { x: card.x, y: card.y };
        card.zIndex = 1;

        card.on('pointerdown', (event) => {
          if (card.matched) return;
          card.cursor = 'grabbing';
          card.zIndex = 10;
          card.dragOffset.x = card.x - event.global.x;
          card.dragOffset.y = card.y - event.global.y;
          card.dragging = true;
        });

        card.on('pointerup', () => {
          if (card.matched || !card.dragging) return;
          card.dragging = false;
          card.cursor = 'grab';
          card.zIndex = 1;

          const cardCenterX = card.x + 160;
          const cardCenterY = card.y + 34;

          let snapped = false;
          for (const zone of dropZones) {
            if (zone.matched) continue;

            const zoneGlobal = zone.getGlobalPosition();
            const localX = cardCenterX - zoneGlobal.x;
            const localY = cardCenterY - zoneGlobal.y;

            if (localX >= 0 && localX <= 280 && localY >= 0 && localY <= 68) {
              if (zone.pairId === card.pairId) {
                zone.matched = true;
                card.matched = true;
                card.eventMode = 'none';
                card.cursor = 'default';

                card.x = zone.x + 80;
                card.y = zone.y + 8;
                card.cardBg.clear();
                card.cardBg.roundRect(0, 0, 200, 52, 6);
                card.cardBg.fill({ color: CARD_COLORS.matched });
                card.cardBg.stroke({ color: 0x1b3823, width: 2 });
                nameText.style.fill = '#f9f7f2';
                originText.style.fill = '#c8dcc8';

                const hint = zone.children.find((c) => c.label === 'hint');
                if (hint) hint.visible = false;

                const matchedLabel = new Text({
                  text: `${pair.name} — ${pair.origin}`,
                  style: {
                    fontFamily: 'Georgia, serif',
                    fontSize: 13,
                    fill: '#1b3823',
                    fontWeight: 'bold',
                  },
                });
                matchedLabel.x = 12;
                matchedLabel.y = 34;
                zone.addChild(matchedLabel);

                matchedCountRef.value += 1;
                if (matchedCountRef.value === pairsData.length) {
                  onCompleteRef.current?.();
                }
                snapped = true;
                break;
              } else {
                card.x = card.homePosition.x;
                card.y = card.homePosition.y;
                snapped = true;
                break;
              }
            }
          }

          if (!snapped) {
            card.x = card.homePosition.x;
            card.y = card.homePosition.y;
          }
        });

        card.on('pointerupoutside', () => {
          if (card.matched) return;
          card.dragging = false;
          card.cursor = 'grab';
          card.zIndex = 1;
          card.x = card.homePosition.x;
          card.y = card.homePosition.y;
        });

        card.on('globalpointermove', (event) => {
          if (!card.dragging || card.matched) return;
          card.x = event.global.x + card.dragOffset.x;
          card.y = event.global.y + card.dragOffset.y;
        });

        root.addChild(card);
      });

      root.sortableChildren = true;
    }

    initPixi();

    return () => {
      active = false;
      if (appRef.current) {
        appRef.current.destroy(
          { removeView: true, releaseGlobalResources: true },
          { children: true, texture: true, textureSource: true },
        );
        appRef.current = null;
      }
    };
  }, [pairsKey, titleText]);

  return (
    <div style={styles.wrapper}>
      <div ref={canvasRef} style={styles.canvasHost} />
      <p style={styles.hint}>Drag each worker name card to the matching bango tag number.</p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  canvasHost: {
    border: '2px dashed var(--kraft-tan-dark)',
    borderRadius: '4px',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  hint: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    margin: 0,
    textAlign: 'center',
  },
};
