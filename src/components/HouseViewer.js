import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const HouseViewer = ({ setProgress }) => {
  const containerRef = useRef();

  useEffect(() => {
    // Initialize the Three.js scene
    setProgress(40);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333); // Set the background color to light grayish
    containerRef.current.appendChild(renderer.domElement);

    setProgress(60);
    // Load 3D model
    const loader = new GLTFLoader();
    let houseModel;

    loader.load(
      "autumn_house.glb",
      (gltf) => {
        houseModel = gltf.scene;
        houseModel.scale.set(0.1, 0.1, 0.1);
        scene.add(houseModel);
      },
      undefined,
      (error) => {
        console.error("Error loading the GLTF model:", error.message);
      }
    );

    setProgress(80);

    // Position the camera as described
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;
    camera.lookAt(0, 0, 0);

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.intensity = 100; // Increase the intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Set up interactivity (rotation, zoom, and panning)
    // eslint-disable-next-line
    const controls = new OrbitControls(camera, renderer.domElement);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
    setProgress(100);
    // eslint-disable-next-line
  }, []);

  return <div ref={containerRef} />;
};

export default HouseViewer;
