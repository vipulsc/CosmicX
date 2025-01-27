import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Mercury/Mercury.css";

const Venus = () => {
  const canvasRef = useRef(null);
  const marsRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const planetaryInfo = {
    mass: "4.867 × 10^24 kg",
    radius: "6,051.8 km",
    temperature: "737 K (464°C)",
    gravity: "8.87 m/s²",
  };

  const [showImages, setShowImages] = useState(false);


  const initThreeJS = () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Venus sphere setup
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const venusTexture = textureLoader.load("venus_texture.jpg");
    const material = new THREE.MeshStandardMaterial({ 
      map: venusTexture,
      roughness: 0.7,
      metalness: 0.3
    });
    const venus = new THREE.Mesh(geometry, material);
    venus.castShadow = true;
    venus.receiveShadow = true;
    scene.add(venus);
    marsRef.current = venus;

    // Improved Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(20, 10, 20);
    directionalLight.castShadow = true;
    
    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    
    scene.add(directionalLight);

    // Soft ambient light to reduce harsh shadows
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    let animationTime = 0;

    // Animation loop
    const animate = () => {
      animationTime += 0.005; // Slowed down rotation speed

      // Rotate light around the planet (slower)
      const radius = 20;
      directionalLight.position.x = Math.cos(animationTime) * radius;
      directionalLight.position.z = Math.sin(animationTime) * radius;
      directionalLight.position.y = Math.sin(animationTime * 0.5) * 10;

      // Slow down Venus rotation
      venus.rotation.y += 0.001;

      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  };

  useEffect(() => {
    const cleanup = initThreeJS();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="mars3D-container">
      <div ref={canvasRef} className="mars3D-canvas-container"></div>

      {/* Venus Information Section */}
      <div className="mars3D-info">
        <h1>Venus</h1>
        <ul>
          <li>Mass: {planetaryInfo.mass}</li>
          <li>Radius: {planetaryInfo.radius}</li>
          <li>Surface Temperature: {planetaryInfo.temperature} K</li>
          <li>Gravity: {planetaryInfo.gravity}</li>
          <li>Texture for the planet may take some time to load!</li>
        </ul>
      </div>

            {/* Toggle Button for Latest Images */}
            <button
        className="toggle-images-button"
        onClick={() => setShowImages((prev) => !prev)}
      >
        {showImages ? "✖" : "📷"}
      </button>

      {/* Latest Images Section */}
      <div className={`mars-texture-container ${showImages ? 'show' : ''}`}>
        <h2>Latest Images of Venus</h2>
        <img
          src={"venus.jpg"}
          alt="Live view of Venus"
          className="mars-texture-display"
        />
      </div>
    </div>
  );
};

export default Venus;