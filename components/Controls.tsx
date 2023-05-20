import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { MOUSE, Vector3 } from 'three'

export const Controls = () => {
  const controls = useRef()
  const { camera, gl } = useThree()
  const [lastValidMaxDistance, setLastValidMaxDistance] = useState(3) // Initial value
  const minDistance = 1.2

  const calculateMaxDistance = () => {
    const vFOV = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
    const ratio = 2 * Math.tan(vFOV / 2) // visible height
    const screen = ratio * (window.innerWidth / window.innerHeight) // visible width

    // Use the size of the plane
    const size = 8

    if (window.innerWidth >= window.innerHeight)
      setLastValidMaxDistance(size / screen)
  }

  useEffect(() => {
    if (!controls.current || !controls.current.target) return

    const getZoomLevel = () => {
      return camera.position.distanceTo(controls.current.target)
    }

    const smoothness = 0.1 // 0 to 1 only
    let targetPosition = controls.current.target.clone()

    const zoom = (event) => {
      console.log(controls.current.getPolarAngle())
      const currentZoomLevel = getZoomLevel()

      let direction = new Vector3(0, 0, 0)
      if (event.deltaY < 0) {
        // scrolling up, zoom in
        direction = new Vector3(0, 0, -1) // negative to move closer
      } else if (event.deltaY > 0) {
        // scrolling down, zoom out
        direction = new Vector3(0, 0, 1)
      }

      // calculate potential target position
      let potentialTarget = new Vector3().addVectors(
        camera.position,
        direction.multiplyScalar(Math.abs(event.deltaY) * 0.01) // adjust zoom speed here
      )

      // check if the potential target position is within the valid range
      let distance = controls.current.target.distanceTo(potentialTarget)
      if (distance < minDistance) {
        // if too close, adjust it to be exactly at the min distance
        let direction = potentialTarget
          .clone()
          .sub(controls.current.target)
          .normalize()
        targetPosition = new Vector3().addVectors(
          controls.current.target,
          direction.multiplyScalar(minDistance)
        )
      } else if (distance > lastValidMaxDistance) {
        // if too far, adjust it to be exactly at the max distance
        let direction = potentialTarget
          .clone()
          .sub(controls.current.target)
          .normalize()
        targetPosition = new Vector3().addVectors(
          controls.current.target,
          direction.multiplyScalar(lastValidMaxDistance)
        )
      } else {
        // if within valid range, set it as the target position
        targetPosition = potentialTarget
      }

      // check if camera position z would be less than 0
      if (targetPosition.z < 0) {
        targetPosition.z = 0
      }

      if (currentZoomLevel <= 1.8) {
        targetPosition.y = -0.25
        targetPosition
      } else if (currentZoomLevel <= 1.5) {
        targetPosition.y = -0.5
        targetPosition
      } else if (currentZoomLevel > 1.5) {
        targetPosition.y = 0
      }

      camera.position.lerp(targetPosition, smoothness)
    }

    window.addEventListener('wheel', zoom)

    return () => window.removeEventListener('wheel', zoom)
  }, [camera.position, controls.current, camera.fov, lastValidMaxDistance])

  useEffect(() => {
    calculateMaxDistance()
    window.addEventListener('resize', calculateMaxDistance)

    // Clean up when the component unmounts
    return () => window.removeEventListener('resize', calculateMaxDistance)
  }, [camera, controls])

  return (
    <OrbitControls
      ref={controls}
      minDistance={minDistance}
      maxDistance={lastValidMaxDistance}
      // maxPolarAngle={-0.5}
      dampingFactor={0.1}
      autoRotate={false}
      enableRotate={false}
      enableZoom={false}
      zoomSpeed={0.8}
      mouseButtons={{
        LEFT: MOUSE.PAN,
      }}
      args={[camera, gl.domElement]}
      enableDamping
    />
  )
}
