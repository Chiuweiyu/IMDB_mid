import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr'
import LoadingOverlay from 'react-loading-overlay'
import axios from 'axios'
import { api } from '../../utils/util'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  messageState,
  selectedCompanyIdState,
  userOrderState,
  userState,
} from '../../store/atoms'

function Benton({ item, canBeOrder }) {
  const [user] = useRecoilState(userState)
  const [userOrder, setUserOrder] = useRecoilState(userOrderState)
  const [selectedCompanyId] = useRecoilState(selectedCompanyIdState)
  const setMessage = useSetRecoilState(messageState)
  const [isActive, setIsActive] = useState(false)

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

  const setBentonStyle = () => {
    const base = 'flex items-center mh2 mv3 pa2 bb b--silver '
    return canBeOrder ? base + 'pointer' : base
  }

  const checked = () => {
    return userOrder.findIndex((order) => order.bentonId === item._id) > -1
  }

  const handleOrder = () => {
    if (!canBeOrder) {
      return
    }

    checked() ? cancelOrder() : addOrder()
  }

  const addOrder = () => {
    setIsActive(true)
    axios
      .post(api('/order'), {
        userId: user._id,
        userEmailId: user.emailId || '',
        displayName: user.displayName || '',
        bentonId: item._id,
        bentonName: item.name,
        companyId: selectedCompanyId,
        price: item.price,
      })
      .then((res) => {
        setUserOrder([...userOrder, res.data])
        setMessage(`Add order: ${item.name} X 1`)
      })
      .catch((err) => {
        console.log(err)
        setMessage('Error on adding order')
      })
      .finally(() => {
        setIsActive(false)
      })
  }

  const orderId = () => {
    const result = userOrder.find(
      (order) => order.bentonId === item._id && order.userId === user._id,
    )
    if (!result) {
      return null
    }

    return result._id
  }

  const cancelOrder = () => {
    const thisOrderId = orderId()
    if (!thisOrderId) {
      setMessage(`Error: Empty Order`)
      return
    }

    setIsActive(true)
    axios
      .delete(api(`/order/${thisOrderId}`))
      .then(() => {
        const newOrder = [...userOrder].filter(
          (order) => order._id !== thisOrderId,
        )
        setUserOrder(newOrder)
        setMessage(`Cancel Order: ${item.name} X 1`)
      })
      .catch((err) => {
        console.log(err)
        setMessage('Cancel Order FAIL: ' + item.name)
      })
      .finally(() => {
        setIsActive(false)
      })
  }

  return (
    <LoadingOverlay active={isActive} spinner styles={overlayStyle}>
      <div className={setBentonStyle()} onClick={handleOrder}>
        {canBeOrder && (
          <div>{checked() ? <GrCheckboxSelected /> : <GrCheckbox />}</div>
        )}
        <div className="flex w-100 justify-between pl2 pb1">
          <div>{item.name}</div>
          <div>{item.price}</div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default Benton
