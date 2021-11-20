import TodayCompany from './TodayCompany'
import TodayOrder from './TodayOrder'
import TodayOrderCount from './TodayOrderCount'
import UserOrder from './UserOrder'

function Activity({ todayOrder }) {
  return (
    <div>
      <TodayCompany />
      <UserOrder />
      <TodayOrder todayOrder={todayOrder} />
      <TodayOrderCount />
    </div>
  )
}

export default Activity
