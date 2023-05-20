'use client'

import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MOUSE, TextureLoader } from 'three'

const Terrain = () => {
  const [height, texture, specular] = useLoader(TextureLoader, [
    '/assets/images/tiles/depth_z1.jpg',
    '/assets/images/tiles/terrain_z1.jpg',
    '/assets/images/tiles/ocean_z1.jpg',
  ])

  return (
    <mesh>
      <Plane args={[8, 8, 1000, 1000]}>
        <meshPhongMaterial
          attach="material"
          map={texture}
          displacementMap={height}
          displacementScale={1}
          specularMap={specular}
          shininess={500}
        />
      </Plane>
    </mesh>
  )
}

const Controls = () => {
  const controls = useRef()
  const { camera, gl } = useThree()
  const [lastValidMaxDistance, setLastValidMaxDistance] = useState(3) // Initial value

  const calculateMaxDistance = () => {
    const vFOV = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
    const ratio = 2 * Math.tan(vFOV / 2) // visible height
    const screen = ratio * (window.innerWidth / window.innerHeight) // visible width

    // Use the size of the plane
    const size = 8

    if (window.innerWidth >= window.innerHeight)
      setLastValidMaxDistance(size / screen)
  }

  useEffect(() => {
    calculateMaxDistance()
    window.addEventListener('resize', calculateMaxDistance)

    // Clean up when the component unmounts
    return () => window.removeEventListener('resize', calculateMaxDistance)
  }, [camera, controls])

  return (
    <OrbitControls
      ref={controls}
      minDistance={1}
      maxDistance={lastValidMaxDistance}
      dampingFactor={0.1}
      enableRotate={false}
      // enableZoom={false}
      mouseButtons={{
        LEFT: MOUSE.PAN,
      }}
      args={[camera, gl.domElement]}
      enableDamping
    />
  )
}

const Home = () => {
  return (
    <main className="w-screen h-screen">
      <Image src="/loading-background.jpg" fill alt="loading-background" />
      <Canvas>
        <PerspectiveCamera
          fov={75}
          position={[0, 0, 10]}
          near={0.1}
          far={100}
        />
        <directionalLight position={[0, 0, 1]} intensity={1} />
        <Terrain />
        <Controls />
      </Canvas>
    </main>
  )
}

export default Home
