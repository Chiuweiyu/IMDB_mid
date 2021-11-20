import React, { Suspense } from 'react'
import BackToCompanyList from './BackToCompanyList'
import CurrentCompany from './CurrentCompany'
import BentonList from './BentonList'
import { useRecoilState } from 'recoil'
import { selectedCompanyIdState } from '../../store/atoms'

function MenuList() {
  const [selectedCompanyId] = useRecoilState(selectedCompanyIdState)

  if (!selectedCompanyId) {
    return null
  }

  return (
    <div>
      <BackToCompanyList />
      <CurrentCompany />
      <Suspense fallback={<div>Loading Benton...</div>}>
        <BentonList />
      </Suspense>
    </div>
  )
}

export default MenuList
