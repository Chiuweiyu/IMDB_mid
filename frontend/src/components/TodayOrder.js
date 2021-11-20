import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import LoadingOverlay from 'react-loading-overlay'
import {
  messageState,
  todayCompanyState,
  todayOrderState,
  userState,
} from '../store/atoms'
import axios from 'axios'
import { api } from '../utils/util'
import { useInterval } from '../utils/hooks'
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr'

function TodayOrder() {
  const [user] = useRecoilState(userState)
  const [todayCompany] = useRecoilState(todayCompanyState)
  const [todayOrder, setTodayOrder] = useRecoilState(todayOrderState)
  const [isActive, setIsActive] = useState(false)
  const setMessage = useSetRecoilState(messageState)

  const total = () => {
    return todayOrder.reduce((total, current) => total + current.price, 0)
  }

  const getTodayOrder = () => {
    axios
      .get(api('/order/today'))
      .then((res) => {
        setTodayOrder(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(getTodayOrder, [setTodayOrder])
  useInterval(getTodayOrder, todayCompany ? 6000 : null)

  const showCheckBox = user && user.isAdmin && !todayCompany

  const replaceItem = (updatedOrder) => {
    const index = todayOrder.findIndex((item) => item._id === updatedOrder._id)

    return [
      ...todayOrder.slice(0, index),
      updatedOrder,
      ...todayOrder.slice(index + 1),
    ]
  }

  const overlayStyle = {
    overlay: (base) => ({
      ...base,
      background: 'rgba(255, 0, 0, 0.1)',
    }),
    spinner: (base) => ({
      ...base,
      width: '40px',
    }),
  }

  const orderItemStyle = () => {
    const base = 'flex justify-between pb2 mb3 bb b--silver '
    return showCheckBox ? base + 'pointer' : base
  }

  // only one admin user at the same time can do this ....
  const handleClick = (order) => {
    if (!showCheckBox) {
      return
    }

    setIsActive(true)
    axios
      .patch(api(`/order/today/${order._id}`), {
        paid: !order.paid,
      })
      .then((res) => {
        setTodayOrder(replaceItem(res.data))
        setMessage(
          `設定 ${order.userEmailId} ${order.bentonName} ${
            order.paid ? '還未' : '已經'
          } 付款拿取。`,
        )
      })
      .catch((err) => {
        console.log(err)
        setMessage('更新使用者拿便當狀態錯誤')
      })
      .finally(() => {
        setIsActive(false)
      })
  }

  if (!todayOrder) {
    return null
  }

  return (
    <div className="mh2 mt2 mb3 ph2 pt2 ba b--silver">
      <h3 className="pb2 bb b--silver">Today Order</h3>
      {todayOrder.map((order) => (
        <LoadingOverlay
          active={isActive}
          spinner
          styles={overlayStyle}
          key={order._id}
        >
          <div className={orderItemStyle()} onClick={() => handleClick(order)}>
            <div className="flex items-center">
              {showCheckBox && (
                <div className="pt1 pr2">
                  {order.paid ? <GrCheckboxSelected /> : <GrCheckbox />}
                </div>
              )}
              <div>
                {order.userEmailId} {order.bentonName} {order.price}
              </div>
            </div>
            <div>X {order.amount}</div>
          </div>
        </LoadingOverlay>
      ))}
      <div className="mb4">Total: {total()}</div>
    </div>
  )
}

export default TodayOrder
