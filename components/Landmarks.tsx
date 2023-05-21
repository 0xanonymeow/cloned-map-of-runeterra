import { useLoader } from '@react-three/fiber'
import { map } from 'lodash'
import { Mesh, MeshBasicMaterial, TextureLoader } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const pos = [[-0.75, 1.6]]

const objToPrimitive = ({ obj, texture }) => {
  obj.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = new MeshBasicMaterial()
      child.material.material = mat
      child.material.map = texture
      child.rotation.x = 1.05
      child.rotation.y = 0
      child.rotation.z = 0.2
    }
  })
  return <primitive object={obj} />
}

export const Landmarks = () => {
  const objs = useLoader(OBJLoader, ['/assets/obj/landmarks/frostguard.obj'])
  const textures = useLoader(TextureLoader, [
    '/assets/obj/landmarks/frostguard.jpg',
  ])

  return (
    <group>
      {map(objs, (obj, i) => (
        <mesh key={i} position={[...pos[i], 0.1]} scale={[0.05, 0.05, 0.05]}>
          {objToPrimitive({ obj, texture: textures[i] })}
        </mesh>
      ))}
    </group>
  )
}
