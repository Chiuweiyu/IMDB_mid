import Main from './components/Main'
import UserBar from './components/UserBar'
import Notification from './components/Notification'
import Footer from './components/Footer'

function App() {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <div className="sans-serif mw9 mw8-ns center">
      <UserBar />
      <Notification />
      <Main />
      <Footer />
    </div>
  )
}

export default App
