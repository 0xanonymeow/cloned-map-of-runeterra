'use client'

import { Canvas } from '@react-three/fiber'

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen">
      <Canvas
        shadows
        className=""
        camera={{
          position: [-6, 7, 7],
        }}
      ></Canvas>
    </main>
  )
}
