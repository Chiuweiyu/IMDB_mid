import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  connectToWalletState,
  emailInputState,
  messageState,
  userState,
} from '../store/atoms'

function Logout() {
  const setEmailInput = useSetRecoilState(emailInputState)
  const [user, setUser] = useRecoilState(userState)
  const setMessage = useSetRecoilState(messageState)
  const setConnectToWallet = useSetRecoilState(connectToWalletState)

  if (!user) {
    return null
  }

  const handleDisconnect = () => {
    window.solana.disconnect()
    window.solana.on('disconnect', () => {
      setConnectToWallet(false)
      setMessage('Wallet DisConnected!')
    })
  }

  const handleLogout = () => {
    setEmailInput('')
    setUser(null)
    handleDisconnect()
    setMessage(null)
  }

  return (
    <div className="ma2 pa2 ba b--silver pointer" onClick={handleLogout}>
      Logout
    </div>
  )
}

export default Logout
