import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { forwardRef } from 'react'
import { MOUSE, Quaternion } from 'three'

const Controls = forwardRef(({ isLoggedIn }: { isLoggedIn: boolean }, ref) => {
  const { camera, gl } = useThree()
  const minDistance = 0.7
  const maxDistance = 3

  useFrame(() => {
    if (camera.position.z < 1) {
      const quaternion = new Quaternion(0.5, 0, 0, 1)
      camera.applyQuaternion(quaternion) // Apply Quaternion
      camera.quaternion.normalize() // Normalize Quaternion
    }
  })

  return (
    <OrbitControls
      // @ts-ignore
      ref={ref}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minAzimuthAngle={0}
      maxAzimuthAngle={0}
      dampingFactor={0.2}
      autoRotate={false}
      enableRotate={false}
      enablePan={isLoggedIn}
      enableZoom={isLoggedIn}
      zoomSpeed={0.9}
      mouseButtons={{
        LEFT: MOUSE.PAN,
      }}
      args={[camera, gl.domElement]}
      enableDamping
    />
  )
})

Controls.displayName = 'Controls'

export { Controls }
