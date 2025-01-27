import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Saturn.css";

const PLANETARY_API_URL = "https://api.le-systeme-solaire.net/rest/bodies/saturn";
const NASA_API_URL = "https://images-api.nasa.gov/search?q=saturn&media_type=image";

const Saturn = () => {
  const canvasRef = useRef(null);

  const [planetaryInfo, setPlanetaryInfo] = useState({
    mass: "Loading...",
    radius: "Loading...",
    temperature: "Loading...",
    gravity: "Loading...",
  });

  const [showImages, setShowImages] = useState(false);

  const [latestSaturnPhoto, setLatestSaturnPhoto] = useState(null);

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
      console.error("Error fetching Saturn data:", error);
    }
  };

  const fetchLatestSaturnPhoto = async () => {
    try {
      const response = await fetch(NASA_API_URL);
      const data = await response.json();

      const items = data.collection?.items || [];
      const firstImage = items.find((item) =>
        item.links?.some((link) => link.href.endsWith(".jpg"))
      );

      if (firstImage) {
        const imageUrl = firstImage.links.find((link) => link.href.endsWith(".jpg")).href;
        setLatestSaturnPhoto(imageUrl);
      } else {
        console.error("No images found.");
      }
    } catch (error) {
      console.error("Error fetching latest Saturn photo:", error);
    }
  };

  useEffect(() => {
    fetchPlanetaryData();
    fetchLatestSaturnPhoto();

    const dataInterval = setInterval(() => fetchPlanetaryData(), 300000);
    const photoInterval = setInterval(() => fetchLatestSaturnPhoto(), 300000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(photoInterval);
    };
  }, []);

  const initThreeJS = () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.4,
      1000
    );
    camera.position.set(0, 10, 40);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // Saturn Textures
    const saturnTexture = textureLoader.load("saturn_texture.jpg");
    const bumpMap = textureLoader.load("saturn_texture.jpg");

    // Saturn Model
    const saturnGeometry = new THREE.SphereGeometry(5, 128, 128);
    const saturnMaterial = new THREE.MeshStandardMaterial({
      map: saturnTexture,
      bumpMap: bumpMap,
      bumpScale: 0.1,
      roughness: 0.7,
      metalness: 0.2
    });
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturn.rotation.z = THREE.MathUtils.degToRad(0);
    saturn.rotation.y = THREE.MathUtils.degToRad(26.7);
    scene.add(saturn);

    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Saturn Rings
    const ringGeometry = new THREE.RingGeometry(6, 10, 256);
    const ringTexture = textureLoader.load("saturn_ring_texture.png");
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      roughness: 0.8,
      metalness: 0.1
    });
    const saturnRings = new THREE.Mesh(ringGeometry, ringMaterial);
    saturnRings.position.set(0, 0, 0.2);
    saturnRings.rotation.x = THREE.MathUtils.degToRad(90); 
    saturnRings.rotation.y = THREE.MathUtils.degToRad(26.7); 
    saturnRings.rotation.z = THREE.MathUtils.degToRad(27);
    scene.add(saturnRings);

    // Rotating Sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    scene.add(sunLight);

    // Soft ambient light 
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation
    let lightTime = 0;
    const animate = () => {
      // Rotate light to simulate sun's movement
      lightTime += 0.008;
      sunLight.position.set(
        Math.sin(lightTime) * 40,  // Circular orbit along x
        15,                        // Fixed height 
        Math.cos(lightTime) * 40   // Circular orbit along z
      );
      sunLight.position.normalize();

      saturn.rotation.y += 0.002;
      saturnRings.rotation.z += -0.002;
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

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
        <h1>Saturn</h1>
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
        <h2>Latest Images of Saturn</h2>
        {latestSaturnPhoto ? (
          <img
            src={latestSaturnPhoto}
            alt="Live view of Saturn"
            className="jupiter-texture-display"
          />
        ) : (
          <p>Loading latest image of Saturn...</p>
        )}
      </div>
    </div>
  );
};

export default Saturn;