'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen">
      <Image src="/loading-background.jpg" fill alt="loading-background" />
    </main>
  )
}
