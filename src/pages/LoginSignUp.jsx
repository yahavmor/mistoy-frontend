import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setIsSignUp, setUser } from '../../store/toy.actions.js'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { userService } from '../../services/user.service.js'
import { authService } from '../../services/auth.service.js'

export function LoginSignUp() {

  const isSignUp = useSelector((state) => state.isSignUp)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  const navigate = useNavigate()


  function handleChange({ target }) {
    const { name, value } = target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      const user = isSignUp
        ? await authService.signup(credentials)
        : await authService.login(credentials)

      setUser(user) 
      showSuccessMsg(isSignUp ? 'Signed up successfully' : 'Logged in successfully')
      navigate('/toy')

    } catch (err) {
      console.log('Auth error:', err)
      showErrorMsg(`Couldn't ${isSignUp ? 'signup' : 'login'}...`)
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {isSignUp && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        )}

        <button>{isSignUp ? 'Signup' : 'Login'}</button>
      </form>

      <div className="btns">
        <a onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}
