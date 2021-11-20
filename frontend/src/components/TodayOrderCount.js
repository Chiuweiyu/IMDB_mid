import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../utils/util'
import { useInterval } from '../utils/hooks'
import { useRecoilState } from 'recoil'
import { todayCompanyState } from '../store/atoms'

function TodayOrderCount() {
  const [todayCompany] = useRecoilState(todayCompanyState)
  const [todayOrderCount, setTodayOrderCount] = useState([])

  const getTodayOrderCount = () => {
    axios
      .get(api('/order/today/count'))
      .then((res) => {
        setTodayOrderCount(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(getTodayOrderCount, [])
  useInterval(getTodayOrderCount, todayCompany ? 6000 : null)

  const all = () => {
    return todayOrderCount.reduce((total, current) => total + current.total, 0)
  }

  return (
    <div className="ma2 pa2 ba b--silver">
      <h3 className="pb2 bb b--silver">Today Order Count</h3>
      {todayOrderCount.map((order) => (
        <div
          key={order._id}
          className="flex justify-between pb2 mb3 bb b--silver"
        >
          <div>{order._id}</div>
          <div>X {order.total}</div>
        </div>
      ))}
      <div className="mb4">Total: {all()}</div>
    </div>
  )
}

export default TodayOrderCount
