import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Hands } from '@mediapipe/hands';

const BlackHoleSimulation = () => {
  const mountRef = useRef(null);
  const videoRef = useRef(null);
  const isInitialized = useRef(false); // Prevents React Strict Mode double-firing
  
  const [loadingMsg, setLoadingMsg] = useState("Initializing Cosmic Simulation... Waiting for camera.");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Prevent double initialization in React 18+ Strict Mode
    if (isInitialized.current) return;
    isInitialized.current = true;

    let scene, camera, renderer, blackHole, gravityGrid, stars;
    let handGroup, handSkeleton, handPoints;
    let animationFrameId;
    let videoStream = null;

    let lastHandPos = null;
    let currentHandCenter = new THREE.Vector3(0, 0, 0);
    let isExploded = false;
    let explosionFactor = 0;

    const bhOrigPos = [];
    const gridOrigPos = [];
    const bhRandomDirs = [];
    const gridRandomDirs = [];

    // --- 1. THREE.JS SETUP ---
    const initThree = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 5, 20);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x050011, 1);
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // The Event Horizon (Central Orb)
      const bhGeo = new THREE.SphereGeometry(3, 64, 64);
      const bhMat = new THREE.PointsMaterial({ color: 0xaa00ff, size: 0.06, transparent: true, opacity: 0.8 });
      blackHole = new THREE.Points(bhGeo, bhMat);
      scene.add(blackHole);

      const bhPos = blackHole.geometry.attributes.position.array;
      for (let i = 0; i < bhPos.length; i += 3) {
        bhOrigPos.push(bhPos[i], bhPos[i + 1], bhPos[i + 2]);
        bhRandomDirs.push((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
      }

      // Spacetime Grid
      const gridCount = 15000;
      const gridGeo = new THREE.BufferGeometry();
      const gridPositions = new Float32Array(gridCount * 3);
      
      for (let i = 0; i < gridCount; i++) {
        const radius = 3.5 + Math.random() * 20;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const yDrop = -25 / (radius - 2.5); 
        const y = yDrop + (Math.random() - 0.5) * 0.2; 
        gridPositions[i * 3] = x; gridPositions[i * 3 + 1] = y; gridPositions[i * 3 + 2] = z;
        gridOrigPos.push(x, y, z);
        gridRandomDirs.push((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3);
      }
      gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
      gravityGrid = new THREE.Points(gridGeo, new THREE.PointsMaterial({ color: 0xff00ff, size: 0.03, transparent: true, opacity: 0.5 }));
      scene.add(gravityGrid);

      // Stars
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(5000 * 3);
      for (let i = 0; i < 5000 * 3; i++) starPos[i] = (Math.random() - 0.5) * 1000;
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 }));
      scene.add(stars);

      // Hand Hologram
      handGroup = new THREE.Group();
      handSkeleton = new THREE.LineSegments(
        new THREE.BufferGeometry(), 
        new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 })
      );
      handPoints = new THREE.Points(
        new THREE.BufferGeometry(), 
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })
      );
      handGroup.add(handSkeleton); handGroup.add(handPoints);
      handGroup.position.set(0, 0, -10);
      camera.add(handGroup); scene.add(camera);
    };

    // --- 2. LOGIC & PHYSICS ---
    const isHandFist = (landmarks) => {
      const tips = [8, 12, 16, 20];
      const joints = [6, 10, 14, 18];
      let closedCount = 0;
      for (let i = 0; i < 4; i++) {
        if (landmarks[tips[i]].y > landmarks[joints[i]].y) closedCount++;
      }
      return closedCount >= 3;
    };

    const updateParticles = () => {
      if (!blackHole || !gravityGrid) return;
      const targetFactor = isExploded ? 8.0 : 0;
      explosionFactor = THREE.MathUtils.lerp(explosionFactor, targetFactor, isExploded ? 0.05 : 0.15);

      let attractionVector = new THREE.Vector3();
      if (isExploded) {
        attractionVector.copy(currentHandCenter);
        handGroup.localToWorld(attractionVector);
      }

      const updateMesh = (mesh, origPos, randomDirs, pullSpeed) => {
        const attr = mesh.geometry.attributes.position;
        for (let i = 0; i < attr.count; i++) {
          const i3 = i * 3;
          let x = origPos[i3] + randomDirs[i3] * explosionFactor;
          let y = origPos[i3 + 1] + randomDirs[i3 + 1] * explosionFactor;
          let z = origPos[i3 + 2] + randomDirs[i3 + 2] * explosionFactor;
          if (isExploded) {
            x = THREE.MathUtils.lerp(x, attractionVector.x, pullSpeed);
            y = THREE.MathUtils.lerp(y, attractionVector.y, pullSpeed);
            z = THREE.MathUtils.lerp(z, attractionVector.z, pullSpeed);
          }
          attr.array[i3] = x; attr.array[i3 + 1] = y; attr.array[i3 + 2] = z;
        }
        attr.needsUpdate = true;
      };

      updateMesh(blackHole, bhOrigPos, bhRandomDirs, 0.08);
      updateMesh(gravityGrid, gridOrigPos, gridRandomDirs, 0.06);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      updateParticles();
      if (!isExploded && !lastHandPos && blackHole && gravityGrid) {
        blackHole.rotation.y += 0.01;
        gravityGrid.rotation.y += 0.002;
        blackHole.position.y = Math.sin(Date.now() * 0.001) * 0.5; 
      }
      renderer.render(scene, camera);
    };

    // --- 3. MEDIAPIPE TRACKING (VITE-SAFE) ---
    const initHandTracking = async () => {
      try {
        // Hardcoding the version prevents CDN mismatch errors
        const hands = new Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7
        });

        const handConnections = [
          [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
          [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16],
          [0, 17], [17, 18], [18, 19], [19, 20], [5, 9], [9, 13], [13, 17]
        ];

        hands.onResults((results) => {
          setLoadingMsg(null); // Clear loading message on successful frame
          
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            const positions = []; const linePositions = [];

            currentHandCenter.set(((1 - landmarks[9].x) - 0.5) * 20, -(landmarks[9].y - 0.5) * 15, 0);

            landmarks.forEach(lm => positions.push(((1 - lm.x) - 0.5) * 20, -(lm.y - 0.5) * 15, 0));
            handConnections.forEach(([start, end]) => {
              linePositions.push(positions[start * 3], positions[start * 3 + 1], positions[start * 3 + 2]);
              linePositions.push(positions[end * 3], positions[end * 3 + 1], positions[end * 3 + 2]);
            });

            handPoints.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            handSkeleton.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            const isFist = isHandFist(landmarks);
            const thumbTip = landmarks[4]; const indexTip = landmarks[8];

            const zoomDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
            const targetZ = 40 - (zoomDist * 150);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(10, Math.min(targetZ, 60)), 0.1);

            if (isFist) {
              isExploded = false;
              if (lastHandPos) {
                scene.rotation.y += ((1 - indexTip.x) - (1 - lastHandPos.x)) * 5;
                scene.rotation.x += (indexTip.y - lastHandPos.y) * 5;
              }
              lastHandPos = indexTip;
            } else {
              isExploded = true;
              lastHandPos = null;
            }
            handGroup.visible = true;
          } else {
            handGroup.visible = false;
            lastHandPos = null;
            isExploded = false;
          }
        });

        // --- NATIVE BROWSER WEBCAM SETUP ---
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          videoStream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = videoStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
              
              // Manual loop to push frames to MediaPipe
              const processFrame = async () => {
                if (videoRef.current && !videoRef.current.paused) {
                  await hands.send({ image: videoRef.current });
                }
                requestAnimationFrame(processFrame);
              };
              processFrame();
            };
          }
        } else {
          setErrorMsg("Camera API not supported in this browser.");
        }

      } catch (err) {
        console.error("Initialization Error:", err);
        setErrorMsg("Failed to start camera or models. Please check browser permissions.");
        setLoadingMsg(null);
      }
    };

    // --- 4. START IT UP ---
    initThree();
    animate();
    initHandTracking();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 5. CLEANUP ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Stop the webcam when unmounting
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
      isInitialized.current = false;
    };
  }, []);
return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      
      {/* CRITICAL FIX: Removed display: 'none'. 
        We are now rendering the camera feed in the bottom right corner.
        If you can see yourself moving here, the AI can see you too.
      */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          width: '240px', 
          height: '180px', 
          zIndex: 100, 
          border: '2px solid #aa00ff',
          borderRadius: '10px',
          backgroundColor: '#111',
          transform: 'scaleX(-1)' // Mirrors the camera so it acts like a mirror
        }} 
      />
      
      {/* Three.js Canvas Container */}
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      
      {/* UI Overlays */}
      {loadingMsg && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#aa00ff', fontFamily: 'sans-serif', fontSize: '1.2rem', textAlign: 'center', pointerEvents: 'none', zIndex: 10 }}>
          {loadingMsg}
        </div>
      )}
      
      {errorMsg && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ff0055', fontFamily: 'sans-serif', fontSize: '1.2rem', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '10px', zIndex: 10 }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default BlackHoleSimulation;