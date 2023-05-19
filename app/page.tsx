'use client'

import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import Image from 'next/image'
import { useRef } from 'react'
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

  return (
    <OrbitControls
      ref={controls}
      minDistance={1}
      maxDistance={3}
      dampingFactor={0.1}
      enableRotate={false}
      enableZoom={false}
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
