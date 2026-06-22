/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function ParticleField({ progress }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const count = 900;
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 7 + seededValue(i + 1) * 12;
      const angle = seededValue(i + 17) * Math.PI * 2;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = (seededValue(i + 31) - 0.5) * 18;
      values[i * 3 + 2] = Math.sin(angle) * radius - 5;
    }

    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.rotation.y = time * 0.035 + progress * 1.1;
    ref.current.rotation.x = Math.sin(time * 0.2) * 0.08;
    ref.current.position.y = -progress * 4.5;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7da6ff"
        size={0.09}
        sizeAttenuation
        depthWrite={false}
        opacity={0.36}
      />
    </Points>
  );
}

function FloatingFrames({ progress }) {
  const group = useRef(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = progress * Math.PI * 1.35 + time * 0.08;
    group.current.rotation.x = Math.sin(time * 0.35) * 0.14;
    group.current.position.y = -progress * 5.4;
  });

  const frames = [
    { position: [-3.3, 2.2, -4.8], rotation: [0.5, 0.3, 0.1], color: '#7da6ff', scale: 1.05 },
    { position: [3.2, 0.5, -5.7], rotation: [0.4, -0.5, 0.2], color: '#55d6c2', scale: 0.82 },
    { position: [-2.1, -2.0, -4.2], rotation: [-0.3, 0.7, -0.2], color: '#f2a35a', scale: 0.74 },
    { position: [2.6, -3.5, -6.1], rotation: [0.6, 0.4, 0.6], color: '#dbc36d', scale: 0.64 },
  ];

  return (
    <group ref={group}>
      {frames.map((frame) => (
        <mesh
          key={frame.color}
          position={frame.position}
          rotation={frame.rotation}
          scale={frame.scale}
        >
          <boxGeometry args={[1.9, 1.9, 1.9, 2, 2, 2]} />
          <meshStandardMaterial
            color={frame.color}
            wireframe
            transparent
            opacity={0.38}
            roughness={0.42}
          />
        </mesh>
      ))}
    </group>
  );
}

function RibbonPath({ progress }) {
  const ref = useRef(null);
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.6, 3.6, -7),
      new THREE.Vector3(-2.6, 1.2, -4.4),
      new THREE.Vector3(0.6, 2.0, -5.4),
      new THREE.Vector3(3.4, -0.6, -4.8),
      new THREE.Vector3(0.8, -2.8, -5.8),
      new THREE.Vector3(-3.8, -1.4, -5.0),
    ]);

    return curve.getPoints(96);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(time * 0.18) * 0.08;
    ref.current.rotation.y = progress * 0.7;
    ref.current.position.y = -progress * 4;
  });

  return (
    <group ref={ref}>
      <Line points={points} color="#1f6b57" lineWidth={1.4} transparent opacity={0.26} />
      <Line
        points={points.map((point) => [point.x * 0.72, point.y * 0.72 - 1.2, point.z - 1.4])}
        color="#55d6c2"
        lineWidth={1}
        transparent
        opacity={0.18}
      />
    </group>
  );
}

function CentralModel({ progress }) {
  const group = useRef(null);
  const knot = useRef(null);
  const ring = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (group.current) {
      group.current.position.y = 0.35 - progress * 3.3 + Math.sin(time * 0.9) * 0.08;
      group.current.rotation.y = progress * Math.PI * 2 + time * 0.12;
      group.current.rotation.x = Math.sin(progress * Math.PI) * 0.38;
    }

    if (knot.current) {
      knot.current.rotation.x = time * 0.24;
      knot.current.rotation.z = -time * 0.18;
    }

    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2 + time * 0.08;
      ring.current.rotation.z = progress * Math.PI;
    }
  });

  return (
    <group ref={group} position={[0, 0, -4.8]}>
      <mesh ref={ring}>
        <torusGeometry args={[2.15, 0.018, 12, 140]} />
        <meshStandardMaterial color="#2f5e8f" transparent opacity={0.28} />
      </mesh>
      <mesh ref={knot}>
        <torusKnotGeometry args={[0.82, 0.18, 120, 14, 2, 5]} />
        <meshStandardMaterial
          color="#1f6b57"
          metalness={0.2}
          roughness={0.32}
          transparent
          opacity={0.42}
        />
      </mesh>
      <mesh rotation={[0.5, 0.3, 0]}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshStandardMaterial color="#c56b45" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function CameraRig({ progress }) {
  const { camera, viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePointer = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useFrame(() => {
    const compact = viewport.width < 7;
    const targetX = pointer.current.x * (compact ? 0.28 : 0.55);
    const targetY = pointer.current.y * 0.28 - progress * 1.5;
    const targetZ = compact ? 8.7 - progress * 1.0 : 7.2 - progress * 1.4;

    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.position.z += (targetZ - camera.position.z) * 0.045;
    camera.lookAt(0, -progress * 2.7, -5);
  });

  return null;
}

export default function Background3D() {
  const progress = useScrollProgress();
  const [hasWebGL] = useState(() => detectWebGL());

  if (!hasWebGL) {
    return <div className="canvas-container fallback-scene" aria-hidden="true" />;
  }

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.58} />
        <directionalLight position={[4, 5, 6]} intensity={0.82} color="#eef6ff" />
        <pointLight position={[-4, -1, -4]} intensity={0.9} color="#55d6c2" />
        <pointLight position={[4, 2, -5]} intensity={0.58} color="#2f5e8f" />
        <ParticleField progress={progress} />
        <RibbonPath progress={progress} />
        <FloatingFrames progress={progress} />
        <CentralModel progress={progress} />
        <CameraRig progress={progress} />
        <fog attach="fog" args={['#f3eadf', 7, 18]} />
      </Canvas>
    </div>
  );
}
