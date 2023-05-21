import { useFrame } from '@react-three/fiber'
import { Color } from 'three'

export const FadingMesh = ({ meshRef, fade }) => {
  // Animation logic
  useFrame(() => {
    if (!fade) return
    if (meshRef.current.material.opacity > 0) {
      meshRef.current.material.opacity -= 0.01
      meshRef.current.material.needsUpdate = true
    } else {
      meshRef.current.material.needsUpdate = false
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[7.8, 7.8, fade ? 0 : 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        color={new Color(0x000000)}
      />
    </mesh>
  )
}
