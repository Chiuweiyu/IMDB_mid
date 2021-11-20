import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isTodayCompanyState,
  selectedCompanyMenuState,
  selectedCompanyState,
} from '../../store/selectors.'
import Benton from './Benton'
import { userState } from '../../store/atoms'

function BentonList() {
  const [user] = useRecoilState(userState)
  const isTodayCompany = useRecoilValue(isTodayCompanyState)
  const company = useRecoilValue(selectedCompanyState)
  const menu = useRecoilValue(selectedCompanyMenuState)

  if (!menu) {
    return null
  }

  return (
    <div>
      {menu.map((item) => (
        <Benton
          key={item._id}
          item={item}
          canBeOrder={isTodayCompany && user}
          company={company}
        />
      ))}
    </div>
  )
}
export default BentonList
