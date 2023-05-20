'use client'

import { Controls } from '@/components/Controls'
import { Regions } from '@/components/Regions'
import { Terrain } from '@/components/Terrain'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'

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
        <Regions />
      </Canvas>
    </main>
  )
}

export default Home
