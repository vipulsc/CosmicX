import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Mercury/Mercury.css";

const Mercury = () => {
  const canvasRef = useRef(null);
  const mercuryRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const [showImages, setShowImages] = useState(false);

  const planetaryInfo = {
    mass: "3.30 x 10^23 kg",
    radius: "2,439.7 km",
    temperature: "440 K",
    gravity: "3.7 m/s²",
  };

  useEffect(() => {
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

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      canvasRef.current.appendChild(renderer.domElement);

      const textureLoader = new THREE.TextureLoader();
      const backgroundTexture = textureLoader.load("bg.jpg");
      scene.background = backgroundTexture;

      // Mercury setup
      const geometry = new THREE.SphereGeometry(5, 64, 64);
      const mercuryTexture = textureLoader.load("mercury_texture.jpg");
      const material = new THREE.MeshStandardMaterial({
        map: mercuryTexture,
        roughness: 0.7,
        metalness: 0.5,
      });
      const mercury = new THREE.Mesh(geometry, material);
      mercury.castShadow = true;
      mercury.receiveShadow = true;
      scene.add(mercury);
      mercuryRef.current = mercury;

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

        // Slow down Mercury rotation
        mercury.rotation.y += 0.001;

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

    const cleanup = initThreeJS();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="mars3D-container">
      <div ref={canvasRef} className="mars3D-canvas-container"></div>

      {/* Mercury Information Section */}
      <div className="mars3D-info">
        <h1>Mercury</h1>
        <ul>
          <li>Mass: {planetaryInfo.mass}</li>
          <li>Radius: {planetaryInfo.radius}</li>
          <li>Surface Temperature: {planetaryInfo.temperature}</li>
          <li>Gravity: {planetaryInfo.gravity}</li>
          <br />
          <br />
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
      {showImages && (
        <div className={`mars-texture-container ${showImages ? "show" : ""}`}>
          <h2>Latest Images of Mercury</h2>
          <img
            src={"mercury.jpg"}
            alt="Live view of Mercury"
            className="mars-texture-display"
          />
        </div>
      )}
    </div>
  );
};

export default Mercury;
