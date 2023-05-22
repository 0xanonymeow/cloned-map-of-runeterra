import { ConnectionStatus } from '@/components/ConnectionStatus'
import { useFonts } from '@/hooks/useFonts'
import {
  ConnectWallet,
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Web3ConnectProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  hide: boolean
  buttonOpacity: number
}

export const Web3Connect = ({
  setIsLoggedIn,
  hide,
  buttonOpacity,
}: Web3ConnectProps) => {
  const { BeaufortforLOL } = useFonts()
  const [display, setDisplay] = useState('flex')

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (hide) timeout = setTimeout(() => setDisplay('none'), 300)

    return () => clearTimeout(timeout)
  }, [hide])

  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), walletConnect()]}
      activeChain="ethereum"
      autoConnect={false}
    >
      <ConnectionStatus setIsLoggedIn={setIsLoggedIn} />
      <div
        className="absolute top-[50%] left-[50%] z-10 translate-x-[-50%] translate-y-[-25%] flex flex-col items-center"
        style={{
          display,
          opacity: hide ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        <p
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="300"
          className="text-lg -mb-8"
          style={{
            color: '#d4af37',
            fontFamily: BeaufortforLOL.style.fontFamily,
            WebkitTextStroke: '0.5px #d4af37',
          }}
        >
          EXPLORE & DISCOVER
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="1200"
          data-aos-duration="600"
          className="text-[100px] font-bold mb-60 text-white"
          style={{
            fontFamily: BeaufortforLOL.style.fontFamily,
            WebkitTextStroke: '0.5px #d4af37',
          }}
        >
          RUNETERRA
        </p>
        <ConnectWallet
          theme="dark"
          btnTitle="BEGIN EXPLORING"
          style={{
            height: 58,
            width: 195,
            borderRadius: 0,
            backgroundImage: 'linear-gradient(#171b21,#171b21)',
            fontSize: 14,
            fontFamily: BeaufortforLOL.style.fontFamily,
            color: 'white',
            borderStyle: 'solid',
            borderColor: '#d4af37',
            borderWidth: 3,
            opacity: buttonOpacity,
            transition: 'opacity 0.3s',
          }}
        />
      </div>
    </ThirdwebProvider>
  )
}
