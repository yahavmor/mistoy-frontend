import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { userService } from '../../services/user.service.js'
import { authService } from '../../services/auth.service.js'

export function LoginSignUp() {

  const [isSignup, setIsSignup] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  const navigate = useNavigate()

  function handleChange({ target }) {
    const { name, value } = target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      const user = isSignup
        ? await authService.signup(credentials)
        : await authService.login(credentials)

      setLoggedinUser(user)
      showSuccessMsg(isSignup ? 'Signed up successfully' : 'Logged in successfully')
      navigate('/toy')

    } catch (err) {
      console.log('Auth error:', err)
      showErrorMsg(`Couldn't ${isSignup ? 'signup' : 'login'}...`)
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

        {isSignup && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        )}

        <button>{isSignup ? 'Signup' : 'Login'}</button>
      </form>

      <div className="btns">
        <a onClick={() => setIsSignup(prev => !prev)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}
