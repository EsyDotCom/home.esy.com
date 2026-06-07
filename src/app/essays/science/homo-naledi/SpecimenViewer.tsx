'use client';

import React, { Suspense, useRef, useState, useEffect, useCallback, Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { EsyLoader } from '@/components/EsyLoader';

const BONE_IVORY = '#E8DCC8';
const SIGNAL_AMBER = '#C4893A';
const CAVE_CHARCOAL = '#1A1C22';

class GLBErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.hasError ? null : this.props.children; }
}

interface SpecimenViewerProps {
  meshUrl: string;
  fallbackImage: string;
  fallbackAlt: string;
  fallbackCaption: string;
  label: string;
  autoRotate?: boolean;
}

function devProxyUrl(url: string): string {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return url.replace('https://images.esy.com/', '/cdn-proxy/');
  }
  return url;
}

function Specimen({ url, onLoaded }: { url: string; onLoaded?: () => void }) {
  const gltf = useGLTF(devProxyUrl(url));
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const scene = gltf.scene;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(BONE_IVORY),
          roughness: 0.7,
          metalness: 0.05,
        });
      }
    });

    scene.scale.setScalar(1);
    scene.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim;
      scene.scale.setScalar(scale);
      scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }

    onLoaded?.();
  }, [gltf, onLoaded]);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function EsyBrandedLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className="naledi-3d-loader"
      style={{ opacity: visible ? 1 : 0, pointerEvents: 'none' }}
    >
      {/* Official brand loader; wrapper sets currentColor so the glyph reads on the dark viewer bg. */}
      <span style={{ color: 'rgba(255, 255, 255, 0.92)' }}>
        <EsyLoader size={48} label="" />
      </span>
      <span className="naledi-3d-loader__text">Loading 3D specimen&hellip;</span>
    </div>
  );
}

function Scene({
  meshUrl,
  autoRotate,
  onLoaded,
}: {
  meshUrl: string;
  autoRotate: boolean;
  onLoaded: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} />
      <Environment preset="warehouse" />
      <Suspense fallback={null}>
        <Specimen url={meshUrl} onLoaded={onLoaded} />
      </Suspense>
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enablePan={false}
        minDistance={1.5}
        maxDistance={8}
        makeDefault
      />
    </>
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

function useInView(margin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, visible };
}

export default function SpecimenViewer({
  meshUrl,
  fallbackImage,
  fallbackAlt,
  fallbackCaption,
  label,
  autoRotate = true,
}: SpecimenViewerProps) {
  const [webglFailed, setWebglFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const { ref: viewRef, visible } = useInView('200px');

  const mountTime = useRef(Date.now());
  useEffect(() => { if (!visible) mountTime.current = Date.now(); }, [visible]);

  const handleLoaded = useCallback(() => {
    const MIN_DISPLAY_MS = 1800;
    const elapsed = Date.now() - mountTime.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    setTimeout(() => setLoading(false), remaining);
  }, []);

  const showFallback = webglFailed || isMobile || !visible;

  return (
    <div ref={viewRef} className={`naledi-3d-viewer${showFallback ? '' : ' naledi-3d-viewer--live'}`}>
      <div className="naledi-3d-viewer__label">{label}</div>
      {showFallback ? (
        <div className="naledi-3d-viewer__fallback">
          <img src={fallbackImage} alt={fallbackAlt} loading="lazy" />
          <p>{fallbackCaption}</p>
        </div>
      ) : (
        <div className="naledi-3d-viewer__canvas-wrap">
          <EsyBrandedLoader visible={loading} />
          <GLBErrorBoundary onError={() => setWebglFailed(true)}>
            <Canvas
              camera={{ position: [0, 0, 2.4], fov: 45, near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color(CAVE_CHARCOAL), 1);
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
              }}
              onError={() => setWebglFailed(true)}
            >
              <Scene meshUrl={meshUrl} autoRotate={autoRotate} onLoaded={handleLoaded} />
            </Canvas>
          </GLBErrorBoundary>
          <div className="naledi-3d-viewer__controls-hint">
            Drag to rotate &middot; Scroll to zoom
          </div>
        </div>
      )}
    </div>
  );
}
