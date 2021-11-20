import { selector } from 'recoil'
import axios from 'axios'
import { api } from '../utils/util'
import { selectedCompanyIdState, todayCompanyState } from './atoms'

export const companyListQuery = selector({
  key: 'companyListQuery',
  get: async () => {
    const res = await axios.get(api('/company'))
    return res.data
  },
})

export const selectedCompanyState = selector({
  key: 'selectedCompanyState',
  get: ({ get }) => {
    return get(companyListQuery).find(
      (c) => c._id === get(selectedCompanyIdState),
    )
  },
})

export const isTodayCompanyState = selector({
  key: 'isTodayCompanyState',
  get: ({ get }) => {
    const company = get(selectedCompanyState)
    const todayCompany = get(todayCompanyState)
    return todayCompany && todayCompany._id === company._id
  },
})

export const selectedCompanyMenuState = selector({
  key: 'selectedCompanyMenuState',
  get: async ({ get }) => {
    const selectedCompanyId = get(selectedCompanyState)._id
    const res = await axios.get(api(`/company/${selectedCompanyId}/menu`))
    return res.data
  },
})
