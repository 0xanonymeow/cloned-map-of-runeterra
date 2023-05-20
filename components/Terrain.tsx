import { Plane } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export const Terrain = () => {
  const [height, texture, specular] = useLoader(TextureLoader, [
    '/assets/images/tiles/depth_z1.jpg',
    '/assets/images/tiles/terrain_z1.jpg',
    '/assets/images/tiles/ocean_z1.jpg',
  ])

  return (
    <mesh>
      <Plane args={[7.8, 7.8, 1000, 1000]}>
        <meshPhongMaterial
          attach="material"
          map={texture}
          displacementMap={height}
          displacementScale={1}
          specularMap={specular}
          shininess={500}
        />
      </Plane>
    </mesh>
  )
}
