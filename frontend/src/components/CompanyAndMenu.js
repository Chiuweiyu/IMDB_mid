import React, { Suspense } from 'react'
import CompanyList from './CompanyList'
import MenuList from './menu/MenuList'

function CompanyAndMenu() {
  return (
    <div className="w-50-ns vh-75-ns overflow-y-scroll ma2 pa2 ba b--silver ">
      <Suspense fallback={<div>Loading ...</div>}>
        <CompanyList />
      </Suspense>
      <MenuList />
    </div>
  )
}

export default CompanyAndMenu
