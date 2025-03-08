"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Visualizer = () => {
  const [values, setValues] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const canvasContainer = useRef(null);
  const sceneInstance = useRef(null);
  const cameraInstance = useRef(null);
  const rendererInstance = useRef(null);

  // Generate an array with random values
  useEffect(() => {
    const initializeArray = (size) => {
      let randomArray = [];
      for (let i = 0; i < size; i++) {
        randomArray.push(Math.floor(Math.random() * 100) + 1);
      }
      setValues(randomArray);
    };

    const screenWidth = window.innerWidth;
    const defaultSize = screenWidth < 768 ? 30 : 50;
    initializeArray(defaultSize); // Set array size based on screen width
  }, []);

  // Set up Three.js and handle resizing
  useEffect(() => {
    if (!sceneInstance.current) {
      const scene = new THREE.Scene();
      sceneInstance.current = scene;
    }

    if (!cameraInstance.current) {
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 100;
      cameraInstance.current = camera;
    }

    if (!rendererInstance.current) {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasContainer.current.appendChild(renderer.domElement);
      rendererInstance.current = renderer;
    }

    sceneInstance.current.background = new THREE.Color(0xeeeeee);

    // Function to normalize array values to fit the canvas
    const normalizeValue = (value) => {
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      const range = maxValue - minValue;
      return range === 0 ? 1 : (value - minValue) / range * 100;
    };

    // Render the array of bars (each representing a value)
    const renderBars = (arr) => {
      const scene = sceneInstance.current;
      const camera = cameraInstance.current;
      const renderer = rendererInstance.current;

      // Clear previous objects from the scene
      while (scene.children.length) {
        const child = scene.children.pop();
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
        scene.remove(child);
      }

      arr.forEach((value, index) => {
        if (isNaN(value) || !Number.isFinite(value)) return;

        const scaledHeight = normalizeValue(value);
        const geometry = new THREE.BoxGeometry(1, scaledHeight, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(index - arr.length / 2, scaledHeight / 2, 0);
        scene.add(cube);
      });

      // Adjust camera to fit the array
      camera.position.z = 100 + Math.max(...arr) / 2;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      renderer.render(scene, camera);
    };

    renderBars(values);

    const animateScene = () => {
      requestAnimationFrame(animateScene);
      const scene = sceneInstance.current;
      const camera = cameraInstance.current;
      const renderer = rendererInstance.current;
      renderer.render(scene, camera);
    };
    animateScene();

    // Resize handler to make the scene responsive
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Resize the renderer to fit the new window size
      rendererInstance.current.setSize(width, height);

      // Adjust camera's aspect ratio and projection matrix
      const camera = cameraInstance.current;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      const scene = sceneInstance.current;
      const renderer = rendererInstance.current;

      renderer.dispose();
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });

      window.removeEventListener("resize", handleWindowResize);
    };
  }, [values]);

  // Sorting algorithm (Bubble Sort)
  const bubbleSort = async (arr) => {
    let updatedArray = [...arr];
    let hasSwaps;
    for (let i = 0; i < updatedArray.length; i++) {
      hasSwaps = false;
      for (let j = 0; j < updatedArray.length - i - 1; j++) {
        if (updatedArray[j] > updatedArray[j + 1]) {
          [updatedArray[j], updatedArray[j + 1]] = [updatedArray[j + 1], updatedArray[j]];
          hasSwaps = true;
          setValues([...updatedArray]);
          await new Promise((resolve) => setTimeout(resolve, 10)); // Delay for visualization
        }
      }
      if (!hasSwaps) break; // Exit early if no swaps were made
    }
  };

  const startSortingProcess = () => {
    if (!isSorting) {
      setIsSorting(true);
      bubbleSort(values);
    }
  };

  return (
    <div className="visualizer-container">
      <h1>Sorting Visualizer</h1>
      <button onClick={startSortingProcess} disabled={isSorting}>
        Start Sorting
      </button>
      <div ref={canvasContainer}></div>
    </div>
  );
};

export default Visualizer;