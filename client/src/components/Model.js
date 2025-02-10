import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ modelPath }) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (modelPath) {
      const loader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();

      loader.load(
        `${process.env.REACT_APP_API}${modelPath}`,
        (gltf) => {
          const loadedModel = gltf.scene;

          // Traverse through all the objects in the model
          loadedModel.traverse((child) => {
            // Apply default material if mesh doesn't have one
            if (child.isMesh) {
              if (!child.material) {
                child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
              }

              // If the mesh has textures, apply them
              if (child.material.map) {
                child.material.map = textureLoader.load(child.material.map);
              }

              // You can also apply other textures, such as normal maps, roughness maps, etc.
              // if (child.material.normalMap) {
              //   child.material.normalMap = textureLoader.load(child.material.normalMap);
              // }

              // Ensure the material uses proper settings for rendering
              child.material.needsUpdate = true;
            }
          });

          setModel(loadedModel);
          setIsLoading(false);
        },
        undefined,
        (err) => {
          console.error('Error loading model', err);
          setError('Failed to load model');
          setIsLoading(false);
        }
      );
    }
  }, [modelPath]);

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-blue-500 text-xl">Loading model...</div>;
  }

  return (
    <div className="w-[90%] md:w-[100%] mx-[auto] h-[300px] md:h-[600px] relative flex justify-center items-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [5, 5, 13], fov: 100 }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />

        {/* Model rendering */}
        {model && <primitive object={model} position={[0, -5, 0]} scale={[1, 1, 1]} />}
        
        {/* Controls for Orbiting around the model */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Model;
