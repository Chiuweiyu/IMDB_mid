import { GrLinkPrevious } from 'react-icons/gr'
import { useSetRecoilState } from 'recoil'
import { selectedCompanyIdState } from '../../store/atoms'

function BackToCompanyList() {
  const setSelectedCompanyId = useSetRecoilState(selectedCompanyIdState)
  return (
    <div
      className="pointer underline-hover"
      onClick={() => setSelectedCompanyId(null)}
    >
      <GrLinkPrevious />
    </div>
  )
}

export default BackToCompanyList
