/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../Jupiter/Jupiter.css";

const Neptune = () => {
  const canvasRef = useRef(null);

  const planetaryInfo = {
    mass: "1.024 × 10^26 kg",
    radius: "24,622 km",
    temperature: "55 K (-218°C)",
    gravity: "11.15 m/s²",
  };

  const [showImages, setShowImages] = useState(false);


  const initThreeJS = () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Enable shadows
    canvasRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load("bg.jpg");
    scene.background = backgroundTexture;

    // Neptune setup
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const neptuneTexture = textureLoader.load("neptune_texture.jpg");
    const material = new THREE.MeshStandardMaterial({ map: neptuneTexture });
    const neptune = new THREE.Mesh(geometry, material);
    neptune.castShadow = true; // Neptune casts shadows
    neptune.rotation.z = THREE.MathUtils.degToRad(0); // Tilt Saturn
    neptune.rotation.y = THREE.MathUtils.degToRad(26.7);
    scene.add(neptune);

    // Neptune Rings
    const ringGeometry = new THREE.RingGeometry(5.5, 7, 256);
    const ringTexture = textureLoader.load("saturn_ring_texture.png");
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.position.set(0, 0, 0.1);
    rings.rotation.x = THREE.MathUtils.degToRad(90); // Horizontal rotation
    rings.rotation.y = THREE.MathUtils.degToRad(0); // Horizontal rotation
    // scene.add(rings);

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.castShadow = true; // Enable shadows for the light
    directionalLight.shadow.mapSize.width = 2048; // Shadow resolution
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    let lightTime = 0;

    // Animation
    const animate = () => {
      lightTime += 0.01;

      // Move light in a circular path
      directionalLight.position.set(
        Math.sin(lightTime) * 20, // Circular orbit along x
        10,                      // Fixed height (z-axis)
        Math.cos(lightTime) * 20 // Circular orbit along z
      );

      // Neptune rotation
      neptune.rotation.y += 0.005;

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
    <div className="jupiter3D-container">
      <div ref={canvasRef} className="jupiter3D-canvas-container"></div>

      <div className="jupiter3D-info">
        <h1>Neptune</h1>
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
      <h2>Latest Images of Neptune</h2>
        <img
          src={"neptune_lts.webp"}
          alt="Latest view of Neptune"
          className="jupiter-texture-display"
        />
    </div>
  </div>
  );
};

export default Neptune;
