import solana from '../images/solana_logo.png'
import phantom from '../images/phantom_logo.png'

const solana_url = 'https://solana.com'
const phantom_url = 'https://phantom.app'

function Footer() {
  const openTab = (url) => window.open(url, '_blank')

  return (
    <div className="mh2 ph2 tr">
      <img
        className="pointer"
        src={solana}
        alt="solana"
        width="120"
        onClick={() => openTab(solana_url)}
      />
      <img
        className="pointer"
        src={phantom}
        alt="phantom"
        width="30"
        onClick={() => openTab(phantom_url)}
      />
    </div>
  )
}

export default Footer
