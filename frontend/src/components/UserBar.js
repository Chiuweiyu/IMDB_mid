import Login from './Login'
import Logout from './Logout'
import ConnectWallet from './ConnectWallet'
import UserInfo from './UserInfo'

function UserBar() {
  return (
    <div className="flex-ns justify-end items-center pa3 bb b--light-gray tr">
      <Login />
      <UserInfo />
      <Logout />
      <ConnectWallet />
    </div>
  )
}

export default UserBar
