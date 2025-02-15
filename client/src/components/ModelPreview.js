import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';  // Import the entire THREE namespace
import { ClipLoader } from 'react-spinners';

const ModelPreview = ({ modelPath }) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (modelPath) {
      const loader = new GLTFLoader();
      loader.load(
        `${modelPath}`,
        (gltf) => {
          const loadedModel = gltf.scene;

          // Ensure all meshes have a material
          loadedModel.traverse((child) => {
            if (child.isMesh && !child.material) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // Default gray material
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
    <div className="w-[90%] md:w-[100%] mx-[auto] h-[300px] relative flex justify-center items-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [10, 10, 10], fov: 75 }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />

        {/* Model rendering */}
        {model && <primitive object={model} position={[5, 0, 5]} scale={[50, 50, 50]} />}

        {/* Controls for Orbiting around the model */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelPreview;
