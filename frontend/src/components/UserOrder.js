import { useEffect } from 'react'
import axios from 'axios'
import { api } from '../utils/util'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { messageState, userOrderState, userState } from '../store/atoms'

function UserOrder() {
  const [user] = useRecoilState(userState)
  const [userOrder, setUserOrder] = useRecoilState(userOrderState)
  const setMessage = useSetRecoilState(messageState)

  useEffect(() => {
    if (user) {
      axios
        .get(api(`/order/today/user/${user._id}`))
        .then((res) => {
          setUserOrder(res.data)
        })
        .catch((err) => {
          console.log(err)
          setMessage('Get user order Error')
        })
    }
  }, [user, setMessage, setUserOrder])

  const total = () => {
    return userOrder.reduce((total, current) => total + current.price, 0)
  }

  if (!user) {
    return null
  }

  if (userOrder.length === 0) {
    return (
      <div className="mh2 mt2 mb3 pa2 ba b--silver">
        <h3>Your Order is empty.</h3>
      </div>
    )
  }

  return (
    <div className="mh2 mt2 mb3 ph2 pt2 pb4 ba b--silver">
      <h3>Your Order</h3>
      {userOrder.map((order) => (
        <div
          key={order._id}
          className="flex justify-between pb2 mb3 bb b--silver"
        >
          <div>
            {order.bentonName} {order.price}
          </div>
          <div>X {order.amount}</div>
        </div>
      ))}
      <div>Total: {total()}</div>
    </div>
  )
}

export default UserOrder
