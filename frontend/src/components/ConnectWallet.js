import { useRecoilState, useSetRecoilState } from 'recoil'
import { connectToWalletState, messageState, userState } from '../store/atoms'

function ConnectWallet() {
  const [user] = useRecoilState(userState)
  const setMessage = useSetRecoilState(messageState)
  const [connectToWallet, setConnectToWallet] =
    useRecoilState(connectToWalletState)

  const handleConnect = () => {
    const isPhantomInstalled = window.solana && window.solana.isPhantom

    if (isPhantomInstalled) {
      window.solana.connect()
      window.solana.on('connect', () => {
        setMessage('Wallet Connected!')
        setConnectToWallet(true)
      })
    } else {
      window.open('https://phantom.app/', '_blank')
    }
  }

  const handleDisconnect = () => {
    window.solana.disconnect()
    window.solana.on('disconnect', () => {
      setConnectToWallet(false)
      setMessage('Wallet DisConnected!')
    })
  }

  if (!user) {
    return null
  }

  return (
    <div
      className="ml2 pa2 ba b--silver pointer"
      onClick={connectToWallet ? handleDisconnect : handleConnect}
    >
      {connectToWallet ? 'Disconnect' : 'Connect'} Wallet
    </div>
  )
}

export default ConnectWallet
