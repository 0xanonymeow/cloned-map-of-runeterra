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
      <Plane args={[8, 8, 2, 2]}>
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
  const { camera, gl, size } = useThree()
  const [lastValidMaxDistance, setLastValidMaxDistance] = useState(10) // Initial value

  const planeSize = 8 // size of your plane
  const fov = 75 // Field of view of your camera

  const adjustCamera = () => {
    // Calculate the aspect ratio of the viewport
    const aspectRatio = gl.domElement.clientWidth / gl.domElement.clientHeight

    // If the aspect ratio is less than 1, that means the viewport is portrait,
    // so we should adjust the camera distance based on the height.
    // If it's greater than or equal to 1, the viewport is landscape,
    // so we should adjust the camera distance based on the width.
    const size = aspectRatio < 1 ? planeSize / aspectRatio : planeSize

    // Calculate the minimum distance required for the plane to fill the field of view
    const minDistance = size / 2 / Math.tan(((fov / 2) * Math.PI) / 180)

    camera.position.z = minDistance
    controls.current.update()
  }

  const calculateMaxDistance = () => {
    const vFOV = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
    const ratio = 2 * Math.tan(vFOV / 2) // visible height
    const screen = ratio * (window.innerWidth / window.innerHeight) // visible width

    // Use the size of your plane
    const size = 8

    if (window.innerWidth >= window.innerHeight)
      setLastValidMaxDistance(size / screen)
  }

  useEffect(() => {
    adjustCamera()
    window.addEventListener('resize', adjustCamera)

    // Clean up when the component unmounts
    return () => window.removeEventListener('resize', adjustCamera)
  }, [camera, controls])

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
