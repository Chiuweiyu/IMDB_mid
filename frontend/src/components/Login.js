import axios from 'axios'
import { api } from '../utils/util'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { emailInputState, messageState, userState } from '../store/atoms'

function Login() {
  const [emailId, setEmailId] = useRecoilState(emailInputState)
  const [user, setUser] = useRecoilState(userState)
  const setMessage = useSetRecoilState(messageState)

  if (user) {
    return null
  }

  const handleLogin = () => {
    try{
      if (emailId.length === 0) {
        return
      }
  
      axios
        .get(api(`/user/${emailId}`))
        .then((res) => {
          if (res.data) {
            setUser(res.data)
            setMessage(
              `Hi! ${
                res.data.displayName ? res.data.displayName : res.data.emailId
              }`,
            )
          } else {
            setMessage('Wrong User. Try again or register one.')
            setEmailId('')
          }
        })
        .catch((err) => {
          console.log(err)
          setMessage('Ooops Login fail...')
        })
    }catch(e){};
    
  }

  const handleRegister = () => {
    // find if user exist,
    // if yes, login, say: you have registered, welcome
    // if not, create one and login, say welcome
    // TODO: should check it's a valid email
    try{
      if (emailId.length === 0) {
        return
      }
  
      axios
        .post(api(`/user/${emailId}/register`))
        .then((res) => {
          setUser(res.data)
          setMessage(
            `Hi! ${
              res.data.displayName ? res.data.displayName : res.data.emailId
            }`,
          )
        })
        .catch((err) => {
          console.log('errr: ', err)
          setMessage('Register Error')
        })
    }catch(e){};
    
  }

  return (
    <div className="flex-ns items-center">
      <div className="flex-auto">
        <input
          type="text"
          onChange={(e) => setEmailId(e.target.value)}
          value={emailId}
        />
  
      </div>
      <div className="ma2 pa2 ba b--silver pointer" onClick={handleLogin}>
        Login
      </div>
      <div className="ma2 pa2 ba b--silver pointer" onClick={handleRegister}>
        Register
      </div>
    </div>
  )
}

export default Login
