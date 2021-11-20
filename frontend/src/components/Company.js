import { GrNext } from 'react-icons/gr'
import { GrCheckmark } from 'react-icons/gr'
import { selectedCompanyIdState, todayCompanyState } from '../store/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'

function Company({ id, children }) {
  const [todayCompany] = useRecoilState(todayCompanyState)
  const setSelectedCompanyId = useSetRecoilState(selectedCompanyIdState)

  const isTodayCompany = () => {
    return todayCompany && todayCompany._id === id
  }

  return (
    <div
      className="flex justify-between mh2 mv3 pa2 bb b--silver pointer"
      onClick={() => setSelectedCompanyId(id)}
    >
      <div className="flex items-center">
        <div className="pb1">{children}</div>
        {isTodayCompany() && (
          <div className="pl2">
            <GrCheckmark />
          </div>
        )}
      </div>
      <div>
        <GrNext />
      </div>
    </div>
  )
}

export default Company
