import { useRecoilState } from 'recoil'
import { userState } from '../store/atoms'

function UserInfo() {
  const [user] = useRecoilState(userState)
  if (!user) {
    return null
  }

  return (
    <div className="ma2 pa2">
      {user.isAdmin && '(Admin) '}
      {user.displayName ? user.displayName : user.emailId}
    </div>
  )
}

export default UserInfo
