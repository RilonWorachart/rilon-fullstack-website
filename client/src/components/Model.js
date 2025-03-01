import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ClipLoader } from 'react-spinners';

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
              if (child.material.normalMap) {
                child.material.normalMap = textureLoader.load(child.material.normalMap);
              }

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
    return <div className="text-red-500 text-xl flex justify-center items-center py-[20px]">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-blue-500 text-xl text-center flex justify-center items-center py-[20px]">
      <ClipLoader color="#3498db" loading={true} size={50} />
    </div>;
  }

  return (
    <div className="w-[90%] md:w-[100%] mx-[auto] h-[300px] md:h-[600px] relative flex justify-center items-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [10, 10, 10], fov: 75 }}
        style={{ background: '#FFFFFF' }}
      >
        {/* 13-15cm */}
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} />

        {/* Model rendering */}
        {model && <primitive object={model} position={[5, 0, 5]} scale={[50, 50, 50]} />}
        
        {/* Controls for Orbiting around the model */}
        <OrbitControls 
           enableZoom={true}         // Enable zooming
           enablePan={true}          // Enable panning
           maxDistance={15}         // Max zoom-out distance
           minDistance={2}          // Min zoom-in distance
           rotateSpeed={0.8}         // Speed of rotation
           zoomSpeed={0.5}           // Speed of zooming
           panSpeed={0.3}            // Speed of panning
           enableDamping={true}      // Enable smooth damping
           dampingFactor={0.25}      // Damping factor for smooth control
           target={[3, 3, 3]}       // Point to rotate around        
        />
      </Canvas>
    </div>
  );
};

export default Model;
