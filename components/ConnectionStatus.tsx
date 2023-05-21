import { useConnectionStatus } from '@thirdweb-dev/react'
import { useEffect } from 'react'

export const ConnectionStatus = ({ setIsLoggedIn }) => {
  const connectionStatus = useConnectionStatus()

  useEffect(() => {
    if (connectionStatus === 'connected') setIsLoggedIn(true) // connectionStatus will turn to disconnected right away after it's connected. setIsLoggedIn to true to prevent inconsistency
  }, [connectionStatus, setIsLoggedIn])

  return <></>
}
