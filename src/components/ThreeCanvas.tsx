import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Camera setup with dynamic responsive positioning
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Responsive screen size & aspect ratio handler
    const updateCameraAndRenderer = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / height;
      camera.aspect = aspect;

      // Adjust camera distance dynamically for phones, tablets, and desktops
      if (aspect < 0.7) {
        // Narrow mobile portrait
        camera.position.z = 115;
      } else if (aspect < 1.0) {
        // Tablets portrait / foldable displays
        camera.position.z = 98;
      } else if (aspect < 1.4) {
        // Tablets landscape / small laptops
        camera.position.z = 88;
      } else {
        // Standard and wide desktop screens
        camera.position.z = 80;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    updateCameraAndRenderer();

    // Particle Geometries
    const particleCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color('#a855f7'); // Violet
    const color2 = new THREE.Color('#38bdf8'); // Sky Blue
    const color3 = new THREE.Color('#6366f1'); // Indigo

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical distribution with dispersion
      const radius = 30 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color blending
      const mixedColor = color1.clone();
      const rand = Math.random();
      if (rand < 0.33) {
        mixedColor.lerp(color2, Math.random());
      } else if (rand < 0.66) {
        mixedColor.lerp(color3, Math.random());
      }
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create a high-res soft circular glow texture for smooth, circular blurred particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
    }
    const circleTexture = new THREE.CanvasTexture(canvas);

    // Circular Particle Material
    const material = new THREE.PointsMaterial({
      size: 3.4,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Central smooth circular orbital rings
    const ringGeo = new THREE.TorusGeometry(34, 0.35, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Outer smooth circular orbital ring
    const outerRingGeo = new THREE.TorusGeometry(46, 0.2, 16, 140);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.y = Math.PI / 4;
    scene.add(outerRing);

    // Inner smooth spherical wireframe orb
    const sphereGeo = new THREE.SphereGeometry(18, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const sphereOrb = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereOrb);

    // Dynamic Physics & Acceleration Tracking State
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastTime = performance.now();
    let lastSpeed = 0;

    // Angular velocities (radians per frame impulse)
    let angularVelocityX = 0;
    let angularVelocityY = 0;

    // Normalized coordinates for camera sway (-1 to 1)
    let targetNormalizedX = 0;
    let targetNormalizedY = 0;
    let currentCamX = 0;
    let currentCamY = 0;

    const handlePointerMove = (clientX: number, clientY: number) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 8); // Minimum 8ms delta
      const dx = clientX - lastX;
      const dy = clientY - lastY;

      // Calculate instantaneous pointer speed (px/ms)
      const distance = Math.hypot(dx, dy);
      const currentSpeed = distance / dt;

      // Calculate instantaneous acceleration (px/ms^2)
      const acceleration = Math.max(0, (currentSpeed - lastSpeed) / dt);

      // Boost multiplier based on both velocity AND acceleration with controlled scaling
      const speedFactor = 1 + Math.min(currentSpeed * 1.2, 3.0);
      const accelMultiplier = 1 + Math.min(acceleration * 18, 3.5);

      // Balanced base sensitivity for elegant, controlled responsiveness
      const baseSensitivity = 0.00065;

      // Angular impulse proportional to displacement, speed, and acceleration
      const impulseY = (dx * baseSensitivity) * speedFactor * accelMultiplier;
      const impulseX = (dy * baseSensitivity) * speedFactor * accelMultiplier;

      // Controlled velocity clamp to prevent frantic spinning while keeping acceleration feel
      angularVelocityY = THREE.MathUtils.clamp(angularVelocityY + impulseY, -0.075, 0.075);
      angularVelocityX = THREE.MathUtils.clamp(angularVelocityX + impulseX, -0.075, 0.075);

      // Update normalized targets for camera sway
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetNormalizedX = (clientX - halfW) / (halfW || 1);
      targetNormalizedY = (clientY - halfH) / (halfH || 1);

      lastX = clientX;
      lastY = clientY;
      lastTime = now;
      lastSpeed = currentSpeed;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        lastTime = performance.now();
        lastSpeed = 0;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Handle Resize & Orientation Change dynamically
    window.addEventListener('resize', updateCameraAndRenderer);
    window.addEventListener('orientationchange', updateCameraAndRenderer);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Responsive Camera Sway with subtle, smooth damping
      currentCamX += (targetNormalizedX * 10 - currentCamX) * 0.05;
      currentCamY += (targetNormalizedY * 7 - currentCamY) * 0.05;
      camera.position.x = currentCamX;
      camera.position.y = -currentCamY;
      camera.lookAt(scene.position);

      // Continuous ambient base rotation
      const baseSpeedY = 0.0012;
      const baseSpeedX = 0.0006;

      // Particles rotation: responds smoothly to mouse acceleration
      particles.rotation.y += baseSpeedY + angularVelocityY * 0.85;
      particles.rotation.x += baseSpeedX + angularVelocityX * 0.55;

      // Inner orbital ring reacts with moderate angular momentum
      ring.rotation.z += 0.002 + angularVelocityY * 0.95;
      ring.rotation.y += angularVelocityX * 0.65;

      // Outer tilted ring reacts with balanced gyroscopic momentum
      outerRing.rotation.y += 0.0018 + angularVelocityY * 0.85;
      outerRing.rotation.x += angularVelocityX * 0.55;

      // Wireframe core orb spins according to user acceleration
      sphereOrb.rotation.y += baseSpeedY + angularVelocityY * 1.05;
      sphereOrb.rotation.x += -baseSpeedX + angularVelocityX * 0.75;

      // Friction damping: smooth deceleration curve that settles gracefully
      angularVelocityY *= 0.925;
      angularVelocityX *= 0.925;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', updateCameraAndRenderer);
      window.removeEventListener('orientationchange', updateCameraAndRenderer);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      circleTexture.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
