import { useRecoilState } from 'recoil'
import { messageState } from '../store/atoms'

function Notification() {
  const [message] = useRecoilState(messageState)

  return <div className="ph3 pv2 tr">{message}</div>
}

export default Notification
