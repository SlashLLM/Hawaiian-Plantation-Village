import React, { useEffect, useRef } from 'react';
import { Application, Container, Graphics, Color } from 'pixi.js';

export default function SugarMakerPixi({
  activeStep,
  heatLevel,
  onProgressUpdate,
  juiceProgress,
  boilProgress,
  spinProgress,
  score,
  setScore
}) {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  // References to Pixi Containers
  const harvestContainerRef = useRef(null);
  const crushContainerRef = useRef(null);
  const boilContainerRef = useRef(null);
  const centrifugeContainerRef = useRef(null);

  // Animation values stored in refs to prevent re-renders
  const stateRef = useRef({
    // Step 1: Harvesting
    stalks: [],
    swipeTrail: null,
    isSwiping: false,
    swipePoints: [],
    leafParticles: [],

    // Step 2: Crushing
    gears: [],
    crankAngle: 0,
    conveyorStalks: [],
    juiceLevel: 0,
    drips: [],

    // Step 3: Boiling
    flames: null,
    boilBubbles: [],
    scumList: [],
    liquidBg: null,
    waveTime: 0,

    // Step 4: Centrifuge
    drum: null,
    spinSpeed: 0,
    crystals: [],
    molassesParticles: []
  });

  useEffect(() => {
    let active = true;

    // Initialize PixiJS Application
    const app = new Application();

    async function initPixi() {
      if (!canvasRef.current) return;

      await app.init({
        width: 700,
        height: 400,
        background: '#f2e5d5', // Muted paper tan
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        antialias: true
      });

      if (!active) {
        app.destroy(true, { children: true, texture: true, textureSource: true });
        return;
      }

      appRef.current = app;
      canvasRef.current.appendChild(app.canvas);
      setupGame();
    }

    initPixi();

    return () => {
      active = false;
      if (appRef.current) {
        appRef.current.destroy(
          { removeView: true, releaseGlobalResources: true },
          { children: true, texture: true, textureSource: true }
        );
        appRef.current = null;
      }
    };
  }, []);

  // Update visible scene when activeStep changes
  useEffect(() => {
    const s1 = harvestContainerRef.current;
    const s2 = crushContainerRef.current;
    const s3 = boilContainerRef.current;
    const s4 = centrifugeContainerRef.current;

    if (s1) s1.visible = activeStep === 0;
    if (s2) s2.visible = activeStep === 1;
    if (s3) s3.visible = activeStep === 2;
    if (s4) s4.visible = activeStep === 3;
  }, [activeStep]);

  // Sync props to internal stateRef
  useEffect(() => {
    stateRef.current.activeStep = activeStep;
    stateRef.current.juiceLevel = juiceProgress;
    stateRef.current.boilProgress = boilProgress;
    stateRef.current.spinProgress = spinProgress;
    stateRef.current.heatLevel = heatLevel;
  }, [activeStep, juiceProgress, boilProgress, spinProgress, heatLevel]);

  // Main setup logic
  const setupGame = () => {
    const app = appRef.current;
    if (!app) return;

    // Create scene containers
    const harvestScene = new Container();
    const crushScene = new Container();
    const boilScene = new Container();
    const centrifugeScene = new Container();

    app.stage.addChild(harvestScene);
    app.stage.addChild(crushScene);
    app.stage.addChild(boilScene);
    app.stage.addChild(centrifugeScene);

    harvestContainerRef.current = harvestScene;
    crushContainerRef.current = crushScene;
    boilContainerRef.current = boilScene;
    centrifugeContainerRef.current = centrifugeScene;

    // Set initial visibilities
    harvestScene.visible = activeStep === 0;
    crushScene.visible = activeStep === 1;
    boilScene.visible = activeStep === 2;
    centrifugeScene.visible = activeStep === 3;

    // Build the stages
    buildHarvestScene(harvestScene);
    buildCrushScene(crushScene);
    buildBoilScene(boilScene);
    buildCentrifugeScene(centrifugeScene);

    // Register single global animation Ticker loop
    app.ticker.add((ticker) => {
      updateGameLoop(ticker);
    });
  };

  // --- STAGE 1: HARVESTING SCENE BUILDER ---
  const buildHarvestScene = (scene) => {
    const ground = new Graphics();
    ground.rect(0, 350, 700, 50).fill(0x3a2512); // brown soil
    scene.addChild(ground);

    const stalks = [];
    const stalkXPositions = [120, 220, 320, 420, 520];

    stalkXPositions.forEach((x, index) => {
      const stalkContainer = new Container();
      stalkContainer.x = x;
      stalkContainer.y = 350;

      // Lower stalk (remains in ground after cut)
      const stalkLower = new Graphics();
      stalkLower.rect(-6, -20, 12, 20).fill(0x768f43).stroke({ width: 2, color: 0x3d511a });
      stalkContainer.addChild(stalkLower);

      // Upper stalk (rotates & falls)
      const stalkUpper = new Container();
      stalkUpper.y = -20; // Pivot is the cut point

      const graphic = new Graphics();
      // Sugarcane joints
      graphic.rect(-6, -110, 12, 110).fill(0x8fae5b).stroke({ width: 2, color: 0x4f6c2f });
      // joint marks
      graphic.rect(-7, -80, 14, 4).fill(0x4f6c2f);
      graphic.rect(-7, -50, 14, 4).fill(0x4f6c2f);
      graphic.rect(-7, -20, 14, 4).fill(0x4f6c2f);

      // Leaves
      graphic.moveTo(0, -110).quadraticCurveTo(-25, -135, -35, -120).stroke({ width: 3, color: 0x4f6c2f });
      graphic.moveTo(0, -110).quadraticCurveTo(25, -135, 35, -120).stroke({ width: 3, color: 0x4f6c2f });
      graphic.moveTo(0, -110).quadraticCurveTo(-10, -145, 0, -155).stroke({ width: 3, color: 0x3d511a });

      stalkUpper.addChild(graphic);
      stalkContainer.addChild(stalkUpper);
      scene.addChild(stalkContainer);

      // Guideline
      const guideline = new Graphics();
      guideline.rect(-20, -25, 40, 10).fill({ color: 0xff3b30, alpha: 0.25 }).stroke({ width: 1.5, color: 0xff3b30 });
      stalkContainer.addChild(guideline);

      stalks.push({
        id: index + 1,
        x: x,
        cutY: 330, // matches 350 - 20
        cut: false,
        upper: stalkUpper,
        guideline: guideline
      });
    });

    stateRef.current.stalks = stalks;

    // Swipe draw graphic
    const trail = new Graphics();
    scene.addChild(trail);
    stateRef.current.swipeTrail = trail;

    // Enable interactive swiping on scene
    scene.eventMode = 'static';
    scene.hitArea = appRef.current.screen;

    scene.on('pointerdown', (e) => {
      stateRef.current.isSwiping = true;
      stateRef.current.swipePoints = [e.global.clone()];
    });

    scene.on('globalpointermove', (e) => {
      if (!stateRef.current.isSwiping) return;

      const points = stateRef.current.swipePoints;
      points.push(e.global.clone());
      if (points.length > 15) points.shift(); // keep it short

      // Check intersections with uncut guidelines
      const prev = points[points.length - 2];
      const curr = points[points.length - 1];

      if (prev && curr) {
        stateRef.current.stalks.forEach((stalk) => {
          if (!stalk.cut) {
            // Check if pointer line crosses the stalk's cut segment
            const crossedX = (prev.x <= stalk.x && curr.x >= stalk.x) || (prev.x >= stalk.x && curr.x <= stalk.x);
            const crossedY = Math.abs(curr.y - stalk.cutY) < 25;

            if (crossedX && crossedY) {
              stalk.cut = true;
              stalk.guideline.visible = false;
              setScore(s => s + 10);
              onProgressUpdate('harvest', 1); // Notify parent of a cut stalk

              // Spawn particles
              spawnLeafParticles(stalk.x, stalk.cutY);
            }
          }
        });
      }
    });

    const stopSwipe = () => {
      stateRef.current.isSwiping = false;
      stateRef.current.swipePoints = [];
    };

    scene.on('pointerup', stopSwipe);
    scene.on('pointerupoutside', stopSwipe);
  };

  const spawnLeafParticles = (x, y) => {
    const scene = harvestContainerRef.current;
    if (!scene) return;

    for (let i = 0; i < 8; i++) {
      const p = new Graphics();
      p.ellipse(0, 0, 8, 4).fill(0x56712b);
      p.x = x;
      p.y = y - 10;
      p.vx = (Math.random() - 0.5) * 6;
      p.vy = -Math.random() * 5 - 3;
      p.vr = (Math.random() - 0.5) * 0.2;
      scene.addChild(p);
      stateRef.current.leafParticles.push(p);
    }
  };

  // --- STAGE 2: CRUSHING SCENE BUILDER ---
  const buildCrushScene = (scene) => {
    // Configure scene interactivity
    scene.eventMode = 'static';
    scene.hitArea = appRef.current.screen;

    // Draw background wooden table / mill deck
    const deck = new Graphics();
    deck.rect(30, 260, 240, 15).fill(0x5c3d24).stroke({ width: 2, color: 0x3d2716 });
    // table legs
    deck.rect(50, 275, 12, 100).fill(0x3d2716);
    deck.rect(210, 275, 12, 100).fill(0x3d2716);
    scene.addChild(deck);

    // Mill Metal Framework (Pillars holding rollers)
    const millFrame = new Graphics();
    // vertical pillars
    millFrame.rect(275, 80, 30, 180).fill(0x42403d).stroke({ width: 3, color: 0x1c1b1a });
    // top crossbar
    millFrame.rect(260, 70, 60, 15).fill(0x524e49).stroke({ width: 2, color: 0x1c1b1a });
    // base block
    millFrame.rect(250, 255, 80, 25).fill(0x33312e).stroke({ width: 3, color: 0x1c1b1a });
    scene.addChild(millFrame);

    // Juice Tub (bucket at bottom) inside canvas
    const juiceTub = new Graphics();
    // Draw wood bucket shape
    juiceTub.rect(265, 290, 50, 50).fill(0x734829).stroke({ width: 3, color: 0x472b17 });
    // metal hoops
    juiceTub.rect(265, 300, 50, 4).fill(0x7c8082);
    juiceTub.rect(265, 330, 50, 4).fill(0x7c8082);
    scene.addChild(juiceTub);

    // Liquid in bucket (we will update this in Ticker loop)
    const juiceLiquid = new Graphics();
    scene.addChild(juiceLiquid);
    stateRef.current.juiceLiquidBucket = juiceLiquid;

    // Rollers gears
    const gear1 = new Graphics();
    const gear2 = new Graphics();
    gear1.x = 290;
    gear1.y = 135;
    gear2.x = 290;
    gear2.y = 215;
    scene.addChild(gear1);
    scene.addChild(gear2);

    stateRef.current.gears = [gear1, gear2];

    const drawRoller = (g, r) => {
      g.clear();
      // Metallic cylinder body (grey circles with bevel highlights)
      g.circle(0, 0, r).fill(0x7d8182).stroke({ width: 4, color: 0x272829 });
      g.circle(0, 0, r - 6).fill(0x56595a);
      g.circle(0, 0, r - 12).fill(0x3b3d3e);
      // Heavy gear teeth (spokes)
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        g.rect(Math.cos(a) * (r - 10) - 5, Math.sin(a) * (r - 10) - 5, 10, 18)
         .rotateTransform(a)
         .fill(0x272829);
        g.resetTransform();
      }
      // center pin
      g.circle(0, 0, 8).fill(0x111212);
    };

    drawRoller(gear1, 40);
    drawRoller(gear2, 40);

    // Crank Flywheel Container
    const flywheel = new Container();
    flywheel.x = 520;
    flywheel.y = 190;
    scene.addChild(flywheel);

    const wheelBg = new Graphics();
    // wooden wheel structure
    wheelBg.circle(0, 0, 70).fill(0xe3b578).stroke({ width: 6, color: 0x73431d });
    wheelBg.circle(0, 0, 56).stroke({ width: 2, color: 0x73431d });
    // draw heavy spoke beams
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      wheelBg.moveTo(0, 0).lineTo(Math.cos(a) * 70, Math.sin(a) * 70).stroke({ width: 5, color: 0x73431d });
    }
    wheelBg.circle(0, 0, 18).fill(0x73431d);
    
    // Polished brass knob handle
    const knob = new Graphics();
    knob.circle(0, -56, 14).fill(0xd49b2a).stroke({ width: 3, color: 0x7a5011 });
    knob.circle(0, -56, 6).fill(0xffffff, 0.4); // light reflection

    flywheel.addChild(wheelBg);
    flywheel.addChild(knob);

    // Rotation instructions / Arrow guide overlay
    const directionGuide = new Graphics();
    directionGuide.circle(520, 190, 84).stroke({ width: 2, color: 0xd49b2a, alpha: 0.5, alignment: 0.5, dash: [6, 6] });
    scene.addChild(directionGuide);

    // Drag-wheel controls
    flywheel.eventMode = 'static';
    flywheel.cursor = 'pointer';

    let dragging = false;
    let startAngle = 0;

    flywheel.on('pointerdown', (e) => {
      dragging = true;
      const local = scene.toLocal(e.global);
      startAngle = Math.atan2(local.y - flywheel.y, local.x - flywheel.x) - stateRef.current.crankAngle;
    });

    flywheel.on('globalpointermove', (e) => {
      if (!dragging) return;
      const local = scene.toLocal(e.global);
      const angle = Math.atan2(local.y - flywheel.y, local.x - flywheel.x);
      const newAngle = angle - startAngle;

      stateRef.current.crankAngle = newAngle;
      flywheel.rotation = newAngle;

      // Rotate rollers
      gear1.rotation = newAngle * 1.5;
      gear2.rotation = -newAngle * 1.5;

      // Extract juice if not full
      if (stateRef.current.juiceLevel < 100) {
        onProgressUpdate('crush', 0.8); // add juice progress
        if (Math.random() < 0.35) {
          spawnJuiceDrip();
        }
      }
    });

    const stopDrag = () => { dragging = false; };
    flywheel.on('pointerup', stopDrag);
    flywheel.on('pointerupoutside', stopDrag);

    // Sugarcane stalks on conveyor (Organic bamboo nodes look)
    const conveyorStalks = [];
    for (let i = 0; i < 4; i++) {
      const stalk = new Container();
      stalk.x = 40 + i * 45;
      stalk.y = 250;

      const g = new Graphics();
      // Draw green bamboo-like stalk segments
      g.rect(0, -6, 80, 12).fill(0x8fae5b).stroke({ width: 1.5, color: 0x4f6c2f });
      // segment nodes
      g.rect(20, -7, 2, 14).fill(0x4f6c2f);
      g.rect(40, -7, 2, 14).fill(0x4f6c2f);
      g.rect(60, -7, 2, 14).fill(0x4f6c2f);
      // leaf nodes
      g.moveTo(20, -6).quadraticCurveTo(15, -15, 8, -12).stroke({ width: 2, color: 0x4f6c2f });

      stalk.addChild(g);
      scene.addChild(stalk);
      conveyorStalks.push(stalk);
    }
    stateRef.current.conveyorStalks = conveyorStalks;
  };

  const spawnJuiceDrip = () => {
    const scene = crushContainerRef.current;
    if (!scene) return;

    const drip = new Graphics();
    drip.ellipse(0, 0, 3, 5).fill(0x356e63); // teal juice
    drip.x = 290 + (Math.random() - 0.5) * 10;
    drip.y = 180;
    drip.vy = 2;
    scene.addChild(drip);
    stateRef.current.drips.push(drip);
  };

  // --- STAGE 3: BOILING SCENE BUILDER ---
  const buildBoilScene = (scene) => {
    // Cooker stand
    const stand = new Graphics();
    stand.rect(170, 240, 360, 40).fill(0x42403d).stroke({ width: 3, color: 0x222120 });
    scene.addChild(stand);

    // Flames graph
    const flames = new Graphics();
    scene.addChild(flames);
    stateRef.current.flames = flames;

    // Copper Vat
    const liquidBg = new Graphics();
    scene.addChild(liquidBg);
    stateRef.current.liquidBg = liquidBg;

    const vatBorder = new Graphics();
    // draw heavy copper tub
    vatBorder.arc(350, 100, 160, 0, Math.PI).stroke({ width: 12, color: 0xbd6d4c });
    vatBorder.moveTo(190, 100).lineTo(510, 100).stroke({ width: 12, color: 0xbd6d4c });
    scene.addChild(vatBorder);

    // Scum bubble floaters (4 clumps, floating on the liquid surface, radius 20, very easy to tap)
    const scumX = [240, 310, 390, 460];
    const scumY = [115, 120, 116, 120];

    scumX.forEach((x, i) => {
      const scum = new Container();
      scum.x = x;
      scum.y = scumY[i];

      const g = new Graphics();
      // Glowing green foam clump shape
      g.circle(0, 0, 20).fill(0xa7c957).stroke({ width: 3, color: 0x386641 });
      // foam speckles and white highlight bubbles
      g.circle(-6, -6, 5).fill(0xffffff, 0.7);
      g.circle(5, 5, 4).fill(0xffffff, 0.4);
      g.circle(-5, 5, 3).fill(0x6a994e);

      scum.addChild(g);
      scum.eventMode = 'static';
      scum.cursor = 'pointer';

      scum.on('pointerdown', () => {
        if (stateRef.current.heatLevel === 0) return; // Burner must be on
        if (scum.alpha > 0) {
          scum.alpha = 0; // Skimmed off
          setScore(s => s + 15);
          onProgressUpdate('boil', 25); // Increment boiling clarity progress by 25% (4 taps total!)
        }
      });

      scene.addChild(scum);
      stateRef.current.scumList.push(scum);
    });
  };

  // --- STAGE 4: CENTRIFUGE SCENE BUILDER ---
  const buildCentrifugeScene = (scene) => {
    // Outer casing
    const casing = new Graphics();
    casing.circle(350, 200, 140).fill(0x403e3a).stroke({ width: 8, color: 0x222120 });
    casing.circle(350, 200, 110).fill(0x8a7f72);
    scene.addChild(casing);

    // Spinning drum Container
    const drum = new Container();
    drum.x = 350;
    drum.y = 200;
    scene.addChild(drum);
    stateRef.current.drum = drum;

    const drumBg = new Graphics();
    drumBg.circle(0, 0, 100).fill(0xe6c79e).stroke({ width: 6, color: 0x8a542b });
    // draw mesh vents
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      drumBg.moveTo(Math.cos(a) * 90, Math.sin(a) * 90)
            .lineTo(Math.cos(a) * 100, Math.sin(a) * 100)
            .stroke({ width: 4, color: 0x8a542b });
    }
    drum.addChild(drumBg);

    // Spin trigger on canvas
    const spinBtn = new Container();
    spinBtn.x = 350;
    spinBtn.y = 200;
    spinBtn.eventMode = 'static';
    spinBtn.cursor = 'pointer';

    const btnGraphic = new Graphics();
    btnGraphic.circle(0, 0, 40).fill(0x356e63).stroke({ width: 4, color: 0xffffff });
    // Text label
    const word = new Graphics();
    word.rect(-20, -6, 40, 12).fill(0xffffff);

    spinBtn.addChild(btnGraphic);
    spinBtn.on('pointerdown', () => {
      stateRef.current.spinSpeed += 0.15; // Accelerate
      setScore(s => s + 5);
      onProgressUpdate('spin', 8); // Increment centrifugation spin progress
      spawnMolassesSpray();
    });

    scene.addChild(spinBtn);

    // Sugar crystals inside drum
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 45 + Math.random() * 40;
      const cry = new Graphics();
      cry.rect(-4, -4, 8, 8).fill(0xfcc858); // sugar yellow crystal
      cry.x = Math.cos(angle) * radius;
      cry.y = Math.sin(angle) * radius;
      cry.alpha = 0; // invisible at start
      drum.addChild(cry);
      stateRef.current.crystals.push(cry);
    }
  };

  const spawnMolassesSpray = () => {
    const scene = centrifugeContainerRef.current;
    if (!scene) return;

    for (let i = 0; i < 6; i++) {
      const p = new Graphics();
      p.circle(0, 0, 3).fill(0x4a2a11); // dark brown molasses
      p.x = 350;
      p.y = 200;
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
      p.vx = Math.cos(angle) * 7;
      p.vy = Math.sin(angle) * 7;
      scene.addChild(p);
      stateRef.current.molassesParticles.push(p);
    }
  };

  // --- TICKER GAME ANIMATION LOOP ---
  const updateGameLoop = (ticker) => {
    const sRef = stateRef.current;
    const currentStep = sRef.activeStep;

    // 1. Stage 1: Harvesting animations
    if (currentStep === 0) {
      // Draw swipe trail
      const trail = sRef.swipeTrail;
      if (trail) {
        trail.clear();
        if (sRef.swipePoints.length > 1) {
          trail.moveTo(sRef.swipePoints[0].x, sRef.swipePoints[0].y);
          for (let i = 1; i < sRef.swipePoints.length; i++) {
            trail.lineTo(sRef.swipePoints[i].x, sRef.swipePoints[i].y);
          }
          trail.stroke({ width: 6, color: 0xff8c00, alpha: 0.8, cap: 'round' });
        }
      }

      // Animate falling stalks
      sRef.stalks.forEach((stalk) => {
        if (stalk.cut && stalk.upper.y < 350) {
          stalk.upper.rotation += 0.06 * ticker.deltaTime;
          stalk.upper.y += 4 * ticker.deltaTime;
          stalk.upper.x -= 2 * ticker.deltaTime;
        }
      });

      // Leaf physics
      sRef.leafParticles.forEach((p, index) => {
        p.x += p.vx * ticker.deltaTime;
        p.y += p.vy * ticker.deltaTime;
        p.vy += 0.2 * ticker.deltaTime; // gravity
        p.rotation += p.vr * ticker.deltaTime;

        if (p.y > 400) {
          p.destroy();
          sRef.leafParticles.splice(index, 1);
        }
      });
    }

    // 2. Stage 2: Crushing animations
    if (currentStep === 1) {
      // Move conveyor stalks matching progress
      sRef.conveyorStalks.forEach((stalk, i) => {
        const offset = i * 45;
        stalk.x = Math.min(210, 40 + offset + (sRef.juiceLevel / 100) * 110);
        // Flatten stalks as they enter rollers (x >= 210)
        if (stalk.x >= 210) {
          stalk.scale.y = 0.25;
          stalk.scale.x = 0.85;
          stalk.tint = 0xebd7bc; // brown-tint squeezed cane
        } else {
          stalk.scale.y = 1.0;
          stalk.scale.x = 1.0;
          stalk.tint = 0xffffff;
        }
      });

      // Juice drips physics
      sRef.drips.forEach((d, index) => {
        d.y += d.vy * ticker.deltaTime;
        d.vy += 0.2 * ticker.deltaTime; // gravity

        // If it lands in the bucket (y >= 300)
        if (d.y >= 300) {
          d.destroy();
          sRef.drips.splice(index, 1);
        }
      });

      // Update liquid level in the bucket
      const liquid = sRef.juiceLiquidBucket;
      if (liquid) {
        liquid.clear();
        // Liquid height grows proportional to juiceProgress (from y=338 to y=294)
        const fillHeight = (sRef.juiceLevel / 100) * 44;
        if (fillHeight > 0) {
          liquid.rect(267, 338 - fillHeight, 46, fillHeight).fill(0x356e63); // teal juice
        }
      }
    }

    // 3. Stage 3: Boiling animations
    if (currentStep === 2) {
      if (sRef.heatLevel > 0) {
        sRef.waveTime += 0.05 * ticker.deltaTime * (sRef.heatLevel * 0.7);
      }

      // Draw liquid filling the pot and wave ripple
      const liquid = sRef.liquidBg;
      if (liquid) {
        liquid.clear();
        // Interpolate color from green-grey (#78856a) to brown-gold (#b8772a) based on boilProgress
        const progressRatio = sRef.boilProgress / 100;
        const colorStart = new Color('#78856a');
        const colorEnd = new Color('#b8772a');
        const r = colorStart.red + (colorEnd.red - colorStart.red) * progressRatio;
        const g = colorStart.green + (colorEnd.green - colorStart.green) * progressRatio;
        const b = colorStart.blue + (colorEnd.blue - colorStart.blue) * progressRatio;
        const activeColor = new Color([r, g, b]);

        liquid.arc(350, 100, 154, 0, Math.PI).fill(activeColor);
        // Wave top surface
        liquid.rect(195, 95, 310, 12).fill(activeColor);
      }

      // Draw burner flames (height and frequency matches heat level)
      const flames = sRef.flames;
      if (flames) {
        flames.clear();
        if (sRef.heatLevel > 0) {
          const baseHeight = sRef.heatLevel * 15;
          for (let i = 0; i < 18; i++) {
            const fx = 180 + i * 19;
            const height = baseHeight + Math.sin(sRef.waveTime * 3.5 + i) * 5 + Math.random() * 7;
            flames.moveTo(fx - 10, 240)
                  .quadraticCurveTo(fx, 240 - height, fx + 10, 240)
                  .fill(0xff6b35);
          }
        }
      }

      // Steam bubbles animation (spawn rate matches heat level)
      if (sRef.heatLevel > 0 && Math.random() < (0.05 * sRef.heatLevel) && sRef.boilBubbles.length < 20) {
        const bubble = new Graphics();
        bubble.circle(0, 0, 2 + Math.random() * 4).fill({ color: 0xffffff, alpha: 0.3 });
        bubble.x = 210 + Math.random() * 280;
        bubble.y = 230;
        bubble.vy = (-0.6 - Math.random() * 1.0) * sRef.heatLevel;
        boilContainerRef.current.addChild(bubble);
        sRef.boilBubbles.push(bubble);
      }

      sRef.boilBubbles.forEach((b, index) => {
        b.y += b.vy * ticker.deltaTime;
        if (b.y < 120) {
          b.destroy();
          sRef.boilBubbles.splice(index, 1);
        }
      });
    }

    // 4. Stage 4: Centrifuging animations
    if (currentStep === 3) {
      const drum = sRef.drum;
      if (drum) {
        // Apply friction decay to speed
        sRef.spinSpeed = Math.max(0, sRef.spinSpeed * 0.98);
        drum.rotation += sRef.spinSpeed * ticker.deltaTime;

        // Fade in sugar crystals proportional to separation progress
        const ratio = sRef.spinProgress / 100;
        sRef.crystals.forEach((c) => {
          c.alpha = ratio;
        });
      }

      // Molasses spray particles physics
      sRef.molassesParticles.forEach((p, index) => {
        p.x += p.vx * ticker.deltaTime;
        p.y += p.vy * ticker.deltaTime;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.alpha -= 0.03 * ticker.deltaTime;

        if (p.alpha <= 0) {
          p.destroy();
          sRef.molassesParticles.splice(index, 1);
        }
      });
    }
  };

  return (
    <div
      ref={canvasRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '3px double var(--koa-wood)',
        borderRadius: '6px',
        backgroundColor: '#ebd7bc',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)',
        margin: '1.5rem auto'
      }}
    />
  );
}
