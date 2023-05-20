'use client'

import { Controls } from '@/components/Controls'
import { Regions } from '@/components/Regions'
import { Terrain } from '@/components/Terrain'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  ConnectWallet,
  ThirdwebProvider,
  metamaskWallet,
  useAddress,
} from '@thirdweb-dev/react'
import Image from 'next/image'

const Home = () => {
  const { FadingMesh, fade } = useFadingMesh()
  useEffect(() => {
    if (isConnected) return
    fade()
  }, [isConnected])

  return (
    <main data-aos="fade-in" className="w-screen h-screen">
                fontFamily: BeaufortforLOL.style.fontFamily,
                WebkitTextStroke: '2px #d4af37',
              }}
            >
              RUNETERRA
            </text>
            <ConnectWallet
              theme="dark"
              btnTitle="BEGIN EXPLORING"
              style={{
                height: 58,
                borderRadius: 0,
                backgroundImage: 'linear-gradient(#171b21,#171b21)',
                color: 'white',
                borderStyle: 'solid',
                borderColor: '#d4af37',
          </div>
      <Canvas data-aos="fade-in">
        <PerspectiveCamera fov={75} position={[0, 0, 1]} near={0.1} far={100} />
        <directionalLight position={[0, 0, 1]} intensity={1} />
        <Controls isConnected={isConnected} />
        <FadingMesh />
        <Terrain />
        <Regions />
      </Canvas>
    </main>
  )
}

export default Home
