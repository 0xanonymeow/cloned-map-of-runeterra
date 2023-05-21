import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { forwardRef, useEffect, useState } from 'react'
import { MOUSE, Quaternion } from 'three'

const Controls = forwardRef(({ isLoggedIn }, ref) => {
  const { camera, gl } = useThree()
  const [lastValidMaxDistance, setLastValidMaxDistance] = useState(3) // Initial value
  const minDistance = 0.7

  const calculateMaxDistance = () => {
    const vFOV = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
    const ratio = 2 * Math.tan(vFOV / 2) // visible height
    const screen = ratio * (window.innerWidth / window.innerHeight) // visible width

    // Use the size of the plane
    const size = 7.8

    if (window.innerWidth >= window.innerHeight)
      setLastValidMaxDistance(size / screen)
  }

  useEffect(() => {
    calculateMaxDistance()
    window.addEventListener('resize', calculateMaxDistance)

    // Clean up when the component unmounts
    return () => window.removeEventListener('resize', calculateMaxDistance)
  }, [camera, ref])

  useFrame(() => {
    if (camera.position.z < 1) {
      const quaternion = new Quaternion(0.5, 0, 0, 1)
      camera.applyQuaternion(quaternion) // Apply Quaternion
      camera.quaternion.normalize() // Normalize Quaternion
    }
  })

  return (
    <OrbitControls
      ref={ref}
      minDistance={minDistance}
      maxDistance={lastValidMaxDistance}
      minAzimuthAngle={0}
      maxAzimuthAngle={0}
      dampingFactor={0.2}
      autoRotate={false}
      enableRotate={false}
      enablePan={isLoggedIn}
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
