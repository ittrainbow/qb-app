import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, logout } from '../../db/'
import { Context } from '../../App'

import './Header.css'

export const Header = () => {
  const [user] = useAuthState(auth)
  const { context, countdown, setCountdown } = useContext(Context)
  const { name } = context
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown > 0) {
      const cdown = setInterval(() => setCountdown(countdown - 1), 1000)
      return clearInterval(cdown)
    }
    // eslint-disable-next-line
  }, [countdown])

  const loggedInButtons = () => {
    return (
      <>
        <button className="button" onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
        <button className="button" onClick={() => logOutHandler()}>
          Log Out
        </button>
      </>
    )
  }

  const outsideUserButtons = () => {
    return (
      <>
        <button className="button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="button" onClick={() => navigate('/register')}>
          Register
        </button>
      </>
    )
  }

  const logOutHandler = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="header">
      <div className="greeting">
        {user ? `Logged in as ${name ? name : 'fetching ...'}` : 'Please Log In'}
      </div>
      <button className="button" onClick={() => navigate('/')}>
        Table
      </button>
      {user ? loggedInButtons() : outsideUserButtons()}
    </div>
  )
}
