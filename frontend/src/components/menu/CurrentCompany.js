import { GrCheckbox, GrCheckboxSelected, GrCheckmark } from 'react-icons/gr'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  connectToWalletState,
  messageState,
  todayCompanyState,
  todayOrderState,
  userState,
} from '../../store/atoms'
import { isTodayCompanyState } from '../../store/selectors.'
import { selectedCompanyState } from '../../store/selectors.'
import axios from 'axios'
import { api } from '../../utils/util'

function CurrentCompany() {
  const [user] = useRecoilState(userState)
  const [connectToWallet] = useRecoilState(connectToWalletState)
  const [todayOrder] = useRecoilState(todayOrderState)
  const isTodayCompany = useRecoilValue(isTodayCompanyState)
  const company = useRecoilValue(selectedCompanyState)
  const setMessage = useSetRecoilState(messageState)
  const setTodayCompany = useSetRecoilState(todayCompanyState)

  const setCompanyStyle = () => {
    const base = 'flex items-center px3 '
    return user && user.isAdmin ? base + 'pointer' : base
  }

  const handleSetCompany = () => {
    if (todayOrder.length === 0) {
      submitTodayCompany(company, isTodayCompany)
    } else if (todayOrder[0].companyId === company._id) {
      submitTodayCompany(company)
    } else {
      setMessage(
        '已經存在order, 無法修改今日選擇便當廠商, 只能啟動/停止今日選擇廠商',
      )
    }
  }

  const submitTodayCompany = (company, cancel = false) => {
    if (!connectToWallet) {
      setMessage('請先連到錢包!!')
      return
    }

    const data = {
      cancel: cancel ? cancel : false,
      adminUserId: user._id,
    }
    if (connectToWallet) {
      data.adminUserAddress = window.solana.publicKey.toString()
    }

    axios
      .patch(api(`/company/${company._id}/selected`), data)
      .then(() => {
        if (!cancel) {
          setTodayCompany(company)
          setMessage('Set Activity: ' + company.name)
        } else {
          setTodayCompany(null)
          setMessage('Cancel select ' + company.name)
        }
      })
      .catch((err) => {
        console.log(err)
        setMessage('Set Today Company Error...')
      })
  }

  return (
    <div className={setCompanyStyle()}>
      {user && user.isAdmin && (
        <div className="pl2" onClick={handleSetCompany}>
          {isTodayCompany ? (
            <GrCheckboxSelected size={'1.5em'} />
          ) : (
            <GrCheckbox size={'1.5em'} />
          )}
        </div>
      )}
      <div className="flex items-center pl2">
        <div className="pb1">
          <h3>{company.name}</h3>
        </div>
        {((user && !user.isAdmin) || !user) && isTodayCompany && (
          <div className="pl2">
            <GrCheckmark size={'1.2em'} />
          </div>
        )}
      </div>
    </div>
  )
}
export default CurrentCompany
