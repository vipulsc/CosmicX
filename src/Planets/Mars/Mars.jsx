import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Mars.css";

const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos";
const NASA_API_KEY = "fhgCFwLKohVukB7UluiPVUhAlD7IuZwjbSeQaedm"; // Replace with your API key

const Mars = () => {
  const canvasRef = useRef(null);
  const marsRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const planetaryInfo = {
    mass: "6.42 × 10^23 kg",
    radius: "3,389.5 km",
    temperature: "210 K",
    gravity: "3.71 m/s²",
  };

  const [showImages, setShowImages] = useState(false);
  const [latestMarsPhoto, setLatestMarsPhoto] = useState(null);

  const fetchLatestMarsPhoto = async () => {
    try {
      const response = await fetch(`${NASA_API_URL}?api_key=${NASA_API_KEY}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.latest_photos && data.latest_photos.length > 0) {
        // Select the first image or fallback to a specific index
        setLatestMarsPhoto(data.latest_photos[0].img_src);
      } else {
        console.error("No latest Mars photos found in response.");
        setLatestMarsPhoto(null);
      }
    } catch (error) {
      console.error("Error fetching latest Mars photo:", error);
      setLatestMarsPhoto(null);
    }
  };

  useEffect(() => {
    fetchLatestMarsPhoto();
    const photoInterval = setInterval(() => fetchLatestMarsPhoto(), 300000); // Update every 5 minutes
    return () => clearInterval(photoInterval);
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
    const backgroundTexture = textureLoader.load("/bg.jpg");
    scene.background = backgroundTexture;

    // Mars setup
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const marsTexture = textureLoader.load("/mars_texture.jpg");
    const material = new THREE.MeshStandardMaterial({
      map: marsTexture,
      roughness: 0.7,
      metalness: 0.4,
    });
    const mars = new THREE.Mesh(geometry, material);
    mars.castShadow = true;
    mars.receiveShadow = true;
    scene.add(mars);
    marsRef.current = mars;

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

      // Slow down Mars rotation
      mars.rotation.y += 0.001;

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

      {/* Mars Information Section */}
      <div className="mars3D-info">
        <h1>Mars</h1>
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

      {/* Live Mars Section */}
      <div className={`mars-texture-container ${showImages ? "show" : ""}`}>
        <h2>Latest Images from Curiosity Rover</h2>
        {latestMarsPhoto ? (
          <img
            src={latestMarsPhoto}
            alt="Live view of Mars"
            className="mars-texture-display"
          />
        ) : (
          <p>No live images available</p>
        )}
      </div>
    </div>
  );
};

export default Mars;
