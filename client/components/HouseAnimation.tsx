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

    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Camera position
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Central dot/sphere (Airbnb red)
    const dotGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const centralDot = new THREE.Mesh(dotGeometry, dotMaterial);
    scene.add(centralDot);

    // Line material (Airbnb red)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xef4444,
      linewidth: 3,
    });

    // Enhanced 3D house structure points
    const housePoints = [
      // Foundation square (front to back)
      { start: [0, 0, 0], end: [-1.8, -1.2, 0.8], delay: 0 },
      { start: [0, 0, 0], end: [1.8, -1.2, 0.8], delay: 0.1 },
      { start: [0, 0, 0], end: [1.8, -1.2, -0.8], delay: 0.2 },
      { start: [0, 0, 0], end: [-1.8, -1.2, -0.8], delay: 0.3 },

      // Foundation connecting lines
      { start: [-1.8, -1.2, 0.8], end: [1.8, -1.2, 0.8], delay: 0.4 },
      { start: [1.8, -1.2, 0.8], end: [1.8, -1.2, -0.8], delay: 0.5 },
      { start: [1.8, -1.2, -0.8], end: [-1.8, -1.2, -0.8], delay: 0.6 },
      { start: [-1.8, -1.2, -0.8], end: [-1.8, -1.2, 0.8], delay: 0.7 },

      // Vertical walls
      { start: [-1.8, -1.2, 0.8], end: [-1.8, 1.2, 0.8], delay: 0.8 },
      { start: [1.8, -1.2, 0.8], end: [1.8, 1.2, 0.8], delay: 0.9 },
      { start: [1.8, -1.2, -0.8], end: [1.8, 1.2, -0.8], delay: 1.0 },
      { start: [-1.8, -1.2, -0.8], end: [-1.8, 1.2, -0.8], delay: 1.1 },

      // Top frame
      { start: [-1.8, 1.2, 0.8], end: [1.8, 1.2, 0.8], delay: 1.2 },
      { start: [1.8, 1.2, 0.8], end: [1.8, 1.2, -0.8], delay: 1.3 },
      { start: [1.8, 1.2, -0.8], end: [-1.8, 1.2, -0.8], delay: 1.4 },
      { start: [-1.8, 1.2, -0.8], end: [-1.8, 1.2, 0.8], delay: 1.5 },

      // Roof peak and supports
      { start: [-1.8, 1.2, 0.8], end: [0, 2.4, 0], delay: 1.6 },
      { start: [1.8, 1.2, 0.8], end: [0, 2.4, 0], delay: 1.7 },
      { start: [1.8, 1.2, -0.8], end: [0, 2.4, 0], delay: 1.8 },
      { start: [-1.8, 1.2, -0.8], end: [0, 2.4, 0], delay: 1.9 },

      // Door frame
      { start: [0, -1.2, 0.8], end: [0, 0.4, 0.8], delay: 2.0 },
      { start: [-0.4, -1.2, 0.8], end: [-0.4, 0.4, 0.8], delay: 2.1 },
      { start: [0.4, -1.2, 0.8], end: [0.4, 0.4, 0.8], delay: 2.2 },
      { start: [-0.4, 0.4, 0.8], end: [0.4, 0.4, 0.8], delay: 2.3 },

      // Windows
      { start: [-1.2, 0.2, 0.8], end: [-0.6, 0.2, 0.8], delay: 2.4 },
      { start: [-1.2, 0.8, 0.8], end: [-0.6, 0.8, 0.8], delay: 2.5 },
      { start: [-1.2, 0.2, 0.8], end: [-1.2, 0.8, 0.8], delay: 2.6 },
      { start: [-0.6, 0.2, 0.8], end: [-0.6, 0.8, 0.8], delay: 2.7 },

      { start: [0.6, 0.2, 0.8], end: [1.2, 0.2, 0.8], delay: 2.8 },
      { start: [0.6, 0.8, 0.8], end: [1.2, 0.8, 0.8], delay: 2.9 },
      { start: [0.6, 0.2, 0.8], end: [0.6, 0.8, 0.8], delay: 3.0 },
      { start: [1.2, 0.2, 0.8], end: [1.2, 0.8, 0.8], delay: 3.1 },
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
      className="w-30 h-30 flex items-center justify-center"
      style={{ width: "120px", height: "120px" }}
    />
  );
}
