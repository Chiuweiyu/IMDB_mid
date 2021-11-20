import Company from './Company'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedCompanyIdState } from '../store/atoms'
import { companyListQuery } from '../store/selectors.'

function CompanyList() {
  const [selectedCompanyId] = useRecoilState(selectedCompanyIdState)
  const companies = useRecoilValue(companyListQuery)

  if (selectedCompanyId) {
    return null
  }

  return (
    <div>
      {companies.map((company) => (
        <Company key={company._id} id={company._id}>
          {company.name}
        </Company>
      ))}
    </div>
  )
}

export default CompanyList
