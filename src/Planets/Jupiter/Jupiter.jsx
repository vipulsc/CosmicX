import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Jupiter/Jupiter.css";

const NASA_API_URL = "https://images-api.nasa.gov/search?q=jupiter";

const Jupiter = () => {
  const canvasRef = useRef(null);
  const jupiterRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const [planetaryInfo] = useState({
    mass: "1.898 × 10^27 kg",
    radius: "69,911 km",
    temperature: "165 K",
    gravity: "24.79 m/s²",
  });

  const [showImages, setShowImages] = useState(false);

  const [latestJupiterPhoto, setLatestJupiterPhoto] = useState(null);

  const fetchLatestJupiterPhoto = async () => {
    try {
      const response = await fetch(NASA_API_URL);
      const data = await response.json();

      const items = data.collection?.items || [];
      const firstImage = items.find((item) =>
        item.links?.some((link) => link.href.endsWith(".jpg"))
      );

      if (firstImage) {
        const imageUrl = firstImage.links.find((link) => link.href.endsWith(".jpg")).href;
        setLatestJupiterPhoto(imageUrl);
      } else {
        console.error("No images found.");
      }
    } catch (error) {
      console.error("Error fetching latest Jupiter photo:", error);
    }
  };

  useEffect(() => {
    fetchLatestJupiterPhoto();

    const photoInterval = setInterval(() => fetchLatestJupiterPhoto(), 300000);
    return () => {
      clearInterval(photoInterval);
    };
  }, []);

  const initThreeJS = () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Jupiter setup with more realistic material
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const jupiterTexture = textureLoader.load("jupiter_texture.jpg");
    const material = new THREE.MeshStandardMaterial({ 
      map: jupiterTexture,
      roughness: 0.7,
      metalness: 0.2
    });
    const jupiter = new THREE.Mesh(geometry, material);
    scene.add(jupiter);
    jupiterRef.current = jupiter;

    // Realistic Sunlight Positioning
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(20, 10, 10); // Simulating sun's position
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Soft ambient light to reduce harsh shadows
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation with more subtle rotation
    const animate = () => {
      jupiter.rotation.y += 0.002; // Slowed down rotation
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
    <div className="jupiter3D-container">
      <div ref={canvasRef} className="jupiter3D-canvas-container"></div>

      <div className="jupiter3D-info">
        <h1>Jupiter</h1>
        <ul>
          <li>Mass: {planetaryInfo.mass}</li>
          <li>Radius: {planetaryInfo.radius}</li>
          <li>Surface Temperature: {planetaryInfo.temperature}</li>
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
      <div className={`jupiter-texture-container ${showImages ? 'show' : ''}`}>
        <h2>Latest Images of Jupiter</h2>
        {latestJupiterPhoto ? (
          <img
            src={latestJupiterPhoto}
            alt="Latest view of Jupiter"
            className="jupiter-texture-display"
          />
        ) : (
          <p>No live images available</p>
        )}
      </div>
    </div>
  );
};

export default Jupiter;