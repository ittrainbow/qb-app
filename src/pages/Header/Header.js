import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { clearUser } from '../../redux/actions'
import { auth, logout } from '../../db/'
import './Header.css'

export const Header = () => {
  const [user] = useAuthState(auth)
  const { name } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <div className="header">
      <div className="greeting">{user ? `Logged in as ${name}` : 'Please Log In'}</div>
      <button className="button" onClick={() => navigate('/')}>
        Table
      </button>
      {user ? loggedInButtons() : outsideUserButtons()}
    </div>
  )
}
