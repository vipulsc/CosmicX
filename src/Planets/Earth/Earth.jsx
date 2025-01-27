import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Jupiter/Jupiter.css";

const EPIC_API_URL = "https://epic.gsfc.nasa.gov/api/natural";

const Earth = () => {
  const canvasRef = useRef(null);
  const earthRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const [planetaryInfo] = useState({
    mass: "5.972 × 10^24 kg",
    radius: "6371 km",
    temperature: "288 K (15°C)",
    gravity: "9.8 m/s²",
  });

  const [showImages, setShowImages] = useState(false);
  const [latestEarthPhoto, setLatestEarthPhoto] = useState(null);

  const fetchLatestEarthPhoto = async () => {
    const cachedImage = localStorage.getItem("latestEarthPhoto");
    if (cachedImage) {
      setLatestEarthPhoto(cachedImage);
      return;
    }

    try {
      const response = await fetch(EPIC_API_URL);
      const data = await response.json();

      if (data && data.length > 0) {
        const imageDate = data[0].date.split(" ")[0].replaceAll("-", "/");
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${imageDate}/png/${data[0].image}.png`;
        localStorage.setItem("latestEarthPhoto", imageUrl);
        setLatestEarthPhoto(imageUrl);
      } else {
        throw new Error("No images available.");
      }
    } catch (error) {
      console.error("Error fetching Earth image:", error);
    }
  };

  useEffect(() => {
    fetchLatestEarthPhoto();

    const photoInterval = setInterval(() => fetchLatestEarthPhoto(), 300000); // Update every 5 minutes

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
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1);
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // Optimized background texture
    const backgroundTexture = textureLoader.load("bg.jpg", (texture) => {
      texture.encoding = THREE.sRGBEncoding;
      scene.background = texture;
    });

    // Earth setup
    const geometry = new THREE.SphereGeometry(5, 32, 32); // Reduced segments
    const earthTexture = textureLoader.load("earth.jpg", (texture) => {
      texture.encoding = THREE.sRGBEncoding;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipMapLinearFilter;
    });

    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.4,
    });

    const earth = new THREE.Mesh(geometry, material);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);
    earthRef.current = earth;

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(20, 10, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024; // Reduced size
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxDistance = 50;
    controls.minDistance = 10;

    // Animation
    let animationFrame;
    const animate = () => {
      earth.rotation.y += 0.001; // Adjust rotation speed
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationFrame);
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
        <h1>Earth</h1>
        <ul>
          <li>Mass: {planetaryInfo.mass}</li>
          <li>Radius: {planetaryInfo.radius}</li>
          <li>Surface Temperature: {planetaryInfo.temperature}</li>
          <li>Gravity: {planetaryInfo.gravity}</li>
          <li>Texture for the planet may take some time to load!</li>
        </ul>
      </div>

      <button
        className="toggle-images-button"
        onClick={() => setShowImages((prev) => !prev)}
      >
        {showImages ? "✖" : "📷"}
      </button>

      <div className={`jupiter-texture-container ${showImages ? "show" : ""}`}>
        <h2>Latest View of Earth</h2>
        {latestEarthPhoto ? (
          <img
            src={latestEarthPhoto}
            alt="Latest view of Earth"
            className="jupiter-texture-display"
          />
        ) : (
          <p>Loading latest image of Earth...</p>
        )}
      </div>
    </div>
  );
};

export default Earth;