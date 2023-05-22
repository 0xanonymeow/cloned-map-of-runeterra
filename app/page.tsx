'use client'

import { Controls } from '@/components/Controls'
import { FreljordSidebarContent } from '@/components/FreljordSidebarContent'
import { Landmarks } from '@/components/Landmarks'
import { Regions } from '@/components/Regions'
import { Sidebar } from '@/components/Sidebar'
import { Terrain } from '@/components/Terrain'
import { Web3Connect } from '@/components/Web3Connect'
import { useFadingMesh } from '@/hooks/useFadingMesh'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useRef, useState } from 'react'

const Home = () => {
  const { FadingMesh, fade } = useFadingMesh()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hideMenu, setHideMenu] = useState(false)
  const [buttonOpacity, setButtonOpacity] = useState(0)
  const controlsRef = useRef()

  const [isExpanded, setIsExpanded] = useState(false)
  const contentToElement: { [key: string]: JSX.Element } = {
    freljord: <FreljordSidebarContent />,
  }
  const [content, setContent] = useState('freljord')

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    fade()
    setHideMenu(true)
  }, [isLoggedIn, fade, setHideMenu])

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonOpacity(1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setButtonOpacity])

  return (
    <main data-aos="fade-in" className="w-screen h-screen bg-white">
      <Image src="/loading-background.jpg" fill alt="loading-background" />
      <Web3Connect
        setIsLoggedIn={setIsLoggedIn}
        hide={hideMenu}
        buttonOpacity={buttonOpacity}
      />
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
        {contentToElement[content]}
      </Sidebar>
      <Canvas data-aos="fade-in">
        <PerspectiveCamera fov={75} position={[0, 0, 1]} near={0.1} far={100} />
        <directionalLight position={[0, 0, 1]} intensity={1} />
        <Controls ref={controlsRef} isLoggedIn={isLoggedIn} />
        <FadingMesh />
        <Terrain />
        <Regions
          ref={controlsRef}
          setContent={setContent}
          setIsExpanded={setIsExpanded}
        />
        <Landmarks setContent={setContent} setIsExpanded={setIsExpanded} />
      </Canvas>
    </main>
  )
}

export default Home
