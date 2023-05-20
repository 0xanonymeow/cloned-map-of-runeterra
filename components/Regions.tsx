import { useLoader } from '@react-three/fiber'
import { map } from 'lodash'
import { TextureLoader } from 'three'

const pos = [
  [-1.3, 1],
  [-0.03, 0.6],
  [2.16, 0.85],
  [-1.6, 0.25],
  [0.65, -0.4],
  [2, -0.65],
  [-0.85, -1.35],
  [0.2, -1.25],
  [1, -1.2],
  [2.45, -1.35],
]

export const Regions = () => {
  const textures = useLoader(TextureLoader, [
    '/assets/images/regions/freljord.png',
    '/assets/images/regions/noxus.png',
    '/assets/images/regions/ionia.png',
    '/assets/images/regions/demacia.png',
    '/assets/images/regions/piltover-zaun.png',
    '/assets/images/regions/bilgewater.png',
    '/assets/images/regions/targon.png',
    '/assets/images/regions/shurima.png',
    '/assets/images/regions/ixtal.png',
    '/assets/images/regions/shadow-isles.png',
  ])
  const hoverTextures = useLoader(TextureLoader, [
    '/assets/images/regions/freljord-hover.png',
    '/assets/images/regions/noxus-hover.png',
    '/assets/images/regions/ionia-hover.png',
    '/assets/images/regions/demacia-hover.png',
    '/assets/images/regions/piltover-zaun-hover.png',
    '/assets/images/regions/bilgewater-hover.png',
    '/assets/images/regions/targon-hover.png',
    '/assets/images/regions/shurima-hover.png',
    '/assets/images/regions/ixtal-hover.png',
    '/assets/images/regions/shadow-isles-hover.png',
  ])

  return (
    <group>
      {map(textures, (texture, i) => (
        <sprite
          scale={[
            0.25,
            i === 4 // pilover & zaun
              ? 0.5
              : 0.25,
            0,
          ]}
          position={[...pos[i], 0.3]}
        >
          <spriteMaterial map={texture} />
        </sprite>
      ))}
    </group>
  )
}
