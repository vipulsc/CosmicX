import React, {useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Uranus/Uranus.css";

const Uranus = () => {
  const canvasRef = useRef(null);

  const planetaryInfo = {
    mass: "8.681 × 10^25 kg",
    radius: "25,362 km",
    temperature: "76 K (-197°C)",
    gravity: "8.87 m/s²",
  };


    const [showImages, setShowImages] = useState(false);
  
  const initThreeJS = () => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(20, 10, 50);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    canvasRef.current.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Uranus
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const uranusTexture = textureLoader.load("uranus.jpg");
    const material = new THREE.MeshStandardMaterial({ 
      map: uranusTexture,
      roughness: 0.7,
      metalness: 0.2
    });
    const uranus = new THREE.Mesh(geometry, material);
    uranus.castShadow = true;
    uranus.rotation.z = THREE.MathUtils.degToRad(0); 
    uranus.rotation.y = THREE.MathUtils.degToRad(97.77);
    scene.add(uranus);

    // Uranus Rings
    const ringGeometry = new THREE.RingGeometry(5.5, 6, 128);
    const ringTexture = textureLoader.load("./uranus_rings.jpg");
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      roughness: 0.8,
      metalness: 0.1
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.position.set(0, 0, 0);
    rings.rotation.x = THREE.MathUtils.degToRad(0);
    rings.rotation.z = THREE.MathUtils.degToRad(-97.77);
    scene.add(rings);

    // Realistic Sunlight
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

      // Reduced rotation speed
      uranus.rotation.y += 0.002;
      rings.rotation.z += 0.002;

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

    // Cleanup
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
    <div className="uranus3D-container">
      <div ref={canvasRef} className="uranus3D-canvas-container"></div>

      <div className="uranus3D-info">
        <h1>Uranus</h1>
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

      <div className={`uranus-texture-container ${showImages ? 'show' : ''}`}>
        <h2>Latest Images of Uranus</h2>
        <img
          src={"uranus_lts.jpg"}
          alt="Live view of Uranus"
          className="uranus-texture-display"
        />
      </div>
    </div>
  );
};

export default Uranus;