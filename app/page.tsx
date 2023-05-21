'use client'

import { ConnectionStatus } from '@/components/ConnectionStatus'
import { Controls } from '@/components/Controls'
import { Landmarks } from '@/components/Landmarks'
import { Regions } from '@/components/Regions'
import { Terrain } from '@/components/Terrain'
import { useFadingMesh } from '@/hooks/useFadingMesh'
import { useFonts } from '@/hooks/useFonts'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  ConnectWallet,
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home = () => {
  const { FadingMesh, fade } = useFadingMesh()

  const { BeaufortforLOL } = useFonts()
  const [buttonOpacity, setButtonOpacity] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hideMenu, setHideMenu] = useState(false)

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    fade()
    setHideMenu(true)
  }, [isLoggedIn])

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonOpacity(1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main data-aos="fade-in" className="w-screen h-screen">
      <ThirdwebProvider
        supportedWallets={[metamaskWallet(), walletConnect()]}
        activeChain="ethereum"
        autoConnect={false}
      >
        <ConnectionStatus setIsLoggedIn={setIsLoggedIn} />
        <Image src="/loading-background.jpg" fill alt="loading-background" />
        <div
          className="absolute top-[50%] left-[50%] z-10 translate-x-[-50%] translate-y-[-25%] flex flex-col items-center"
          style={{
            opacity: hideMenu ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
        >
          <p
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="300"
            className="text-lg -mb-8"
            style={{
              color: '#d4af37',
              fontFamily: BeaufortforLOL.style.fontFamily,
              WebkitTextStroke: '0.5px #d4af37',
            }}
          >
            EXPLORE & DISCOVER
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="1200"
            data-aos-duration="600"
            className="text-[100px] font-bold mb-60 text-white"
            style={{
              fontFamily: BeaufortforLOL.style.fontFamily,
              WebkitTextStroke: '0.5px #d4af37',
            }}
          >
            RUNETERRA
          </p>
          <ConnectWallet
            theme="dark"
            btnTitle="BEGIN EXPLORING"
            style={{
              height: 58,
              width: 195,
              borderRadius: 0,
              backgroundImage: 'linear-gradient(#171b21,#171b21)',
              fontSize: 14,
              fontFamily: BeaufortforLOL.style.fontFamily,
              color: 'white',
              borderStyle: 'solid',
              borderColor: '#d4af37',
              borderWidth: 3,
              opacity: buttonOpacity,
              transition: 'opacity 0.3s',
            }}
          />
        </div>
      </ThirdwebProvider>
      <Canvas data-aos="fade-in">
        <PerspectiveCamera fov={75} position={[0, 0, 1]} near={0.1} far={100} />
        <directionalLight position={[0, 0, 1]} intensity={1} />
        <Controls isLoggedIn={isLoggedIn} />
        <FadingMesh />
        <Terrain />
        <Regions />
        <Landmarks />
      </Canvas>
    </main>
  )
}

export default Home
