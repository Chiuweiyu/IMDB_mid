import Activity from './Activity'
import CompanyAndMenu from './CompanyAndMenu'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import Wallet from './Wallet'
import { api } from '../utils/util'
import { useSetRecoilState } from 'recoil'
import { messageState, todayCompanyState } from '../store/atoms'

function Main() {
  const params = 'some' // for fix no params useEffect warning...
  const prevParams = useRef(params)
  const setTodayCompany = useSetRecoilState(todayCompanyState)
  const setMessage = useSetRecoilState(messageState)

  useEffect(() => {
    axios
      .get(api('/company/selected'))
      .then((res) => {
        setTodayCompany(res.data)
        prevParams.current = params
      })
      .catch((err) => {
        console.log(err)
        setMessage('Get today company error...')
      })
  }, [params, setMessage, setTodayCompany])

  return (
    <div className="ma2 flex-ns">
      <div className="w-50-ns">
        <Wallet />
        <Activity />
      </div>
      <CompanyAndMenu />
    </div>
  )
}

export default Main
