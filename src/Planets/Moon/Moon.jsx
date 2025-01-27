import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Jupiter/Jupiter.css";

const PLANETARY_API_URL = "https://api.le-systeme-solaire.net/rest/bodies/moon";
const NASA_API_URL = "https://images-api.nasa.gov/search?q=moon&media_type=image";

const Moon = () => {
  const canvasRef = useRef(null);
  const moonRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const [planetaryInfo, setPlanetaryInfo] = useState({
    mass: "Loading...",
    radius: "Loading...",
    temperature: "Loading...",
    gravity: "Loading...",
  });
  
  const [showImages, setShowImages] = useState(false);

  const [latestMoonPhoto, setLatestMoonPhoto] = useState(null);

  const fetchPlanetaryData = async () => {
    try {
      const response = await fetch(PLANETARY_API_URL);
      const data = await response.json();

      setPlanetaryInfo({
        mass: `${data.mass.massValue} × 10^${data.mass.massExponent} kg`,
        radius: `${data.meanRadius} km`,
        temperature: `${data.avgTemp} K`,
        gravity: `${data.gravity} m/s²`,
      });
    } catch (error) {
      console.error("Error fetching Moon data:", error);
    }
  };

  const fetchLatestMoonPhoto = async () => {
    try {
      const response = await fetch(NASA_API_URL);
      const data = await response.json();

      const items = data.collection?.items || [];
      const firstImage = items.find((item) =>
        item.links?.some((link) => link.href.endsWith(".jpg"))
      );

      if (firstImage) {
        const imageUrl = firstImage.links.find((link) => link.href.endsWith(".jpg")).href;
        setLatestMoonPhoto(imageUrl);
      } else {
        console.error("No images found.");
      }
    } catch (error) {
      console.error("Error fetching latest Moon photo:", error);
    }
  };

  useEffect(() => {
    fetchPlanetaryData();
    fetchLatestMoonPhoto();
    
    const dataInterval = setInterval(() => fetchPlanetaryData(), 300000);
    const photoInterval = setInterval(() => fetchLatestMoonPhoto(), 300000);
    
    return () => {
      clearInterval(dataInterval);
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
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Moon setup
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const moonTexture = textureLoader.load("moon_texture.jpg");
    const material = new THREE.MeshStandardMaterial({ 
      map: moonTexture,
      roughness: 0.8,
      metalness: 0.2
    });
    const moon = new THREE.Mesh(geometry, material);
    moon.castShadow = true;
    moon.receiveShadow = true;
    scene.add(moon);
    moonRef.current = moon;

    // Improved Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
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
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    let animationTime = 0;

    // Animation loop
    const animate = () => {
      animationTime += 0.0005; // Increased rotation speed

      // Rotate light around the moon 
      const radius = 20;
      directionalLight.position.x = Math.cos(animationTime) * radius;
      directionalLight.position.z = Math.sin(animationTime) * radius;
      directionalLight.position.y = Math.sin(animationTime * 0.5) * 10;

      // Moon's rotation (slightly faster)
      moon.rotation.y += 0.002;

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
        <h1>Moon</h1>
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


      <div className={`jupiter-texture-container ${showImages ? 'show' : ''}`}>
        <h2>Latest Images of Moon</h2>
        {latestMoonPhoto ? (
          <img
            src={latestMoonPhoto}
            alt="Live view of Moon"
            className="jupiter-texture-display"
          />
        ) : (
          <p>Loading latest image of Moon...</p>
        )}
      </div>
    </div>
  );
};

export default Moon;