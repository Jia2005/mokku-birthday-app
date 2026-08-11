import React, { useEffect, useMemo, useState, useRef } from "react";
import { Heart, Sparkles, ArrowRight, ArrowLeft, Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Bday from "./bday.mp4";
import Song from "./song.mp3";

const BIRTHDAY_NAME = "Pallavi";
const VIDEO_SRC = Bday;
const SONG_SRC = Song;
const SONG_TITLE = "Love you Mokku";

const CARD_MESSAGE = {
  heading: "Happy Birthday!",
  body:
    "Surprise! I wanted to make something as one-of-a-kind as you are. Today isn't just about cake and candles, it's about celebrating the day the world got a little brighter, a little louder and a lot more fun, cause of ANGEL like you 😘😘.",
};

const LETTERS = [
  {
    name: "Joy",
    message:
      "Pallu di~~ Happiest Birthday to you🍀.. I love you 🫂. Thank you for everything 🍀💗",
  },
  {
    name: "Namnam",
    message:
      "May this year be yours ...Stay like you are always ✨ amazing, gorgeous, hardworking and kind ... love ya 💖",
  },
  {
    name: "Palm",
    message:
      "Happy birthday hope you be loved like this every second and achieve all you want in your life...best wishes from me!!! 💐🌟😋",
  },
  {
    name: "Petrol",
    message:
      "Phi mokh happy birthday may all your wishes come true and u are with us for many days i like to tease u to hehe",
  },
  {
    name: "Tuti",
    message:
      "Wishing you a year filled with endless joy, laughter, and incredible success🍀May every moment of your special day be as bright and wonderful as you are✨",
  },
  {
    name: "Bubbie",
    message:
      "Happy birthday maee💕 May u have the happiest day like u make me happy. I wish mae a long life (with me ofc😌🤭). Love you na khaa maee just be happy naa🤭 Bubi misses u",
  },
  {
    name: "Phuphu",
    message:
      "Many many happy returns of the day bacha (aka grannie). Enjoy ur day to the fullest and may all ur dreams come true. Love you 💖",
  },
  {
    name: "Boomieeee",
    message:
      "Happy birthday mummaa..... stay happy and healthy always ur the best mother I got....I really love u as my mother... enjoy ur day and be happy forever 💝🫂🫶🏻",
  },
  {
    name: "Wesluu",
    message:
      "Happy birthday mumma hope you have the best day ever love you so is much thank you so much for making me part of your life 💖💖",
  },
  {
    name: "Paa Wolfe",
    message:
      "Keep smiling and shining, baby papa will always be here for you, through everything, always. ❤️",
  },
  {
    name: "Darling Rome",
    message:
      "Happy Birthday, my dearest Piyu! 🎂❤️ May your smile never fade, your heart always stay happy, and every dream you hold come true. 🎉🌹",
  },
];

const COLORS = {
  bgTop: "#fff3f6",
  bgBottom: "#ffe1ea",
  ink: "#4a2e39",
  inkSoft: "#8a6572",
  rose: "#ff7ca3",
  roseDeep: "#f2436d",
  chocoDark: "#3c2415",
  chocoMid: "#6b3f2a",
  chocoLight: "#a9714c",
  chocoCream: "#e8c9a6",
  gold: "#f4b942",
  card: "#ffffff",
};

const STEPS = ["video", "gift", "card", "letters", "closing"];

const CLOSING_MESSAGE = {
  heading: "One Last Thing...",
  body:
    "I hope today feels exactly as special as you are. Full of laughter, love and a little bit of magic. Here's to another year of chasing big dreams and small joys. Here's to many, many more birthdays where we get to celebrate you, together🫂🫂",
  signoff: "With all my love 💕💕",
};

function useStaggeredReveal(delays) {
  const [flags, setFlags] = useState(() => delays.map(() => false));
  useEffect(() => {
    const timers = delays.map((d, i) =>
      setTimeout(() => setFlags((f) => f.map((v, j) => (j === i ? true : v))), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line
  return flags;
}

function Confetti({ pieces = 36 }) {
  const items = useMemo(
    () =>
      Array.from({ length: pieces }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1.1,
        size: 6 + Math.random() * 7,
        rotate: Math.random() * 360,
        color: [COLORS.rose, COLORS.roseDeep, COLORS.gold, COLORS.chocoLight, "#ffffff"][
          i % 5
        ],
        drift: (Math.random() - 0.5) * 120,
      })),
    [pieces]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-10%",
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingBits() {
  const bits = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        size: 10 + Math.random() * 14,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 6,
        heart: i % 2 === 0,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            bottom: "-10%",
            opacity: 0.16,
            animation: `floatUp ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          {b.heart ? (
            <Heart size={b.size} color={COLORS.roseDeep} fill={COLORS.roseDeep} />
          ) : (
            <Sparkles size={b.size} color={COLORS.gold} />
          )}
        </div>
      ))}
    </div>
  );
}

function ProgressDots({ step, onJump }) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full"
      style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(6px)" }}>
      {STEPS.map((s, i) => (
        <button
          key={s}
          aria-label={`Go to ${s}`}
          onClick={() => i <= step && onJump(i)}
          style={{
            width: i === step ? 20 : 8,
            height: 8,
            borderRadius: 999,
            transition: "all 0.35s ease",
            backgroundColor: i <= step ? COLORS.roseDeep : "#f2c9d5",
            cursor: i <= step ? "pointer" : "default",
          }}
        />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------
   MUSIC PLAYER — now a "dumb" display component. The actual <audio>
   element and playback state live in the root component so a single
   button (the video's play overlay) can start both video + song
   together as one real user gesture (required by browser autoplay
   policies).
------------------------------------------------------------------------- */

function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <div
      className="fixed bottom-5 left-4 sm:left-5 z-50 flex items-center gap-2 pr-4 pl-2.5 py-2 rounded-full"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 22px rgba(74,46,57,0.16)",
        border: "1px solid rgba(255,124,163,0.25)",
        maxWidth: 190,
      }}
    >
      <button
        onClick={onToggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 32,
          height: 32,
          background: `linear-gradient(135deg, ${COLORS.roseDeep}, ${COLORS.rose})`,
          color: "#fff",
        }}
      >
        {isPlaying ? <Pause size={14} fill="#fff" /> : <Play size={14} fill="#fff" style={{ marginLeft: 1 }} />}
      </button>

      <div className="min-w-0 flex flex-col leading-tight">
        <span
          className="flex items-center gap-1 truncate"
          style={{ color: COLORS.ink, fontFamily: "Quicksand, sans-serif", fontWeight: 700, fontSize: 12.5 }}
        >
          <Music2
            size={11}
            color={COLORS.roseDeep}
            style={{
              animation: isPlaying ? "spin 3.2s linear infinite" : "none",
              flexShrink: 0,
            }}
          />
          <span className="truncate">{SONG_TITLE}</span>
        </span>
        <span style={{ color: COLORS.inkSoft, fontFamily: "Quicksand, sans-serif", fontSize: 10.5 }}>
          {isPlaying ? "now playing" : "paused"}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   THREE.JS MODULE CACHE — a single shared promise so every call to
   `loadThree()` (the root warm-up on mount, and ThreeStage later)
   reuses the exact same in-flight/resolved import instead of
   triggering a second network fetch.
------------------------------------------------------------------------- */

let threeModulePromise = null;
function loadThree() {
  if (!threeModulePromise) {
    threeModulePromise = import("three");
  }
  return threeModulePromise;
}

/* ----------------------------------------------------------------------
   3D STAGE — a small shared Three.js harness used by the gift box.
   Handles renderer/camera/lights/shadows/resize/drag-to-rotate/cleanup
   so the scene only has to build + animate its meshes.
------------------------------------------------------------------------- */

function disposeMaterial(mat) {
  if (!mat) return;
  ["map", "normalMap", "roughnessMap", "metalnessMap", "alphaMap", "emissiveMap"].forEach(
    (k) => mat[k] && mat[k].dispose && mat[k].dispose()
  );
  mat.dispose && mat.dispose();
}

function disposeObject3D(obj) {
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach(disposeMaterial);
      else disposeMaterial(child.material);
    }
  });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function clamp01(t) {
  return Math.max(0, Math.min(1, t));
}

function ThreeStage({
  height = 380,
  cameraDist = 6.4,
  cameraY = 2.5,
  cameraTarget = [0, 1.3, 0],
  fov = 36,
  buildScene,
  onFrame,
  refsRef,
}) {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let THREE;
    let renderer, scene, camera, raf, resizeObserver;
    let cancelled = false;

    loadThree().then((mod) => {
      if (cancelled) return;
      THREE = mod;
      const mount = mountRef.current;
      if (!mount) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.touchAction = "none";
      mount.appendChild(renderer.domElement);

      const hemi = new THREE.HemisphereLight(0xfff3f6, 0x3c2415, 0.7);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xfff3e0, 1.05);
      key.position.set(3.2, 6, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      const sSize = 5;
      key.shadow.camera.left = -sSize;
      key.shadow.camera.right = sSize;
      key.shadow.camera.top = sSize;
      key.shadow.camera.bottom = -sSize;
      key.shadow.camera.near = 0.5;
      key.shadow.camera.far = 20;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffe1ea, 0.35);
      fill.position.set(-4, 3, -2);
      scene.add(fill);

      const groundGeo = new THREE.PlaneGeometry(24, 24);
      const groundMat = new THREE.ShadowMaterial({ opacity: 0.2 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const refs = refsRef.current;
      const ctx = { scene, camera, renderer, THREE, refs };
      buildScene && buildScene(ctx);

      let azimuth = 0.4;
      let dragging = false;
      let lastX = 0;
      let dragVel = 0;

      const setCamera = () => {
        camera.position.set(
          cameraTarget[0] + cameraDist * Math.sin(azimuth),
          cameraY,
          cameraTarget[2] + cameraDist * Math.cos(azimuth)
        );
        camera.lookAt(cameraTarget[0], cameraTarget[1], cameraTarget[2]);
      };
      setCamera();

      const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
      const onDown = (e) => {
        dragging = true;
        lastX = getX(e);
      };
      const onMove = (e) => {
        if (!dragging) return;
        const x = getX(e);
        const dx = x - lastX;
        lastX = x;
        azimuth -= dx * 0.006;
        dragVel = -dx * 0.006;
      };
      const onUp = () => {
        dragging = false;
      };
      renderer.domElement.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      let elapsed = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const delta = Math.min(clock.getDelta(), 0.05);
        elapsed += delta;
        if (!dragging) {
          azimuth += delta * 0.14;
        } else {
          azimuth += 0;
        }
        if (!dragging && Math.abs(dragVel) > 0.0001) dragVel *= 0.9;
        setCamera();
        onFrame && onFrame({ ...ctx, t: elapsed, delta, azimuth });
        renderer.render(scene, camera);
      };
      animate();

      mount.__cleanup = () => {
        cancelAnimationFrame(raf);
        resizeObserver && resizeObserver.disconnect();
        renderer.domElement.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        disposeObject3D(scene);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };

      setReady(true);
    });

    return () => {
      cancelled = true;
      const mount = mountRef.current;
      if (mount && mount.__cleanup) mount.__cleanup();
    };
  }, []); // eslint-disable-line

  return (
    <div ref={mountRef} style={{ width: "100%", height, position: "relative" }}>
      {!ready && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          <Sparkles
            size={30}
            color={COLORS.gold}
            style={{ animation: "spin 1.3s linear infinite", opacity: 0.8 }}
          />
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------
   SCENE 1 — the video.
   Shows a play button overlay before playback starts. Clicking it
   plays the video AND signals the root component to start the song —
   both fire from the same real click, so browser autoplay policies
   allow both without any extra taps.
------------------------------------------------------------------------- */

function VideoScene({ onContinue, onStart, started }) {
  const cta = useStaggeredReveal([600])[0];
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // The video itself is always muted — the background song is the
    // only audio source.
    v.muted = true;
    v.volume = 0;
  }, []);

  const handleStart = () => {
    if (started) return;
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
    onStart();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-14 overflow-hidden">
      <FloatingBits />
      <p
        className="mb-2 tracking-[0.3em] uppercase text-xs sm:text-sm"
        style={{ color: COLORS.rose, fontFamily: "Quicksand, sans-serif", fontWeight: 700 }}
      >
        for {BIRTHDAY_NAME}
      </p>
      <h1
        className="text-center mb-2 text-3xl sm:text-5xl"
        style={{ color: COLORS.ink, fontFamily: "Fredoka, sans-serif", fontWeight: 600 }}
      >
        A little something to watch...
      </h1>
      <p
        className="text-center mb-5 text-xs sm:text-sm"
        style={{ color: COLORS.inkSoft, fontFamily: "Quicksand, sans-serif" }}
      >
        &nbsp;
      </p>

      <div
        className="relative w-full"
        style={{
          maxWidth: 640,
          aspectRatio: "16 / 9",
          borderRadius: 20,
          overflow: "hidden",
          background: COLORS.chocoDark,
          boxShadow: "0 24px 50px rgba(74,46,57,0.28)",
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {!started && (
          <button
            onClick={handleStart}
            aria-label="Play video and music"
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)", cursor: "pointer" }}
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 78,
                height: 78,
                background: `linear-gradient(135deg, ${COLORS.roseDeep}, ${COLORS.rose})`,
                boxShadow: "0 10px 30px rgba(242,67,109,0.45)",
                animation: "pulse 1.8s ease-in-out infinite",
              }}
            >
              <Play size={30} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
            </span>
          </button>
        )}
      </div>

      <button
        onClick={onContinue}
        className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm sm:text-base"
        style={{
          fontFamily: "Quicksand, sans-serif",
          fontWeight: 700,
          color: "#fff",
          background: `linear-gradient(135deg, ${COLORS.roseDeep}, ${COLORS.rose})`,
          boxShadow: "0 10px 20px rgba(242,67,109,0.35)",
          opacity: cta ? 1 : 0,
          transform: cta ? "translateY(0)" : "translateY(10px)",
          pointerEvents: cta ? "auto" : "none",
          transition: "all 0.6s ease",
        }}
      >
        Continue <ArrowRight size={18} />
      </button>
    </div>
  );
}

function buildGiftScene({ scene, THREE, refs }) {
  const plateGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.14, 40);
  const plateMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3, clearcoat: 0.5 });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = 0.07;
  plate.receiveShadow = true;
  scene.add(plate);

  const boxGroup = new THREE.Group();
  boxGroup.position.y = 0.14;
  scene.add(boxGroup);

  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xf4b942, roughness: 0.4, clearcoat: 0.45 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.15, 1.7), bodyMat);
  body.position.y = 0.575;
  body.castShadow = true;
  body.receiveShadow = true;
  boxGroup.add(body);

  const ribbonMat = new THREE.MeshPhysicalMaterial({ color: 0xf2436d, roughness: 0.28, clearcoat: 0.7 });
  const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.17, 1.74), ribbonMat);
  ribbonV.position.y = 0.575;
  ribbonV.castShadow = true;
  boxGroup.add(ribbonV);
  const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(1.74, 1.17, 0.3), ribbonMat);
  ribbonH.position.y = 0.575;
  ribbonH.castShadow = true;
  boxGroup.add(ribbonH);

  // lid group (animates open)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 1.15, 0);
  boxGroup.add(lidGroup);

  const lid = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.32, 1.82), bodyMat);
  lid.position.y = 0.16;
  lid.castShadow = true;
  lidGroup.add(lid);
  const lidRibbonV = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.34, 1.86), ribbonMat);
  lidRibbonV.position.y = 0.16;
  lidGroup.add(lidRibbonV);
  const lidRibbonH = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.34, 0.32), ribbonMat);
  lidRibbonH.position.y = 0.16;
  lidGroup.add(lidRibbonH);

  // bow
  const bowGroup = new THREE.Group();
  bowGroup.position.y = 0.36;
  const loopGeo = new THREE.TorusGeometry(0.26, 0.09, 10, 20);
  const loopL = new THREE.Mesh(loopGeo, ribbonMat);
  loopL.position.set(-0.2, 0, 0);
  loopL.rotation.x = Math.PI / 2;
  loopL.rotation.z = 0.6;
  loopL.castShadow = true;
  bowGroup.add(loopL);
  const loopR = new THREE.Mesh(loopGeo, ribbonMat);
  loopR.position.set(0.2, 0, 0);
  loopR.rotation.x = Math.PI / 2;
  loopR.rotation.z = -0.6;
  loopR.castShadow = true;
  bowGroup.add(loopR);
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), ribbonMat);
  knot.castShadow = true;
  bowGroup.add(knot);
  lidGroup.add(bowGroup);

  refs.lidGroup = lidGroup;
  refs.boxGroup = boxGroup;

  // confetti pool
  const colors = [COLORS.rose, COLORS.roseDeep, COLORS.gold, "#a9714c", "#ffffff"];
  const confetti = [];
  for (let i = 0; i < 26; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors[i % colors.length]),
      roughness: 0.6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.09), mat);
    mesh.visible = false;
    mesh.castShadow = false;
    scene.add(mesh);
    confetti.push({
      mesh,
      vel: new THREE.Vector3(),
      active: false,
      spin: Math.random() * 6,
    });
  }
  refs.confetti = confetti;
  refs.confettiSpawned = false;
}

function frameGiftScene({ refs, t, delta, THREE }) {
  const opened = refs.opened;
  const openT = refs.openStartT ?? null;

  if (refs.lidGroup) {
    const local = openT != null ? clamp01((t - openT) / 0.85) : 0;
    const e = easeOutCubic(local);
    refs.lidGroup.position.y = 1.15 + e * 1.5;
    refs.lidGroup.rotation.x = -e * 1.1;
    refs.lidGroup.rotation.z = e * 0.35;
  }

  const idleBob = Math.sin(t * 1.4) * 0.02;
  if (refs.boxGroup && !opened) refs.boxGroup.position.y = 0.14 + idleBob;
  else if (refs.boxGroup) refs.boxGroup.position.y = 0.14;

  if (opened && openT != null && !refs.confettiSpawned && t - openT > 0.35) {
    refs.confettiSpawned = true;
    refs.confetti.forEach((p) => {
      p.mesh.position.set((Math.random() - 0.5) * 0.4, 1.6, (Math.random() - 0.5) * 0.4);
      p.mesh.material.opacity = 1;
      p.mesh.visible = true;
      p.active = true;
      p.age = 0;
      p.vel.set((Math.random() - 0.5) * 2.4, 2.2 + Math.random() * 1.6, (Math.random() - 0.5) * 2.4);
    });
  }

  refs.confetti?.forEach((p) => {
    if (!p.active) return;
    p.age += delta;
    p.vel.y -= 4.2 * delta;
    p.mesh.position.addScaledVector(p.vel, delta);
    p.mesh.rotation.x += p.spin * delta;
    p.mesh.rotation.y += p.spin * 0.7 * delta;
    if (p.age > 1.0) {
      p.mesh.material.opacity = Math.max(0, 1 - (p.age - 1.0) / 0.6);
    }
    if (p.age > 1.7) {
      p.active = false;
      p.mesh.visible = false;
    }
  });
}

function GiftScene({ onContinue }) {
  const refsRef = useRef({});
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    const refs = refsRef.current;
    refs.opened = true;
    refs.openStartT = refs.__lastT ?? 0;
    setTimeout(() => onContinue(), 2100);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-14 overflow-hidden">
      <FloatingBits />
      <h2
        className="text-center mb-1 text-3xl sm:text-5xl"
        style={{ color: COLORS.rose, fontFamily: "Fredoka, sans-serif", fontWeight: 600 }}
      >
        A little gift for you...
      </h2>
      <p
        className="text-center mb-2 text-xs sm:text-sm"
        style={{ color: COLORS.inkSoft, fontFamily: "Quicksand, sans-serif" }}
      >
        drag to spin • tap the box to open
      </p>

      <div
        onClick={handleOpen}
        role="button"
        aria-label="Open gift"
        style={{ width: "min(85vw, 380px)", cursor: opened ? "default" : "pointer" }}
      >
        <ThreeStage
          height={340}
          cameraDist={5.4}
          cameraY={2.1}
          cameraTarget={[0, 0.9, 0]}
          fov={34}
          refsRef={refsRef}
          buildScene={buildGiftScene}
          onFrame={(ctx) => {
            refsRef.current.__lastT = ctx.t;
            frameGiftScene(ctx);
          }}
        />
      </div>

      <p
        className="mt-2 text-base sm:text-lg"
        style={{
          color: COLORS.inkSoft,
          fontFamily: "Quicksand, sans-serif",
          fontWeight: 600,
          animation: opened ? "none" : "pulse 1.8s ease-in-out infinite",
        }}
      >
        {opened ? "Opening..." : "Click the box to open it!"}
      </p>
    </div>
  );
}

function CardScene({ onContinue }) {
  const reveal = useStaggeredReveal([100]);
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden">
      <FloatingBits />
      <div
        className="w-full max-w-md rounded-3xl px-7 sm:px-10 py-10 sm:py-12 text-center"
        style={{
          background: COLORS.card,
          boxShadow: "0 24px 50px rgba(74,46,57,0.18)",
          opacity: reveal[0] ? 1 : 0,
          transform: reveal[0] ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          transition: "all 0.7s cubic-bezier(.34,1.2,.64,1)",
        }}
      >
        <h2
          className="text-3xl sm:text-4xl mb-5"
          style={{ color: COLORS.rose, fontFamily: "Fredoka, sans-serif", fontWeight: 600 }}
        >
          {CARD_MESSAGE.heading} 🎂
        </h2>
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: COLORS.ink, fontFamily: "Quicksand, sans-serif", fontWeight: 500 }}
        >
          {CARD_MESSAGE.body}
        </p>
        <button
          onClick={onContinue}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base"
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: 700,
            color: "#fff",
            background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.roseDeep})`,
            boxShadow: "0 10px 20px rgba(242,67,109,0.3)",
          }}
        >
          Read more... <Sparkles size={16} />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   SCENE 4 — letters
------------------------------------------------------------------------- */

function LetterCard({ letter, index }) {
  const [flipped, setFlipped] = useState(false);
  const reveal = useStaggeredReveal([120 + index * 90]);

  return (
    <div
      style={{
        opacity: reveal[0] ? 1 : 0,
        transform: reveal[0] ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.6s ease",
        perspective: 1000,
      }}
      className="h-40 sm:h-44"
    >
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full h-full text-left"
        style={{ position: "relative", transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(.4,.2,.2,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        aria-label={`Toggle letter from ${letter.name}`}
      >
        {/* front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 px-4"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.roseDeep})`,
            boxShadow: "0 10px 20px rgba(242,67,109,0.25)",
          }}
        >
          <Heart size={22} color="#fff" fill="#fff" />
          <span style={{ color: "#fff", fontFamily: "Fredoka, sans-serif", fontWeight: 600, fontSize: 17 }}>
            {letter.name}
          </span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Quicksand, sans-serif", fontSize: 12 }}>
            tap to read
          </span>
        </div>
        {/* back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-center px-5 py-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: COLORS.card,
            boxShadow: "0 10px 20px rgba(74,46,57,0.15)",
            border: `1px solid #f6dbe3`,
          }}
        >
          <p style={{ color: COLORS.ink, fontFamily: "Quicksand, sans-serif", fontSize: 13.5, lineHeight: 1.5 }}>
            {letter.message}
          </p>
          <span style={{ marginTop: 8, color: COLORS.roseDeep, fontFamily: "Quicksand, sans-serif", fontWeight: 700, fontSize: 12.5 }}>
            — {letter.name}
          </span>
        </div>
      </button>
    </div>
  );
}

function LettersScene({ onContinue }) {
  const reveal = useStaggeredReveal([80]);
  return (
    <div className="relative min-h-screen px-6 py-16 sm:py-20 overflow-hidden">
      <FloatingBits />
      <div className="max-w-4xl mx-auto text-center mb-10">
        <p
          className="tracking-[0.3em] uppercase text-xs sm:text-sm mb-2"
          style={{ color: COLORS.rose, fontFamily: "Quicksand, sans-serif", fontWeight: 700 }}
        >
          from the people who love you
        </p>
        <h2
          className="text-3xl sm:text-5xl mb-3"
          style={{ color: COLORS.ink, fontFamily: "Fredoka, sans-serif", fontWeight: 600 }}
        >
          A few little letters
        </h2>
        <p style={{ color: COLORS.inkSoft, fontFamily: "Quicksand, sans-serif", fontWeight: 500 }}>
          Tap a card to flip it open.
        </p>
      </div>

      <div
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        style={{ opacity: reveal[0] ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {LETTERS.map((letter, i) => (
          <LetterCard key={letter.name} letter={letter} index={i} />
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm"
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: 700,
            color: "#fff",
            background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.roseDeep})`,
            boxShadow: "0 10px 20px rgba(242,67,109,0.3)",
          }}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ClosingScene({ onRestart }) {
  const reveal = useStaggeredReveal([100]);
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden">
      <FloatingBits />
      <Confetti pieces={26} />
      <div
        className="w-full max-w-md rounded-3xl px-7 sm:px-10 py-10 sm:py-12 text-center"
        style={{
          background: COLORS.card,
          boxShadow: "0 24px 50px rgba(74,46,57,0.18)",
          opacity: reveal[0] ? 1 : 0,
          transform: reveal[0] ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          transition: "all 0.7s cubic-bezier(.34,1.2,.64,1)",
        }}
      >
        <div className="flex justify-center mb-4">
          <Heart size={32} color={COLORS.roseDeep} fill={COLORS.roseDeep} />
        </div>
        <h2
          className="text-3xl sm:text-4xl mb-5"
          style={{ color: COLORS.rose, fontFamily: "Fredoka, sans-serif", fontWeight: 600 }}
        >
          {CLOSING_MESSAGE.heading}
        </h2>
        <p
          className="text-base sm:text-lg leading-relaxed mb-6"
          style={{ color: COLORS.ink, fontFamily: "Quicksand, sans-serif", fontWeight: 500 }}
        >
          {CLOSING_MESSAGE.body}
        </p>
        <p
          className="text-sm sm:text-base mb-8"
          style={{ color: COLORS.inkSoft, fontFamily: "Quicksand, sans-serif", fontWeight: 600, fontStyle: "italic" }}
        >
          {CLOSING_MESSAGE.signoff}
        </p>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base"
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: 700,
            color: COLORS.roseDeep,
            background: "#ffffff",
            border: `2px solid ${COLORS.rose}`,
          }}
        >
          <ArrowLeft size={16} /> restart the journey
        </button>
      </div>
    </div>
  );
}

export default function BirthdayExperience() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  // ---- Preload warm-ups: fire the moment the app mounts, so both the
  // video file and the Three.js module (used by the gift box scene)
  // are already downloading while the visitor is still watching the
  // intro video / reading the intro text — instead of only starting
  // once they click "Continue" and hit a blank/frozen gift box.
  useEffect(() => {
    // 1. Hint the browser to start fetching the video immediately.
    const videoLink = document.createElement("link");
    videoLink.rel = "preload";
    videoLink.as = "video";
    videoLink.href = VIDEO_SRC;
    document.head.appendChild(videoLink);

    // 2. Hint the browser to start fetching the song too, since it's
    // needed as soon as the user taps play on the video.
    const audioLink = document.createElement("link");
    audioLink.rel = "preload";
    audioLink.as = "audio";
    audioLink.href = SONG_SRC;
    document.head.appendChild(audioLink);

    // 3. Kick off the Three.js module download early. ThreeStage calls
    // the same loadThree() helper later, so it reuses this fetch
    // instead of starting a fresh one when the gift box mounts.
    loadThree();

    return () => {
      document.head.removeChild(videoLink);
      document.head.removeChild(audioLink);
    };
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const goTo = (i) => setStep(Math.max(0, Math.min(STEPS.length - 1, i)));

  const handleStart = () => {
    setStarted(true);
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleRestart = () => {
    goTo(0);
    setStarted(false);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: `linear-gradient(180deg, ${COLORS.bgTop}, ${COLORS.bgBottom})`,
        fontFamily: "Quicksand, sans-serif",
      }}
    >
      <audio ref={audioRef} src={SONG_SRC} loop preload="auto" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.16; }
          90% { opacity: 0.16; }
          100% { transform: translateY(-115vh) translateX(20px); opacity: 0; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--drift)) rotate(320deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {step === 0 && <VideoScene onContinue={() => goTo(1)} onStart={handleStart} started={started} />}
      {step === 1 && <GiftScene onContinue={() => goTo(2)} />}
      {step === 2 && <CardScene onContinue={() => goTo(3)} />}
      {step === 3 && <LettersScene onContinue={() => goTo(4)} />}
      {step === 4 && <ClosingScene onRestart={handleRestart} />}

      <ProgressDots step={step} onJump={goTo} />
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
    </div>
  );
}