import axios from 'axios'
import { api } from '../utils/util'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { messageState, todayCompanyState, userState } from '../store/atoms'

function TodayCompany() {
  const [user] = useRecoilState(userState)
  const [todayCompany, setTodayCompany] = useRecoilState(todayCompanyState)
  const setMessage = useSetRecoilState(messageState)

  const handleClose = () => {
    axios
      .patch(api(`/admin/company/${todayCompany._id}`), { selected: false })
      .then(() => {
        setMessage(`Today Order: ${todayCompany.name} Closed.`)
        setTodayCompany(null)
      })
      .catch((err) => {
        console.log(err)
        setMessage('Close Today Order FAIL...')
      })
  }

  if (!todayCompany) {
    return (
      <p className="mh2 mt2 mb3 pa2 ba b--silver">
        We don't have any activity yet.
      </p>
    )
  }

  return (
    <div className="mh2 mt2 mb3 pa2 ba b--silver">
      <div>
        <h3 className="pb2 bb b--silver">Today: {todayCompany.name}</h3>
        <p>{todayCompany.description}</p>
        <p>電話: {todayCompany.phone}</p>
        <p>最小訂購數量: {todayCompany.minOrderNum}</p>
        <p>最小訂購金額: {todayCompany.minOrderMoney}</p>
        <p>最慢結單時間: {todayCompany.orderBefore}</p>
        {user && user.isAdmin && (
          <div className="pa2 tc ba b--silver pointer" onClick={handleClose}>
            Close
          </div>
        )}
      </div>
    </div>
  )
}

export default TodayCompany
