import { useEffect, useState } from 'react'
import axios from 'axios'
import Benton from './Benton'
import { api } from '../utils/util'
import {
  GrLinkPrevious,
  GrCheckbox,
  GrCheckboxSelected,
  GrCheckmark,
} from 'react-icons/gr'

function MenuList({
  user,
  company,
  setSelectedCompanyId,
  todayCompany,
  submitTodayCompany,
  setMessage,
  userOrder,
  setUserOrder,
  todayOrder,
}) {
  const { _id: companyId, name: companyName } = company
  const [menu, setMenu] = useState([])
  useEffect(() => {
    axios
      .get(api(`/company/${companyId}/menu`))
      .then((res) => {
        // console.log(res.data)
        setMenu(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [companyId])

  const handleSetCompany = () => {
    if (todayOrder.length !== 0 && todayOrder[0].companyId !== company._id) {
      setMessage('已經存在order, 無法修改今日選擇便當廠商, 只能啟動/停止今日選擇廠商')
      return
    }
    submitTodayCompany(company, isTodayCompany())
  }

  const setCompanyStyle = () => {
    const base = 'flex items-center px3 '
    return user && user.isAdmin ? base + 'pointer' : base
  }

  const isTodayCompany = () => {
    return todayCompany && todayCompany._id === company._id
  }

  return (
    <div>
      <div
        className="pointer underline-hover"
        onClick={() => setSelectedCompanyId(null)}
      >
        <GrLinkPrevious />
      </div>
      <div className={setCompanyStyle()}>
        {user && user.isAdmin && (
          <div className="pl2" onClick={handleSetCompany}>
            {isTodayCompany() ? (
              <GrCheckboxSelected size={'1.5em'} />
            ) : (
              <GrCheckbox size={'1.5em'} />
            )}
          </div>
        )}
        <div className="flex items-center pl2">
          <div className="pb1">
            <h3>{companyName}</h3>
          </div>
          {((user && !user.isAdmin) || !user) && isTodayCompany() && (
            <div className="pl2">
              <GrCheckmark size={'1.2em'} />
            </div>
          )}
        </div>
      </div>

      {menu.map((item) => (
        <Benton
          key={item._id}
          item={item}
          canBeOrder={isTodayCompany() && user}
          user={user}
          setMessage={setMessage}
          setUserOrder={setUserOrder}
          userOrder={userOrder}
          company={company}
        />
      ))}
    </div>
  )
}

export default MenuList
