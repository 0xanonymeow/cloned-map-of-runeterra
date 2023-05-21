import { useConnectionStatus } from '@thirdweb-dev/react'
import { Dispatch, SetStateAction, useEffect } from 'react'

export const ConnectionStatus = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}) => {
  const connectionStatus = useConnectionStatus()

  useEffect(() => {
    if (connectionStatus === 'connected') setIsLoggedIn(true) // connectionStatus will turn to disconnected right away after it's connected. setIsLoggedIn to true to prevent inconsistency
  }, [connectionStatus, setIsLoggedIn])

  return <></>
}
