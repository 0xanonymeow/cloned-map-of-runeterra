import { FadingMesh } from '@/components/FadingMesh'
import { useRef, useState } from 'react'

export const useFadingMesh = () => {
  const meshRef = useRef()
  const [fade, setFade] = useState(false)

  return {
    FadingMesh: () => <FadingMesh meshRef={meshRef} fade={fade} />,
    fade: () => setFade(true),
  }
}
