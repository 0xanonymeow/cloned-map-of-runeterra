import { useFonts } from '@/hooks/useFonts'
import { map } from 'lodash'
import Image from 'next/image'
// import { Link } from 'next/link'

const theFrostguardCitadelChamps = [
  'lissandra',
  'trundle',
  'ivern',
  'udyr',
  'ornn',
]

export const FrostguardCitadelSidebarContent = () => {
  const { BeaufortforLOL, Spiegel } = useFonts()

  return (
    <>
      <Image
        className="absolute top-0 left-0"
        src="/images/frostguard-landmark.jpg"
        alt="frostguard-landmark."
        width={400}
        height={400}
      />
      <div className="p-10 relative">
        <div className="flex">
          <div>
            <p
              className="text-[#f0e6d2] text-3xl"
              style={{
                fontFamily: BeaufortforLOL.style.fontFamily,
              }}
            >
              THE FROSTGUARD CITADEL
            </p>
            <p
              className="text-[#f0e6d2] text-xs"
              style={{
                fontFamily: BeaufortforLOL.style.fontFamily,
              }}
            >
              ANCIENT FRELJORDIAN STRONGHOLD
            </p>
          </div>
        </div>
        <div className="flex gap-1 mt-6 flex-wrap w-full">
          {map(theFrostguardCitadelChamps, (champ, i) => (
            <Image
              key={i}
              src={`/assets/images/champions/portraits/${champ}.png`}
              width={30}
              height={30}
              alt={champ}
            />
          ))}
        </div>
        <div className="w-full h-[0.5px] border-[0.5px] border-white border-solid opacity-20 my-8" />
        <p
          className="text-sm text-[#a09b8c]"
          style={{ fontFamily: Spiegel.style.fontFamily }}
        >
          An ancient stronghold built to watch over the dark chasm of the
          Howling Abyss, the Citadel also houses many of the Freljord’s hidden
          treasures and historical records.
        </p>
        <div className="w-full h-[0.5px] border-[0.5px] border-white border-solid opacity-20 my-8" />
        <p
          className="text-base text-[#f0e6d2]"
          style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
        >
          FEATURED IN THE FROSTGUARD CITADEL
        </p>
        <div className="text-[#f0e6d2] relative">
          <div className="mt-8">
            <Image
              className="absolute"
              src="/images/freljord_citadel_card.jpg"
              alt="freljord-citadel-card"
              width={320}
              height={100}
            />
            <div className="p-5 h-[100px] flex flex-col justify-end relative">
              <p
                className="text-sm"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                HOWLING ABYSS
              </p>
              <p
                className="text-[10px]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                TEH FROSTGUARD CITADEL
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] border-[0.5px] border-white border-solid opacity-20 my-8" />
      </div>
    </>
  )
}
