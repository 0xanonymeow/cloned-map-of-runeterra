import { useFonts } from '@/hooks/useFonts'
import { LinkIcon } from '@/icons/LinkIcon'
import { map } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

const freljordChamps = [
  'ashe',
  'lissandra',
  'sejuani',
  'tryndamere',
  'braum',
  'nunu',
  'olaf',
  'anivia',
  'trundle',
  'udyr',
  'volibear',
  'ornn',
  'gnar',
  'gragas',
]

export const FreljordSidebarContent = () => {
  const { BeaufortforLOL, Spiegel } = useFonts()

  return (
    <>
      <Image
        className="absolute top-0 left-0"
        src="/images/freljord-region.jpg"
        alt="freljord-region"
        width={400}
        height={400}
      />
      <div className="p-10 relative">
        <div className="flex">
          <Image
            className="mr-8"
            src="/images/freljord.png"
            alt="freljord"
            width={52.5}
            height={60}
          />
          <div>
            <p
              className="text-[#f0e6d2] text-3xl"
              style={{
                fontFamily: BeaufortforLOL.style.fontFamily,
              }}
            >
              FRELJORD
            </p>
            <p
              className="text-[#f0e6d2] text-xs"
              style={{
                fontFamily: BeaufortforLOL.style.fontFamily,
              }}
            >
              HARSH FROZEN LAND
            </p>
          </div>
        </div>
        <div className="flex gap-1 mt-6 flex-wrap w-full">
          {map(freljordChamps, (champ, i) => (
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
        <div className="text-[#f0e6d2]">
          <div className="flex">
            <div className="mr-8 w-40">
              <p
                className="text-xs text-[#a09b8c]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                Governance:
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                TRIBAL MATRIARCHY
              </p>
            </div>
            <div className="w-40">
              <p
                className="text-xs text-[#a09b8c]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                Attitude towards magic:
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                VENERATE
              </p>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="mr-8 w-40">
              <p
                className="text-xs text-[#a09b8c]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                Level of technology:
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                LOW
              </p>
            </div>
            <div className="w-40">
              <p
                className="text-xs text-[#a09b8c]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                General environment:
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                ICY TUNDRA
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] border-[0.5px] border-white border-solid opacity-20 my-8" />
        <p
          className="text-sm text-[#a09b8c]"
          style={{ fontFamily: Spiegel.style.fontFamily }}
        >
          The Freljord is a harsh and unforgiving land, where demi-gods walk the
          earth and the people are born warriors. While there are many
          individual tribes, the three greatest are the Avarosans, the Winter’s
          Claw, and the Frostguard, each uniquely shaped by their will to
          survive. It is also the only place on Runeterra where True Ice can be
          found.
        </p>
        <Link
          className="cursor-pointer flex gap-1 items-center mt-8"
          href="https://universe.leagueoflegends.com/en_US/region/freljord/"
        >
          <p className="text-[#0595a9] text-xs cursor-pointer">
            Learn more about Freljord
          </p>
          <LinkIcon width={12} height={12} color="#0595a9" />
        </Link>
        <div className="w-full h-[0.5px] border-[0.5px] border-white border-solid opacity-20 my-8" />
        <p
          className="text-base text-[#f0e6d2]"
          style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
        >
          FEATURED IN FRELJORD
        </p>
        <div className="text-[#f0e6d2] relative">
          <div className="mt-8">
            <Image
              className="absolute"
              src="/images/freljord_architecture_card.jpg"
              alt="freljord_architecture_card"
              width={320}
              height={100}
            />
            <div className="p-5 h-[100px] flex flex-col justify-end relative">
              <p
                className="text-sm"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                A TRIBAL NATION
              </p>
              <p
                className="text-[10px]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                ARCHITECTURE OF THE FRELJORD
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Image
              className="absolute"
              src="/images/freljord_people_card.jpg"
              alt="freljord_architecture_card"
              width={320}
              height={100}
            />
            <div className="p-5 h-[100px] flex flex-col justify-end relative">
              <p
                className="text-sm"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                A TRIBES
              </p>
              <p
                className="text-[10px]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                PEOPLE OF THE FRELJORD
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Image
              className="absolute"
              src="/images/freljord_tools_card.jpg"
              alt="freljord_architecture_card"
              width={320}
              height={100}
            />
            <div className="p-5 h-[100px] flex flex-col justify-end relative">
              <p
                className="text-sm"
                style={{ fontFamily: BeaufortforLOL.style.fontFamily }}
              >
                TRUE ICE
              </p>
              <p
                className="text-[10px]"
                style={{ fontFamily: Spiegel.style.fontFamily }}
              >
                TOOLS OF THE FRELJORD
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] border-[0.5px] border-white border-solid opacity-20 my-8" />
      </div>
    </>
  )
}
