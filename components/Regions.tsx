import { useFonts } from '@/hooks/useFonts'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import TextTexture from '@seregpie/three.text-texture'
import { map, upperCase } from 'lodash'
import { Dispatch, SetStateAction, forwardRef, useState } from 'react'
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

const terrains = [
  'freljord',
  'noxus',
  'ionia',
  'demacia',
  'piltover & zaun',
  'bilgewater',
  'targon',
  'shurima',
  'ixtal',
  'shadow isles',
]

const terrainPos = [
  [-1.3, 0.85],
  [-0.03, 0.45],
  [2.16, 0.7],
  [-1.6, 0.1],
  [0.65, -0.65],
  [2, -0.8],
  [-0.85, -1.5],
  [0.2, -1.4],
  [1, -1.35],
  [2.45, -1.5],
]

const Regions = forwardRef(
  (
    {
      setContent,
      setIsExpanded,
    }: {
      setContent: Dispatch<SetStateAction<string>>
      setIsExpanded: Dispatch<SetStateAction<boolean>>
    },
    ref
  ) => {
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
    const terrainTextures = useLoader(TextureLoader, [
      '/assets/images/regions/terrain/freljord.png',
      '/assets/images/regions/terrain/noxus.png',
      '/assets/images/regions/terrain/ionia.png',
      '/assets/images/regions/terrain/demacia.png',
      '/assets/images/regions/terrain/bilgewater.png',
      '/assets/images/regions/terrain/targon.png',
      '/assets/images/regions/terrain/shurima.png',
      '/assets/images/regions/terrain/ixtal.png',
      '/assets/images/regions/terrain/shadow-isles.png',
    ])

    const [terrainOpacities, setTerrainOpacities] = useState([
      ...Array(9).fill(0),
    ])

    const [hide, setHide] = useState(false)

    const onHover = (e, i: number) => {
      e.eventObject.material.map = hoverTextures[i]
      if (i === 4) return // piltover & zaun
      if (i > 4) return onHoverTerrain(i - 1)
      onHoverTerrain(i)
    }

    const onLeave = (e, i: number) => {
      e.eventObject.material.map = textures[i]
      if (i === 4) return // piltover & zaun
      if (i > 4) return onLeaveTerrain(i - 1)
      onLeaveTerrain(i)
    }

    const onHoverTerrain = (i) => {
      const opacities = [...terrainOpacities]
      opacities[i] = 0.7
      setTerrainOpacities(opacities)
    }

    const onLeaveTerrain = (i) => {
      const opacities = [...terrainOpacities]
      opacities[i] = 0
      setTerrainOpacities(opacities)
    }

    const onClick = (e, i) => {
      const { x, y, z } = e.eventObject.position
      camera.position.x = x + 0.3
      camera.position.y = y - 0.4
      camera.position.z = 0.7
      ref.current.target.x = x + 0.3
      ref.current.target.y = y - 0.4

      if (i !== 0) return // freljord
      setContent('freljord')
      setIsExpanded(true)
    }

    const { BeaufortforLOL } = useFonts()
    const { camera } = useThree()

    useFrame(() => {
      setHide(camera.position.z < 1)
    })

    return (
      <group>
        {map(textures, (texture, i) => (
          <sprite
            key={i}
            onPointerOver={(e) => onHover(e, i)}
            onPointerLeave={(e) => onLeave(e, i)}
            onClick={(e) => onClick(e, i)}
            scale={[
              0.25,
              i === 4 // piltover & zaun
                ? 0.5
                : 0.25,
              0,
            ]}
            position={[...pos[i], 0.3]}
          >
            <spriteMaterial map={texture} opacity={hide ? 0 : 1} />
          </sprite>
        ))}
        {map(terrains, (terrain, i) => {
          const texture = new TextTexture({
            fontSize: 16,
            text: upperCase(terrain),
            fontFamily: BeaufortforLOL.style.fontFamily,
            strokeColor: '#392618',
            strokeWidth: 0.085,
          })
          texture.redraw()
          return (
            <sprite
              key={i}
              scale={[0.4, 0.15, 0]}
              position={[...terrainPos[i], 0.3]}
            >
              <spriteMaterial map={texture} opacity={hide ? 0 : 1} />
            </sprite>
          )
        })}
        {map(terrainTextures, (texture, i) => (
          <sprite key={i} scale={[7, 7, 0]} position={[0, 0, 0.3]}>
            <spriteMaterial
              map={texture}
              opacity={hide ? 0 : terrainOpacities[i]}
            />
          </sprite>
        ))}
      </group>
    )
  }
)

Regions.displayName = 'Regions'

export { Regions }
