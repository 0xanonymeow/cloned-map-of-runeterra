import { useFonts } from '@/hooks/useFonts'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import TextTexture from '@seregpie/three.text-texture'
import { map } from 'lodash'
import { useState } from 'react'
import { Mesh, MeshBasicMaterial, TextureLoader } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const pos = [[-0.75, 1.6]]

const objToPrimitive = ({ obj, texture, hide }) => {
  obj.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = new MeshBasicMaterial()
      child.material.material = mat
      child.material.map = texture
      child.rotation.x = 1.05
      child.rotation.y = 0
      child.rotation.z = 0
      child.visible = hide ? false : true
    }
  })
  return <primitive object={obj} />
}

export const Landmarks = () => {
  const objs = useLoader(OBJLoader, ['/assets/obj/landmarks/frostguard.obj'])
  const textures = useLoader(TextureLoader, [
    '/assets/obj/landmarks/frostguard.jpg',
  ])
  const icon = useLoader(TextureLoader, '/assets/images/pins/capital.png')

  const [hide, setHide] = useState(false)
  const { camera } = useThree()

  const { BeaufortforLOL } = useFonts()

  const textTexture = new TextTexture({
    fontSize: 16,
    text: 'THE FROSTGUARD CITADEL',
    fontFamily: BeaufortforLOL.style.fontFamily,
    strokeColor: '#392618',
    strokeWidth: 0.085,
  })
  textTexture.redraw()

  useFrame(() => {
    setHide(camera.position.z > 1)
  })

  return (
    <group>
      {map(objs, (obj, i) => (
        <mesh key={i} position={[...pos[i], 0.1]} scale={[0.05, 0.05, 0.05]}>
          {objToPrimitive({ obj, texture: textures[i], hide })}
        </mesh>
      ))}
      <sprite position={[-0.85, 1.35, 0.1]} scale={[0.05, 0.05, 1]}>
        <spriteMaterial map={icon} opacity={hide ? 0 : 1} />
      </sprite>
      <sprite scale={[0.3, 0.05, 0]} position={[-0.82, 1.21, 0.2]}>
        <spriteMaterial map={textTexture} opacity={hide ? 0 : 1} />
      </sprite>
    </group>
  )
}
