/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Sun/Sun.css";

const API_KEY = "ZVq9btgdtbodrYe1mrAvc4snQyiI0Nx6QpXsPbJc "; // Replace with your NASA API key
const FLARE_API_URL = `https://api.nasa.gov/DONKI/FLR?startDate=2023-01-01&endDate=2025-01-01&api_key=${API_KEY}`;
const SDO_IMAGE_URL =
  "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIIC.jpg"; // Live solar image URL

const Sun = () => {
  const canvasRef = useRef(null);
  const sunRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const [solarActivity, setSolarActivity] = useState({
    solarFlareIntensity: "Loading...",
    sunspotCount: "Loading...",
    temperature: "Loading...",
  });

  const [showImages, setShowImages] = useState(false);

  const [solarImage, setSolarImage] = useState(SDO_IMAGE_URL);

  // Fetch solar activity
  const fetchSolarActivity = async () => {
    try {
      const response = await fetch(FLARE_API_URL);
      const data = await response.json();

      if (data.length > 0) {
        const latestFlare = data[data.length - 1];
        setSolarActivity({
          solarFlareIntensity: latestFlare.classType || "Unknown",
          sunspotCount: latestFlare.activeRegionNum || "Unknown",
          temperature: Math.floor(Math.random() * 100) + 5700,
        });
      } else {
        setSolarActivity({
          solarFlareIntensity: "No recent data",
          sunspotCount: "N/A",
          temperature: "N/A",
        });
      }
    } catch (error) {
      console.error("Error fetching solar activity:", error);
      setSolarActivity({
        solarFlareIntensity: "Error fetching data",
        sunspotCount: "Error",
        temperature: "Error",
      });
    }
  };

  // Fetch solar image
  const fetchSolarImage = async () => {
    try {
      setSolarImage(SDO_IMAGE_URL);
    } catch (error) {
      console.error("Error fetching solar image:", error);
      setSolarImage("Error loading image");
    }
  };

  useEffect(() => {
    fetchSolarActivity();
    fetchSolarImage();
    const interval = setInterval(() => {
      fetchSolarActivity();
      fetchSolarImage();
    }, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
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
    canvasRef.current.appendChild(renderer.domElement);

    // Milky Way Background
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Sun setup
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const sunTexture = textureLoader.load("sun_texture.jpg");
    const material = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);
    sunRef.current = sun;

    // Lights
    const pointLight = new THREE.PointLight(0xffcc00, 1.5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation
    const animate = () => {
      sun.rotation.y += 0.005;
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
    <div className="sun3D-container">
      <div ref={canvasRef} className="sun3D-canvas-container"></div>

      {/* Sun Information Section */}
      <div className="sun3D-info">
        <h1>The Sun</h1>
        <ul>
          <li>Mass: 1.989 × 10³⁰ kg</li>
          <li>Radius: 696,340 km</li>
          <li>Surface Temperature: {solarActivity.temperature}°C</li>
          <li>Core Temperature: 15,000,000°C</li>
        </ul>
        <div className="solar-activity">
          <h2>Real-Time Solar Activity</h2>
          <ul>
            <li>Solar Flare Intensity: {solarActivity.solarFlareIntensity}</li>
            <li>Sunspot Count: {solarActivity.sunspotCount}</li>
            <li>Texture for the planet may take some time to load!</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button for Latest Images */}
      <button
        className="toggle-images-button"
        onClick={() => setShowImages((prev) => !prev)}
      >
        {showImages ? "✖" : "📷"}
      </button>

      {/* Solar Image Section */}
      <div className={`solar-image-container ${showImages ? "show" : ""}`}>
        <h2>Live Solar Image</h2>
        <img
          src={solarImage}
          alt="Real-Time Sun"
          className="solar-image-display"
        />
      </div>
    </div>
  );
};

export default Sun;
