import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HouseAnimationProps {
  loop?: boolean;
  onComplete?: () => void;
}

export default function HouseAnimation({
  loop = false,
  onComplete,
}: HouseAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });

    renderer.setSize(160, 160);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Camera position - adjusted for larger house
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    // Central dot/sphere (Airbnb red)
    const dotGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const centralDot = new THREE.Mesh(dotGeometry, dotMaterial);
    scene.add(centralDot);

    // Line material (Airbnb red) - thick stick-like lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xef4444,
      linewidth: 8,
    });

    // Simple large stick house structure - bigger and simpler
    const housePoints = [
      // Foundation base - larger scale
      { start: [0, 0, 0], end: [-2.5, -1.8, 1], delay: 0 },
      { start: [0, 0, 0], end: [2.5, -1.8, 1], delay: 0.3 },
      { start: [0, 0, 0], end: [2.5, -1.8, -1], delay: 0.6 },
      { start: [0, 0, 0], end: [-2.5, -1.8, -1], delay: 0.9 },

      // Foundation square connecting
      { start: [-2.5, -1.8, 1], end: [2.5, -1.8, 1], delay: 1.2 },
      { start: [2.5, -1.8, 1], end: [2.5, -1.8, -1], delay: 1.5 },
      { start: [2.5, -1.8, -1], end: [-2.5, -1.8, -1], delay: 1.8 },
      { start: [-2.5, -1.8, -1], end: [-2.5, -1.8, 1], delay: 2.1 },

      // Vertical walls - large sticks
      { start: [-2.5, -1.8, 1], end: [-2.5, 1.8, 1], delay: 2.4 },
      { start: [2.5, -1.8, 1], end: [2.5, 1.8, 1], delay: 2.7 },
      { start: [2.5, -1.8, -1], end: [2.5, 1.8, -1], delay: 3.0 },
      { start: [-2.5, -1.8, -1], end: [-2.5, 1.8, -1], delay: 3.3 },

      // Roof - simple triangular peak
      { start: [-2.5, 1.8, 1], end: [0, 3.2, 0], delay: 3.6 },
      { start: [2.5, 1.8, 1], end: [0, 3.2, 0], delay: 3.9 },
      { start: [2.5, 1.8, -1], end: [0, 3.2, 0], delay: 4.2 },
      { start: [-2.5, 1.8, -1], end: [0, 3.2, 0], delay: 4.5 },
    ];

    const lines: THREE.Line[] = [];
    let animationStartTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - animationStartTime) / 1000;

      // Clear previous lines if looping
      if (loop && elapsed > 5) {
        lines.forEach((line) => scene.remove(line));
        lines.length = 0;
        animationStartTime = currentTime;
      }

      // Draw lines based on timing
      housePoints.forEach((point, index) => {
        if (elapsed >= point.delay && !lines[index]) {
          const points = [
            new THREE.Vector3(...point.start),
            new THREE.Vector3(...point.end),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
          lines[index] = line;
        }
      });

      // Add sparkle effect when complete
      if (elapsed >= 4 && elapsed < 4.5) {
        const sparkleCount = 8;
        for (let i = 0; i < sparkleCount; i++) {
          const sparkleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const sparkleMaterial = new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            transparent: true,
            opacity: Math.random() * 0.8 + 0.2,
          });
          const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);

          const angle = (i / sparkleCount) * Math.PI * 2;
          const radius = 2.5;
          sparkle.position.set(
            Math.cos(angle) * radius,
            Math.random() * 2 - 1,
            Math.sin(angle) * radius,
          );

          scene.add(sparkle);

          // Remove sparkle after short time
          setTimeout(() => {
            scene.remove(sparkle);
          }, 500);
        }

        if (onComplete && !loop) {
          onComplete();
        }
      }

      // Rotate the entire house slowly
      if (lines.length > 0) {
        lines.forEach((line) => {
          line.rotation.y = elapsed * 0.1;
        });
        centralDot.rotation.y = elapsed * 0.1;
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [loop, onComplete]);

  return (
    <div
      ref={containerRef}
      className="w-40 h-40 flex items-center justify-center"
      style={{ width: "160px", height: "160px" }}
    />
  );
}
